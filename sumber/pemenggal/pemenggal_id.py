#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""pemenggal-id: sisipkan tanda pemenggal opsional (optional hyphen) ke naskah Word berbahasa Indonesia.

Microsoft Word tidak memiliki pola pemenggalan kata bahasa Indonesia. Skrip ini memenggal kata
Indonesia dengan pola MTI (hyph-id-mti.pat) dan menyisipkan tanda pemenggal opsional (optional hyphen; Ctrl+Alt+- di Windows, Cmd+Option+- di Mac)
di titik penggalan. Tanda ini tidak terlihat dan tidak tercetak, kecuali ketika kata benar-benar
dipenggal di akhir baris.

Pemakaian:
    python3 pemenggal_id.py naskah.docx                 -> naskah-dipenggal.docx
    python3 pemenggal_id.py naskah.docx hasil.docx
    python3 pemenggal_id.py --hapus naskah-dipenggal.docx  (hapus semua tanda pemenggal opsional)
    python3 pemenggal_id.py --kata pembelajaran         (uji satu kata)
    python3 pemenggal_id.py --pola hyph_id_ID.dic naskah.docx  (pakai pola lain: .pat TeX atau .dic LibreOffice)

Yang TIDAK dipenggal: judul (style yang memakai "Don't hyphenate"), isi tabel, teks miring
(istilah asing), teks yang bahasanya bukan Indonesia, singkatan berhuruf kapital, alamat web,
dan kode. Hanya memakai pustaka standar Python 3.8+.
"""
import os
import re
import sys
import zipfile
import xml.etree.ElementTree as ET

HERE = os.path.dirname(os.path.abspath(__file__))
W = '{http://schemas.openxmlformats.org/wordprocessingml/2006/main}'
SOFT = '<w:softHyphen/>'
MIN_KATA = 5
KIRI, KANAN = 2, 2


class Pemenggal:
    """Algoritme Liang (sama dengan TeX, LibreOffice, dan Hyphenopoly)."""

    def __init__(self, path):
        self.tree = {}
        self.exc = {}
        self.maxlen = 0
        mode = 'pat'
        dic = path.lower().endswith('.dic')  # format libhyphen (LibreOffice), mis. hyph_id_ID.dic autohyphen-id
        with open(path, encoding='utf-8') as f:
            for line in f:
                line = line.split('%', 1)[0].strip()
                if not line:
                    continue
                if dic and (line[0].isupper() or line.startswith('ISO') or line.upper() == 'UTF-8'):
                    continue  # baris kepala: UTF-8, LEFTHYPHENMIN 2, ...
                if line.startswith('\\patterns'):
                    mode = 'pat'; continue
                if line.startswith('\\hyphenation'):
                    mode = 'exc'; continue
                if line.startswith('}'):
                    continue
                for tok in line.split():
                    tok = tok.strip('{}')
                    if not tok:
                        continue
                    if mode == 'exc':
                        self.exc[tok.replace('-', '')] = tok
                    else:
                        letters = re.sub(r'\d', '', tok)
                        pts = [0] * (len(letters) + 1)
                        i = 0
                        for ch in tok:
                            if ch.isdigit():
                                pts[i] = int(ch)
                            else:
                                i += 1
                        self.tree[letters] = pts
                        self.maxlen = max(self.maxlen, len(letters))

    def titik(self, kata):
        w = kata.lower()
        n = len(w)
        if w in self.exc:
            res, i = [], 0
            for ch in self.exc[w]:
                if ch == '-':
                    res.append(i)
                else:
                    i += 1
            return [p for p in res if KIRI <= p <= n - KANAN]
        word = '.' + w + '.'
        pts = [0] * (len(word) + 1)
        for i in range(len(word)):
            for j in range(i + 1, min(len(word), i + self.maxlen) + 1):
                p = self.tree.get(word[i:j])
                if p:
                    for k, v in enumerate(p):
                        if v > pts[i + k]:
                            pts[i + k] = v
        return [i for i in range(KIRI, n - KANAN + 1) if pts[i + 1] % 2]

    def penggal(self, kata, sep='-'):
        out, last = '', 0
        for p in self.titik(kata):
            out += kata[last:p] + sep
            last = p
        return out + kata[last:]


# ------------------------------------------------------------------ analisis styles.xml
def baca_styles(z):
    """Kembalikan (style paragraf tanpa pemenggalan, style karakter non-Indonesia, bahasa bawaan)."""
    try:
        root = ET.fromstring(z.read('word/styles.xml'))
    except KeyError:
        return set(), set(), None
    info = {}
    for st in root.iter(W + 'style'):
        sid = st.get(W + 'styleId')
        based = st.find(W + 'basedOn')
        ppr = st.find(W + 'pPr')
        rpr = st.find(W + 'rPr')
        sup = None
        if ppr is not None and ppr.find(W + 'suppressAutoHyphens') is not None:
            v = ppr.find(W + 'suppressAutoHyphens').get(W + 'val', 'true')
            sup = v not in ('0', 'false', 'off')
        lang = None
        ital = None
        if rpr is not None:
            le = rpr.find(W + 'lang')
            if le is not None and le.get(W + 'val'):
                lang = le.get(W + 'val')
            ie = rpr.find(W + 'i')
            if ie is not None:
                ital = ie.get(W + 'val', 'true') not in ('0', 'false', 'off')
        info[sid] = dict(type=st.get(W + 'type'), based=based.get(W + 'val') if based is not None else None,
                         sup=sup, lang=lang, ital=ital)

    def resolve(sid, key, depth=0):
        s = info.get(sid)
        if not s or depth > 20:
            return None
        if s[key] is not None:
            return s[key]
        return resolve(s['based'], key, depth + 1) if s['based'] else None

    no_par = {sid for sid, s in info.items() if s['type'] == 'paragraph' and resolve(sid, 'sup')}
    skip_char = set()
    for sid, s in info.items():
        if s['type'] in ('character', 'paragraph'):
            lang = resolve(sid, 'lang')
            if (lang and not lang.lower().startswith('id')) or resolve(sid, 'ital'):
                skip_char.add(sid)
    default_lang = None
    dd = root.find(W + 'docDefaults')
    if dd is not None:
        le = dd.find('.//' + W + 'lang')
        if le is not None:
            default_lang = le.get(W + 'val')
    return no_par, skip_char, default_lang


TOKEN = re.compile(r'<[^>]+>|[^<]+')
KATA = re.compile(r'[A-Za-z]+')
STYLE_TETAP = {'Heading1', 'Heading2', 'Heading3', 'Heading4', 'Title', 'Subtitle', 'Caption', 'TOC1', 'TOC2', 'TOC3',
               'TableofFigures', 'Bibliography'}


def _attr(tag, name):
    m = re.search(r'\b' + name + r'="([^"]*)"', tag)
    return m.group(1) if m else None


def _true(tag):
    v = _attr(tag, 'w:val')
    return v is None or v not in ('0', 'false', 'off')


def proses_xml(xml, hy, no_par, skip_char, stat):
    out = []
    tbl = 0
    par_skip = False
    run_skip = False
    in_t = False
    in_ppr = False
    in_rpr = False
    in_instr = False
    in_hlink = False
    for tok in TOKEN.findall(xml):
        if tok.startswith('<'):
            name = re.match(r'</?([\w:]+)', tok)
            name = name.group(1) if name else ''
            closing = tok.startswith('</')
            selfclose = tok.endswith('/>')
            if name == 'w:tbl':
                tbl += -1 if closing else (0 if selfclose else 1)
            elif name == 'w:p' and not closing:
                par_skip = tbl > 0
            elif name == 'w:pPr':
                in_ppr = not closing and not selfclose
            elif name == 'w:pStyle' and in_ppr:
                v = _attr(tok, 'w:val')
                if v in no_par or v in STYLE_TETAP or v in skip_char:
                    par_skip = True
            elif name == 'w:suppressAutoHyphens' and in_ppr and not in_rpr and _true(tok):
                par_skip = True
            elif name == 'w:r' and not closing and not selfclose:
                run_skip = False
            elif name == 'w:rPr':
                in_rpr = not closing and not selfclose
            elif in_rpr and not in_ppr:
                if name == 'w:rStyle' and _attr(tok, 'w:val') in skip_char:
                    run_skip = True
                elif name == 'w:lang':
                    v = _attr(tok, 'w:val')
                    if v and not v.lower().startswith('id'):
                        run_skip = True
                elif name == 'w:i' and _true(tok):
                    run_skip = True
                elif name == 'w:noProof' and _true(tok):
                    run_skip = True
            elif name == 'w:t':
                in_t = not closing and not selfclose
            elif name == 'w:instrText':
                in_instr = not closing and not selfclose
            elif name == 'w:hyperlink':
                in_hlink = not closing and not selfclose
            out.append(tok)
            continue
        if not in_t or in_instr or par_skip or run_skip or in_hlink:
            out.append(tok)
            continue
        out.append(sisip_teks(tok, hy, stat))
    return ''.join(out)


def sisip_teks(text, hy, stat):
    # teks di dalam <w:t>: entitas XML (&amp; dst.) dibiarkan karena tidak memuat huruf yang dipenggal
    res = []
    pos = 0
    for m in re.finditer(r'\S+', text):
        res.append(text[pos:m.start()])
        tok = m.group(0)
        pos = m.end()
        if re.search(r'[/@\\_0-9]|www\.|https?|&[a-z]+;.*\w', tok):
            res.append(tok)
            continue

        def ganti(mk):
            w = mk.group(0)
            if len(w) < MIN_KATA or (w.isupper() and len(w) > 1) or re.search(r'[a-z][A-Z]', w):
                return w
            pts = hy.titik(w)
            if not pts:
                return w
            stat['kata'] += 1
            stat['titik'] += len(pts)
            s, last = '', 0
            for p in pts:
                s += w[last:p] + '\x00'
                last = p
            return s + w[last:]
        res.append(KATA.sub(ganti, tok))
    res.append(text[pos:])
    joined = ''.join(res)
    return joined.replace('\x00', '</w:t>' + SOFT + '<w:t xml:space="preserve">')


def hapus_xml(xml):
    xml = xml.replace(SOFT, '')
    return re.sub(r'</w:t><w:t xml:space="preserve">', '', xml)


BAGIAN = re.compile(r'word/(document|footnotes|endnotes)\.xml$')


def proses_berkas(src, dst, hy, hapus=False):
    stat = {'kata': 0, 'titik': 0}
    with zipfile.ZipFile(src) as z:
        no_par, skip_char, dlang = baca_styles(z)
        items = [(i, z.read(i.filename)) for i in z.infolist()]
    if dlang and not dlang.lower().startswith('id') and not hapus:
        print(f'PERHATIAN: bahasa bawaan dokumen adalah {dlang}, bukan Indonesia (id-ID). Ubah bahasa naskah ke '
              'Indonesian (Review → Language → Set Proofing Language) agar Word tidak memenggal teks Indonesia '
              'dengan pola bahasa lain.', file=sys.stderr)
    with zipfile.ZipFile(dst, 'w', zipfile.ZIP_DEFLATED) as out:
        for info, data in items:
            if BAGIAN.match(info.filename):
                xml = data.decode('utf-8')
                xml = hapus_xml(xml)
                if not hapus:
                    xml = proses_xml(xml, hy, no_par, skip_char, stat)
                data = xml.encode('utf-8')
            out.writestr(info, data)
    return stat


def main(argv):
    pola = os.path.join(HERE, 'hyph-id-mti.pat')
    args = [a for a in argv if not a.startswith('--')]
    if '--pola' in argv:
        pola = argv[argv.index('--pola') + 1]
        args.remove(pola)
    hy = Pemenggal(pola)
    if '--kata' in argv:
        for w in args:
            print(hy.penggal(w))
        return 0
    if not args:
        print(__doc__)
        return 1
    src = args[0]
    dst = args[1] if len(args) > 1 else re.sub(r'(\.docx?)$', '', src, flags=re.I) + ('-tanpa-penggal' if '--hapus' in argv else '-dipenggal') + '.docx'
    if os.path.abspath(src) == os.path.abspath(dst):
        print('Berkas hasil harus berbeda dari berkas asli.', file=sys.stderr)
        return 1
    stat = proses_berkas(src, dst, hy, hapus='--hapus' in argv)
    if '--hapus' in argv:
        print(f'Semua tanda pemenggal opsional dihapus: {dst}')
    else:
        print(f'{stat["kata"]} kata diberi {stat["titik"]} titik pemenggalan: {dst}')
    return 0


if __name__ == '__main__':
    sys.exit(main(sys.argv[1:]))
