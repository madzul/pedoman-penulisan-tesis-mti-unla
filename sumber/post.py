"""Post-process docx: add lineRule=auto, and pre-fill TOC fields with entries + page numbers from a rendered PDF.
usage: post.py in.docx out.docx [rendered.pdf]"""
import sys, re, zipfile, subprocess, html

src, dst = sys.argv[1], sys.argv[2]
pdf = sys.argv[3] if len(sys.argv) > 3 else None
TEXT_W = 7937
FONT = '<w:rPr><w:rFonts w:ascii="Times New Roman" w:hAnsi="Times New Roman" w:cs="Times New Roman"/></w:rPr>'

z = zipfile.ZipFile(src)
files = {n: z.read(n) for n in z.namelist()}
doc = files['word/document.xml'].decode('utf8')
sty = files['word/styles.xml'].decode('utf8')

def add_rule(x):
    return re.sub(r'<w:spacing((?:(?!/>)[^>])*?)w:line="(\d+)"((?:(?!/>)[^>])*)/>',
                  lambda m: m.group(0) if 'lineRule' in m.group(0) else f'<w:spacing{m.group(1)}w:line="{m.group(2)}" w:lineRule="auto"{m.group(3)}/>', x)
doc = add_rule(doc); sty = add_rule(sty)

