#!/usr/bin/env bash
# Membangkitkan ulang pedoman (.docx) dan pratinjau PDF.
# Prasyarat: Node.js + paket "docx", Python 3, LibreOffice (soffice), poppler-utils (pdfinfo).
set -e
cd "$(dirname "$0")"
SOFFICE=${SOFFICE:-soffice}
node build.js raw.docx
python3 post.py raw.docx pass1.docx
timeout 200 $SOFFICE --headless --convert-to pdf pass1.docx >/dev/null 2>&1
python3 post.py raw.docx pass2.docx pass1.pdf
timeout 200 $SOFFICE --headless --convert-to pdf pass2.docx >/dev/null 2>&1
python3 post.py raw.docx final.docx pass2.pdf
timeout 200 $SOFFICE --headless --convert-to pdf final.docx >/dev/null 2>&1
pdfinfo final.pdf | grep Pages
