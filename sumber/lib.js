const fs = require('fs');
const path = require('path');
const D = require('docx');
const {
  Paragraph, TextRun, AlignmentType, HeadingLevel, Table, TableRow, TableCell, WidthType,
  BorderStyle, ShadingType, ImageRun, PageBreak, TabStopType, VerticalAlign,
} = D;

const FONT = 'Times New Roman';
const LINE15 = 360, LINE1 = 240;
const TEXT_W = 11906 - 2268 - 1701; // A4 width - 4cm - 3cm = 7937 dxa
let listInstance = 0;

// inline markup: **bold**, *italic*, ***bold italic***
function runs(text, base = {}) {
  const out = [];
  const re = /(\*\*\*[^*]+\*\*\*|\*\*[^*]+\*\*|\*[^*]+\*)/g;
  let last = 0, m;
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(new TextRun({ text: text.slice(last, m.index), font: FONT, ...base }));
    const t = m[0];
    if (t.startsWith('***')) out.push(new TextRun({ text: t.slice(3, -3), bold: true, italics: true, font: FONT, ...base }));
    else if (t.startsWith('**')) out.push(new TextRun({ text: t.slice(2, -2), bold: true, font: FONT, ...base }));
    else out.push(new TextRun({ text: t.slice(1, -1), italics: true, font: FONT, ...base }));
    last = m.index + t.length;
  }
  if (last < text.length) out.push(new TextRun({ text: text.slice(last), font: FONT, ...base }));
  return out;
}

const P = (text, o = {}) => new Paragraph({
  children: runs(text, o.run || {}),
  alignment: o.align || AlignmentType.JUSTIFIED,
  spacing: { line: o.line || LINE15, before: 0, after: o.after ?? 360 },
  indent: o.indent,
  keepNext: o.keepNext,
  style: o.style,
});
const C = (text, o = {}) => P(text, { align: AlignmentType.CENTER, ...o });

// Heading Bab / Subbab / Anak Subbab: numbering otomatis (Bab I, I.1, I.1.1) yang ditautkan ke style
const H1 = (num, title, o = {}) => new Paragraph({
  style: 'HeadingBab',
  pageBreakBefore: o.noBreak ? false : true,
  numbering: { reference: 'judulbab', level: 0 },
  children: [new TextRun({ text: title, font: FONT })],
});
const H2 = (num, title) => new Paragraph({
  style: 'HeadingSubbab',
  numbering: { reference: 'judulbab', level: 1 },
  children: [new TextRun({ text: title, font: FONT })],
});
const H3 = (num, title) => new Paragraph({
  style: 'HeadingAnakSubbab',
  numbering: { reference: 'judulbab', level: 2 },
  children: [new TextRun({ text: title, font: FONT })],
});
// judul bagian tanpa nomor (KATA PENGANTAR, DAFTAR ISI, DAFTAR PUSTAKA, LAMPIRAN)
const HF = (title, o = {}) => new Paragraph({
  style: 'JudulBagian',
  pageBreakBefore: o.noBreak ? false : true,
  children: [new TextRun({ text: title, font: FONT })],
});
// lampiran title
const HL = (code, title) => new Paragraph({
  style: 'JudulLampiran',
  pageBreakBefore: true,
  children: [new TextRun({ text: `Lampiran ${code}\t${title}`, font: FONT })],
  tabStops: [{ type: TabStopType.LEFT, position: 1418 }],
  indent: { left: 1418, hanging: 1418 },
});

function list(items, kind = 'num', o = {}) {
  const inst = ++listInstance;
  return items.map((it) => {
    const lvl = Array.isArray(it) ? 1 : 0;
    const t = Array.isArray(it) ? it[0] : it;
    return new Paragraph({
      children: runs(t),
      numbering: { reference: kind === 'num' ? 'angka' : kind === 'alpha' ? 'huruf' : 'butir', level: lvl, instance: inst },
      alignment: AlignmentType.JUSTIFIED,
      spacing: { line: o.line || LINE15, before: 0, after: 0 },
    });
  }).concat(o.noGap ? [] : [new Paragraph({ children: [], spacing: { after: 0, line: 240 } })]);
}