# collect headings in order
heads = []  # (kind, text)
cnt = [0, 0, 0]
ROM = ['', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X']
for p in re.findall(r'<w:p>.*?</w:p>|<w:p [^>]*>.*?</w:p>', doc):
    m = re.search(r'<w:pStyle w:val="(HeadingBab|HeadingSubbab|HeadingAnakSubbab|JudulBagian|JudulLampiran)"/>', p)
    if not m:
        continue
    parts = re.findall(r'<w:t(?: [^>]*)?>(.*?)</w:t>|(<w:tab/>)', p)
    t = html.unescape(''.join(a if a else '\t' for a, b in parts))
    k = m.group(1)
    if k == 'HeadingBab':
        cnt[0] += 1; cnt[1] = cnt[2] = 0
        t = f'Bab {ROM[cnt[0]]}\t{t}'; kind = 'Heading1'
    elif k == 'HeadingSubbab':
        cnt[1] += 1; cnt[2] = 0
        t = f'{ROM[cnt[0]]}.{cnt[1]}\t{t}'; kind = 'Heading2'
    elif k == 'HeadingAnakSubbab':
        cnt[2] += 1
        t = f'{ROM[cnt[0]]}.{cnt[1]}.{cnt[2]}\t{t}'; kind = 'Heading3'
    elif k == 'JudulBagian':
        kind = 'Heading1'
    else:
        kind = k
    heads.append((kind, t))

def norm(s):
    return re.sub(r'\s+', '', s)

pages = {}
if pdf:
    n = int(re.search(r'Pages:\s+(\d+)', subprocess.run(['pdfinfo', pdf], capture_output=True, text=True).stdout).group(1))
    txt = [subprocess.run(['pdftotext', '-f', str(i), '-l', str(i), '-layout', pdf, '-'], capture_output=True, text=True).stdout for i in range(1, n + 1)]
    ntxt = [norm(t) for t in txt]
    # body start: first page whose text contains 'BabIPendahuluan' heading after front matter; find page with 'BukuPedomanPenulisanTesisMagisterEdisiRevisi2026,untuk'
    body = next(i for i, t in enumerate(ntxt) if 'untukseterusnyadisebutbukupedoman' in t)
    def roman(k):
        vals = [(10, 'x'), (9, 'ix'), (5, 'v'), (4, 'iv'), (1, 'i')]
        out = ''
        for v, r in vals:
            while k >= v:
                out += r; k -= v
        return out
    cur = 1  # skip cover
    for idx, (kind, t) in enumerate(heads):
        key = norm(t)
        if t.startswith('Bab I\t') or kind == 'JudulLampiran' or t in ('DAFTAR PUSTAKA', 'LAMPIRAN'):
            cur = max(cur, body)
        start = cur
        found = None
        for i in range(start, n):
            if kind in ('Heading1', 'JudulLampiran'):
                first = norm(next((l for l in txt[i].splitlines() if l.strip()), ''))
                ok = first.startswith(key[:15])
            else:
                ok = key in ntxt[i]
            if ok:
                found = i; break
        if found is None:
            print('NOT FOUND', t); continue
        cur = found
        pages[idx] = roman(found) if found < body else str(found - body + 1)

def entry(text, page, level, lampiran=False):
    num, _, title = text.partition('\t')
    if lampiran:
        tabs = f'<w:tabs><w:tab w:val="left" w:pos="1418"/><w:tab w:val="right" w:leader="dot" w:pos="{TEXT_W}"/></w:tabs>'
        ind = '<w:ind w:left="1418" w:right="567" w:hanging="1418"/>'
    elif level == 1:
        tabs = f'<w:tabs><w:tab w:val="left" w:pos="1134"/><w:tab w:val="right" w:leader="dot" w:pos="{TEXT_W}"/></w:tabs>'
        ind = '<w:ind w:left="1134" w:right="567" w:hanging="1134"/>' if title else '<w:ind w:right="567"/>'
    elif level == 2:
        tabs = f'<w:tabs><w:tab w:val="left" w:pos="1985"/><w:tab w:val="right" w:leader="dot" w:pos="{TEXT_W}"/></w:tabs>'
        ind = '<w:ind w:left="1985" w:right="567" w:hanging="851"/>'
    else:
        tabs = f'<w:tabs><w:tab w:val="left" w:pos="2836"/><w:tab w:val="right" w:leader="dot" w:pos="{TEXT_W}"/></w:tabs>'
        ind = '<w:ind w:left="2836" w:right="567" w:hanging="851"/>'
    style = f'TOC{level}'
    before = '120' if (level == 1 and not lampiran) else '0'
    body = (f'<w:r>{FONT}<w:t xml:space="preserve">{html.escape(num)}</w:t></w:r><w:r>{FONT}<w:tab/></w:r>'
            f'<w:r>{FONT}<w:t xml:space="preserve">{html.escape(title)}</w:t></w:r>') if title else f'<w:r>{FONT}<w:t xml:space="preserve">{html.escape(num)}</w:t></w:r>'
    return (f'<w:pPr><w:pStyle w:val="{style}"/>{tabs}<w:spacing w:before="{before}" w:after="40" w:line="240" w:lineRule="auto"/>{ind}</w:pPr>'
            f'{body}<w:r>{FONT}<w:tab/></w:r><w:r>{FONT}<w:t>{page}</w:t></w:r>')

def build(entries):
    # entries: list of pPr+runs strings; put field begin/separate in first, end in last
    begin_re = None
    return entries

def fill(alias, entries_xml):
    global doc
    pat = re.compile(r'(<w:sdt><w:sdtPr><w:alias w:val="' + alias + r'"/></w:sdtPr><w:sdtContent>)<w:p><w:r>(<w:fldChar w:fldCharType="begin"[^>]*/><w:instrText[^>]*>.*?</w:instrText><w:fldChar w:fldCharType="separate"/>)</w:r></w:p><w:p><w:r><w:fldChar w:fldCharType="end"/></w:r></w:p>(</w:sdtContent></w:sdt>)')
    m = pat.search(doc)
    assert m, alias
    ps = []
    for i, e in enumerate(entries_xml):
        ppr_end = e.index('</w:pPr>') + len('</w:pPr>')
        ppr, runs = e[:ppr_end], e[ppr_end:]
        if i == 0:
            runs = f'<w:r>{m.group(2)}</w:r>' + runs
        if i == len(entries_xml) - 1:
            runs = runs + '<w:r><w:fldChar w:fldCharType="end"/></w:r>'
        ps.append(f'<w:p>{ppr}{runs}</w:p>')
    doc = doc[:m.start()] + m.group(1) + ''.join(ps) + m.group(3) + doc[m.end():]

toc_e, lamp_e = [], []
skip_titles = {'DAFTAR ISI'}  # Word would list it; keep as in original pedoman (listed). Keep everything.
for idx, (kind, t) in enumerate(heads):
    pg = pages.get(idx, '')
    if kind == 'JudulLampiran':
        lamp_e.append(entry(t, pg, 1, lampiran=True))
    else:
        lvl = {'Heading1': 1, 'Heading2': 2, 'Heading3': 3}[kind]
        toc_e.append(entry(t, pg, lvl))
fill('Daftar Isi', toc_e)
fill('Daftar Lampiran', lamp_e)
# link numbering to heading styles so new headings auto-number
mm = re.search(r'<w:pStyle w:val="HeadingBab"/>.*?<w:numId w:val="(\d+)"/>', doc)
if mm:
    nid = mm.group(1)
    for sid, lvl in (('HeadingBab', 0), ('HeadingSubbab', 1), ('HeadingAnakSubbab', 2)):
        sm = re.search(r'(<w:style [^>]*w:styleId="' + sid + r'"[^>]*>.*?<w:pPr>(?:<w:keepNext/>)?(?:<w:keepLines/>)?)', sty, re.S)
        if sm:
            sty = sty[:sm.end()] + f'<w:numPr><w:ilvl w:val="{lvl}"/><w:numId w:val="{nid}"/></w:numPr>' + sty[sm.end():]
# headings are never hyphenated
for sid in ('HeadingBab', 'HeadingSubbab', 'HeadingAnakSubbab', 'JudulBagian', 'JudulLampiran'):
    sm = re.search(r'<w:style [^>]*w:styleId="' + sid + r'"[^>]*>.*?</w:style>', sty, re.S)
    if sm and 'suppressAutoHyphens' not in sm.group(0):
        blk = sm.group(0).replace('<w:spacing', '<w:suppressAutoHyphens/><w:spacing', 1)
        sty = sty[:sm.start()] + blk + sty[sm.end():]
# Indonesian language for proofing and hyphenation
sty = sty.replace('</w:rPr></w:rPrDefault>', '<w:lang w:val="id-ID" w:eastAsia="id-ID" w:bidi="ar-SA"/></w:rPr></w:rPrDefault>', 1)
st = files['word/settings.xml'].decode('utf8')
if 'autoHyphenation' not in st:
    st = st.replace('<w:evenAndOddHeaders', '<w:autoHyphenation/><w:consecutiveHyphenLimit w:val="2"/><w:hyphenationZone w:val="357"/><w:evenAndOddHeaders', 1)
    assert 'autoHyphenation' in st
files['word/settings.xml'] = st.encode('utf8')
# remove dirty flag so Word doesn't force-update prompt? keep updateFields for accuracy
files['word/document.xml'] = doc.encode('utf8')
files['word/styles.xml'] = sty.encode('utf8')
with zipfile.ZipFile(dst, 'w', zipfile.ZIP_DEFLATED) as out:
    for n, b in files.items():
        if n.endswith('/'):
            continue
        out.writestr(n, b)
print('heads', len(heads), 'paged', len(pages))
