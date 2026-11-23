#!/usr/bin/env bash
# Membangkitkan ulang pedoman (.docx) dan pratinjau PDF.
# Naskah rata kiri-kanan; kata bahasa Indonesia diberi tanda pemenggal opsional dengan
# pemenggal/pemenggal_id.py (salinan dari paket proofing madzul/autohyphen-ejaan-id).
# Prasyarat: Node.js + paket "docx", Python 3, LibreOffice (soffice), poppler-utils (pdfinfo).
set -e
cd "$(dirname "$0")"
SOFFICE=${SOFFICE:-soffice}
PG="python3 pemenggal/pemenggal_id.py"
render() { timeout 200 $SOFFICE --headless --convert-to pdf "$1" >/dev/null 2>&1; }
node build.js raw.docx
python3 post.py raw.docx p1.docx && $PG p1.docx pass1.docx >/dev/null && render pass1.docx
python3 post.py raw.docx p2.docx pass1.pdf && $PG p2.docx pass2.docx >/dev/null && render pass2.docx
python3 post.py raw.docx p3.docx pass2.pdf && $PG p3.docx final.docx && render final.docx
pdfinfo final.pdf | grep Pages