// pustaka with hanging indent 1,27 cm, single spaced
const REF = (text, o = {}) => new Paragraph({
  children: runs(text),
  alignment: AlignmentType.JUSTIFIED,
  spacing: { line: LINE1, before: 0, after: o.after ?? 120 },
  indent: { left: 720 + (o.left || 0), hanging: 720 },
});

const border = { style: BorderStyle.SINGLE, size: 4, color: '000000' };
const borders = { top: border, bottom: border, left: border, right: border };
const nob = { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' };
const noBorders = { top: nob, bottom: nob, left: nob, right: nob };

function table(rows, widths, o = {}) {
  const total = widths.reduce((a, b) => a + b, 0);
  return new Table({
    width: { size: total, type: WidthType.DXA },
    columnWidths: widths,
    alignment: AlignmentType.CENTER,
    rows: rows.map((r, ri) => new TableRow({
      tableHeader: ri === 0 && o.header !== false,
      cantSplit: true,
      children: r.map((cell, ci) => new TableCell({
        width: { size: widths[ci], type: WidthType.DXA },
        borders: o.noBorders ? noBorders : borders,
        shading: ri === 0 && o.header !== false && !o.noShade ? { fill: 'E7E6E6', type: ShadingType.CLEAR, color: 'auto' } : undefined,
        margins: { top: 40, bottom: 40, left: 90, right: 90 },
        verticalAlign: VerticalAlign.CENTER,
        children: String(cell).split('\n').map((line) => new Paragraph({
          children: runs(line, { size: o.size || 22, bold: ri === 0 && o.header !== false ? true : undefined }),
          alignment: (o.align && o.align[ci]) || (ri === 0 && o.header !== false ? AlignmentType.CENTER : AlignmentType.LEFT),
          spacing: { line: LINE1, before: 0, after: 0 },
        })),
      })),
    })),
  });
}

const caption = (text, o = {}) => new Paragraph({
  children: runs(text),
  alignment: o.long ? AlignmentType.JUSTIFIED : AlignmentType.CENTER,
  indent: o.long ? { left: o.hang || 1418, hanging: o.hang || 1418 } : undefined,
  tabStops: o.long ? [{ type: TabStopType.LEFT, position: o.hang || 1418 }] : undefined,
  spacing: { line: LINE1, before: o.before ?? 120, after: o.after ?? 240 },
  keepNext: o.keepNext,
});

function img(file, wPx, hPx, o = {}) {
  return new Paragraph({
    alignment: o.align || AlignmentType.CENTER,
    spacing: { before: o.before ?? 120, after: o.after ?? 120 },
    keepNext: o.keepNext ?? true,
    children: [new ImageRun({ type: 'png', data: fs.readFileSync(path.join(__dirname, file)), transformation: { width: wPx, height: hPx } })],
  });
}
const blank = (n = 1, line = LINE1) => Array.from({ length: n }, () => new Paragraph({ children: [], spacing: { line, before: 0, after: 0 } }));
const note = (text) => new Paragraph({
  children: runs(text, { size: 20, color: '555555' }),
  alignment: AlignmentType.JUSTIFIED,
  spacing: { line: LINE1, before: 120, after: 120 },
});
const boxNote = (lines) => new Table({
  width: { size: TEXT_W, type: WidthType.DXA }, columnWidths: [TEXT_W],
  rows: [new TableRow({ children: [new TableCell({
    width: { size: TEXT_W, type: WidthType.DXA }, borders,
    shading: { fill: 'F2F2F2', type: ShadingType.CLEAR, color: 'auto' },
    margins: { top: 100, bottom: 100, left: 140, right: 140 },
    children: lines.map((l) => new Paragraph({ children: runs(l, { size: 22 }), alignment: AlignmentType.JUSTIFIED, spacing: { line: LINE1, after: 80 } })),
  })] })],
});

module.exports = { D, FONT, LINE15, LINE1, TEXT_W, runs, P, C, H1, H2, H3, HF, HL, list, REF, table, caption, img, blank, note, boxNote, borders, noBorders };
