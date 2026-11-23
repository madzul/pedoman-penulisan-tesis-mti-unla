# Pedoman Penulisan Tesis MTI UnLa

Repositori ini memuat **Pedoman Penulisan Tesis Magister, Program Studi Magister Teknik Informatika (MTI), Pascasarjana Universitas Langlangbuana, Edisi Revisi 2026**, beserta **Panduan Penggunaan AI Pascasarjana UNLA** yang dirujuk oleh pedoman tersebut.

Status: **draf** untuk ditelaah tim penyusun. Nomor SK dan beberapa nama anggota tim belum diisi.

## Isi repositori

| Berkas | Keterangan |
| --- | --- |
| [`pedoman/Pedoman-Penulisan-Tesis-MTI-UnLa-Edisi-Revisi-2026.docx`](pedoman/Pedoman-Penulisan-Tesis-MTI-UnLa-Edisi-Revisi-2026.docx) | Pedoman edisi revisi 2026 (Word, siap sunting) |
| [`pedoman/Pedoman-Penulisan-Tesis-MTI-UnLa-Edisi-Revisi-2026-pratinjau.pdf`](pedoman/Pedoman-Penulisan-Tesis-MTI-UnLa-Edisi-Revisi-2026-pratinjau.pdf) | Pratinjau PDF pedoman |
| [`RINGKASAN-PERUBAHAN.md`](RINGKASAN-PERUBAHAN.md) | Ringkasan perubahan dari edisi Juni 2021 dan hal yang masih perlu diputuskan |
| [`panduan-ai/Panduan-Penggunaan-AI-Pascasarjana-UNLA.docx`](panduan-ai/Panduan-Penggunaan-AI-Pascasarjana-UNLA.docx) | Draf Panduan Penggunaan AI Pascasarjana UNLA (kategori A–D, pengungkapan, sanksi, formulir) |
| [`sumber/`](sumber/) | Skrip pembangkit berkas pedoman (docx-js) dan gambar pendukung |

## Pokok perubahan edisi 2026

- Kewajiban pengungkapan penggunaan AI generatif (subbab VIII.10, Lampiran H) yang selaras dengan Panduan Penggunaan AI Pascasarjana UNLA.
- Bab Pendahuluan kini memuat tujuan, lingkup, asumsi, hipotesis, dan diagram alir penelitian.
- Spesifikasi format yang lebih rinci, contoh bernuansa informatika, dan penyesuaian ke EYD Edisi V.
- Penyeragaman istilah (NPM, Pascasarjana) dan perbaikan salah ketik.

Rincian lengkap ada di [RINGKASAN-PERUBAHAN.md](RINGKASAN-PERUBAHAN.md).

## Paket proofing bahasa Indonesia

Templat Word ber-style, berkas CSL Zotero, kamus istilah, pola pemenggalan kata sesuai EYD V (PUEBI), serta templat LaTeX untuk tesis MTI tersedia di repositori terpisah:
**[madzul/autohyphen-ejaan-id](https://github.com/madzul/autohyphen-ejaan-id)**.

## Membangkitkan ulang berkas pedoman

Berkas `.docx` dibangkitkan dari skrip di folder `sumber/`. Prasyarat: Node.js dengan paket `docx`, Python 3, LibreOffice, dan poppler-utils.

```bash
cd sumber
npm install docx
./run.sh        # menghasilkan final.docx dan final.pdf
```

Naskah pedoman ditulis rata kiri-kanan dengan pemenggalan kata. Karena Word tidak memiliki pola pemenggalan bahasa Indonesia, `run.sh` menyisipkan tanda pemenggal opsional dengan `sumber/pemenggal/pemenggal_id.py` (salinan dari paket proofing `madzul/autohyphen-ejaan-id`). Setelah menyunting `.docx` secara langsung, jalankan ulang pemenggal itu pada berkas hasil suntingan.

Penyuntingan kecil dapat langsung dilakukan pada berkas `.docx` di Word. Saat dibuka, pilih **Yes** bila Word meminta memperbarui *field* agar daftar isi dan nomor halaman disegarkan.

## Masukan

Masukan atas pedoman dapat disampaikan melalui *issue* di repositori ini atau langsung kepada tim penyusun Program Studi MTI UnLa.
