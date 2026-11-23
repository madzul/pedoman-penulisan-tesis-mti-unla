const fs = require('fs');
const L = require('./lib');
const B = require('./content_body');
const { D, FONT, LINE15, LINE1, TEXT_W, runs, P, C, HF, HL, list, REF, table, caption, img, blank, note, boxNote, noBorders } = L;
const {
  Document, Packer, Paragraph, TextRun, AlignmentType, HeadingLevel, Footer, PageNumber, NumberFormat,
  TableOfContents, StyleLevel, LevelFormat, TabStopType, PositionalTab, PositionalTabAlignment, PositionalTabRelativeTo,
  PositionalTabLeader, SectionType, LevelSuffix, Table, TableRow, TableCell, WidthType, BorderStyle,
} = D;
const PANDUAN = B.PANDUAN;
const CM = (x) => Math.round(x * 567);

const bold14 = { bold: true, size: 28 };
const c1 = (t, run = {}, o = {}) => new Paragraph({ alignment: AlignmentType.CENTER, spacing: { line: LINE1, before: o.before || 0, after: o.after || 0 }, children: runs(t, run) });

// ---------- Cover ----------
const cover = [
  ...blank(4),
  c1('PEDOMAN PENULISAN', { bold: true, size: 36 }),
  c1('TESIS MAGISTER', { bold: true, size: 36 }, { after: 240 }),
  c1('Edisi Revisi 2026', { size: 26 }),
  ...blank(5),
  img('logo.png', 132, 134, { keepNext: false }),
  ...blank(6),
  c1('UNIVERSITAS LANGLANGBUANA', bold14),
  c1('Program Studi Magister Teknik Informatika', { bold: true, size: 26 }),
  c1('Pascasarjana', { bold: true, size: 26 }),
  c1('November 2026', { bold: true, size: 26 }, { before: 120 }),
];

// ---------- Front matter ----------
const kataPengantar = [
  HF('KATA PENGANTAR', { noBreak: true }),
  P('Program Pascasarjana Universitas Langlangbuana (UnLa) merupakan salah satu unit pelaksana kegiatan akademik UnLa yang bersama-sama dengan fakultas bertanggung jawab atas penyelenggaraan pendidikan pascasarjana. Seluruh rancangan program di Pascasarjana UnLa berlandaskan upaya universitas untuk menjadikan pendidikan pascasarjana sebagai ujung tombak pendidikan di Universitas Langlangbuana.'),
  P('Untuk mewujudkan hal tersebut, Pascasarjana berperan sebagai pelaksana penjaminan mutu melalui koordinasi dengan Satuan Penjaminan Mutu (SPM) UnLa dan fakultas di lingkungan Universitas Langlangbuana, pengembangan program, pelaksanaan sidang program magister, serta penyusunan prosedur operasional baku (SOP) dan pedoman. Bersama pihak-pihak terkait, Program Studi Magister Teknik Informatika (MTI) senantiasa merumuskan kebijakan yang berkaitan dengan penjaminan mutu dan pelaksanaannya, antara lain dengan menyusun buku *Pedoman Penulisan Tesis Magister* ini.'),
  P(`Edisi Revisi 2026 ini memperbarui pedoman edisi Juni 2021. Pembaruan utama meliputi kewajiban mengungkapkan penggunaan kecerdasan artifisial (AI) generatif dengan merujuk pada ${PANDUAN}, penambahan halaman pernyataan keaslian dan halaman pernyataan penggunaan AI generatif, penyempurnaan isi Bab Pendahuluan, abstrak, dan tinjauan pustaka, ketentuan format yang lebih rinci, penyesuaian dengan Ejaan Bahasa Indonesia Edisi V, serta penyediaan templat tesis dan gaya sitasi untuk perangkat lunak pengelola referensi. Sebagian pembaruan tersebut diadaptasi dari *Petunjuk Teknis Penulisan Tesis Magister* Sekolah Pascasarjana ITB.`),
  P('Buku pedoman ini disusun oleh Tim Satuan Tugas Program Studi Magister Teknik Informatika, Pascasarjana UnLa, berdasarkan Surat Keputusan Direktur Pascasarjana UnLa Nomor .............................., dengan susunan anggota tim sebagai berikut:', { after: 0 }),
  ...list(['Dr.-Ing. M. Hendayun', 'Dr. Arief Zulianto, S.T., M.T.', '..............................', '..............................', '..............................']),
  P('Dengan selesainya buku *Pedoman Penulisan Tesis Magister Edisi Revisi 2026* ini, kami mengucapkan terima kasih kepada seluruh anggota tim satuan tugas dan pihak lain yang telah berkontribusi dalam penyusunannya. Semoga buku pedoman ini menjadi rujukan bagi seluruh mahasiswa Program Studi Magister Teknik Informatika dalam menyusun tesis di Universitas Langlangbuana.'),
  ...blank(1),
  new Paragraph({ indent: { left: CM(9) }, spacing: { line: LINE1 }, children: runs('Bandung, November 2026') }),
  new Paragraph({ indent: { left: CM(9) }, spacing: { line: LINE1 }, children: runs('Direktur Pascasarjana,') }),
  ...blank(4),
  new Paragraph({ indent: { left: CM(9) }, spacing: { line: LINE1 }, children: runs('(....................................)') }),
];

const daftarIsi = [
  HF('DAFTAR ISI'),
  new TableOfContents('Daftar Isi', { hyperlink: true, stylesWithLevels: [new StyleLevel('Judul Bagian', 1), new StyleLevel('Heading Bab', 1), new StyleLevel('Heading Subbab', 2), new StyleLevel('Heading Anak Subbab', 3)] }),
];
const daftarLampiran = [
  HF('DAFTAR LAMPIRAN'),
  new TableOfContents('Daftar Lampiran', { hyperlink: true, stylesWithLevels: [new StyleLevel('JudulLampiran', 1)] }),
];
const daftarTabel = [
  HF('DAFTAR TABEL'),
  ...[
    ['Tabel III.1', 'Ringkasan spesifikasi format naskah tesis'],
    ['Tabel VI.1', 'Cara penulisan rujukan dalam teks tesis'],
    ['Tabel VIII.1', 'Kategori penggunaan AI generatif'],
  ].map(([a, b]) => new Paragraph({ spacing: { line: LINE1, after: 120 }, tabStops: [{ type: TabStopType.LEFT, position: 1418 }], children: runs(`${a}\t${b}`) })),
  note('Catatan: daftar tabel pada tesis dibangkitkan otomatis dengan fasilitas *Insert Table of Figures* pada pengolah kata.'),
];

// ---------- Daftar pustaka pedoman ----------
const pustaka = [
  HF('DAFTAR PUSTAKA'),
  REF('Badan Pengembangan dan Pembinaan Bahasa (2022): *Ejaan Bahasa Indonesia yang Disempurnakan Edisi Kelima*, Kementerian Pendidikan, Kebudayaan, Riset, dan Teknologi, Jakarta. https://ejaan.kemdikbud.go.id/. Diakses 23 November 2026.'),
  REF('Booth, W. C., Colomb, G. G., dan Williams, J. M. (1995): *The craft of research*, The University of Chicago Press, Chicago.'),
  REF('DIKTI (2014): *Panduan pengajuan proposal program riset desentralisasi DIKTI 2014*, Direktorat Jenderal Pendidikan Tinggi, Kemendikbud, Jakarta.'),
  REF('FMIPA UGM (2009): *Buku panduan penulisan tugas akhir UGM*, FMIPA UGM, Yogyakarta.'),
  REF('Pascasarjana Universitas Langlangbuana (2026): *Panduan penggunaan kecerdasan artifisial (AI) generatif dalam penyusunan proposal dan tesis* (Panduan Penggunaan AI Pascasarjana UNLA), Universitas Langlangbuana, Bandung.'),
  REF('Phillips, E. M. dan Pugh, D. S. (1993): *How to get a Ph.D.*, UBS Publishers\' Distributors Ltd., New Delhi.'),
  REF('Sekolah Pascasarjana ITB (2008): *Pedoman format penulisan disertasi ITB*, Sekolah Pascasarjana ITB, Bandung.'),
  REF('Sekolah Pascasarjana ITB (2017): *Petunjuk teknis penulisan tesis magister*, Sekolah Pascasarjana ITB, Bandung.'),
];

// ---------- Lampiran ----------
const lampiranCover = [
  new Paragraph({ pageBreakBefore: true, children: [] }),
  ...blank(16),
  new Paragraph({ style: 'JudulBagian', children: [new TextRun({ text: 'LAMPIRAN', font: FONT })] }),
];

const specTable = (rows) => [
  new Paragraph({ spacing: { before: 240, after: 120 }, keepNext: true, children: runs('**Keterangan format:**', { size: 20 }) }),
  table([['Unsur', 'Ketentuan'], ...rows], [2600, TEXT_W - 2600], { size: 18 }),
];

const sampulContent = (judulRun = bold14) => [
  c1('IMPLEMENTASI DETEKSI SERANGAN JARINGAN', judulRun),
  c1('BERBASIS PEMBELAJARAN MESIN PADA PERANGKAT', judulRun),
  c1('RASPBERRY PI', judulRun, { after: 480 }),
  c1('TESIS', bold14, { after: 240 }),
  c1('Karya tulis sebagai salah satu syarat', { bold: true }),
  c1('untuk memperoleh gelar Magister dari', { bold: true }),
  c1('Universitas Langlangbuana', { bold: true }, { after: 480 }),
  c1('Oleh', { bold: true }),
  c1('SALEH WIRADIKARTA', bold14),
  c1('NPM: L250990001', bold14),
  c1('(Program Studi Magister Teknik Informatika)', bold14, { after: 360 }),
  img('logo.png', 130, 132, { keepNext: true }),
  ...blank(1),
  c1('UNIVERSITAS LANGLANGBUANA', bold14),
  c1('Oktober 2026', bold14),
];

const lampA = [
  HL('A', 'Contoh Sampul Tesis'),
  ...blank(1),
  ...sampulContent(),
  ...specTable([
    ['Judul tesis dan kata TESIS', 'Times New Roman 14, kapital, tebal, rata tengah, 1 spasi (*before* 0 pt, *after* 0 pt)'],
    ['Kalimat keterangan dan kata "Oleh"', 'Times New Roman 12, tebal, rata tengah, 1 spasi'],
    ['Nama, NPM, program studi', 'Times New Roman 14, tebal, rata tengah, 1 spasi; nama ditulis kapital'],
    ['Lambang UnLa', 'Tinggi 3,5 cm, proporsional, rata tengah'],
    ['UNIVERSITAS LANGLANGBUANA, bulan dan tahun', 'Times New Roman 14, tebal; bulan dan tahun tepat pada batas bawah bidang cetak'],
    ['Jarak antarunsur', 'Tidak mengikat, proporsional sesuai panjang judul, seluruhnya dalam satu halaman'],
  ]),
];

const lampB = [
  HL('B', 'Contoh Halaman Abstrak'),
  c1('ABSTRAK', bold14, { before: 120, after: 240 }),
  c1('IMPLEMENTASI DETEKSI SERANGAN JARINGAN BERBASIS PEMBELAJARAN MESIN PADA PERANGKAT RASPBERRY PI', bold14, { after: 240 }),
  c1('Oleh', {}, { after: 240 }),
  c1('Saleh Wiradikarta', bold14),
  c1('NPM: L250990001', bold14),
  c1('(Program Studi Magister Teknik Informatika)', bold14, { after: 720 }),
  P('Abstrak tesis memuat secara komprehensif permasalahan ilmiah yang diteliti, yang mencakup latar belakang, permasalahan yang dikaji, tujuan, pendekatan dan metode, tahapan penelitian, hasil, serta kesimpulan. Abstrak juga menyebutkan analisis atau pembuktian hipotesis dan perbandingan hasil dengan penelitian sejenis, menyatakan kebaruan (*novelty*) dan orisinalitas penelitian, serta kontribusinya terhadap khazanah ilmu pengetahuan. Abstrak terdiri atas 500–800 kata, ditulis dalam satu spasi, dan tidak memuat rujukan pustaka, gambar, maupun tabel.', { line: LINE1 }),
  P('Paragraf berikutnya dipisahkan satu baris kosong dari paragraf sebelumnya (dan seterusnya).', { line: LINE1 }),
  P('Kata kunci: deteksi intrusi, pembelajaran mesin, Raspberry Pi, keamanan jaringan', { line: LINE1 }),
  ...specTable([
    ['Kata ABSTRAK', 'Times New Roman 14, tebal, rata tengah, 3 cm dari tepi atas'],
    ['Judul, nama, NPM, program studi', 'Times New Roman 14, tebal, rata tengah, 1 spasi'],
    ['Kata "Oleh"', 'Times New Roman 12, reguler, rata tengah'],
    ['Isi abstrak', 'Times New Roman 12, reguler, rata kiri-kanan, 1 spasi; kalimat pertama berjarak 3 spasi dari baris program studi'],
    ['Kata kunci', 'Satu spasi di bawah paragraf terakhir; paling banyak tujuh kata atau kelompok kata'],
    ['*Abstract*', 'Format sama; judul dan isi dicetak miring; *Master\'s Program in Informatics Engineering*'],
    ['Nomor halaman', 'Angka Romawi kecil, rata tengah, 1,5 cm dari tepi bawah'],
  ]),
];

const lampC = [
  HL('C', 'Contoh Batas Halaman Ganjil (untuk Naskah Tesis yang Dicetak Bolak-Balik)'),
  img('batas_ganjil.png', 330, 458, { keepNext: false }),
  note('Ilustrasi tidak berskala sebenarnya. Pada pengolah kata, gunakan *Layout > Margins > Mirrored* dengan *Inside* 4 cm dan *Outside* 3 cm.'),
];
const lampD = [
  HL('D', 'Contoh Batas Halaman Genap (untuk Naskah Tesis yang Dicetak Bolak-Balik)'),
  img('batas_genap.png', 330, 458, { keepNext: false }),
  note('Ilustrasi tidak berskala sebenarnya.'),
];
const lampE = [
  HL('E', 'Contoh Sampul Tesis dan Penjilidannya (Warna Sampul Biru Gelap/Dongker dengan Tinta Tulisan Berwarna Emas)'),
  img('sampul.png', 420, 486, { keepNext: false }),
  note('Catatan: punggung sampul memuat nama penulis, NPM, judul, lambang UnLa, serta bulan (disingkat) dan tahun.'),
];

const sigLine = (indentCm, lines) => lines.map((t) => new Paragraph({ alignment: AlignmentType.CENTER, spacing: { line: LINE1 }, children: runs(t) }));
const pengesahanHead = [
  ...blank(1),
  c1('IMPLEMENTASI DETEKSI SERANGAN JARINGAN', bold14),
  c1('BERBASIS PEMBELAJARAN MESIN PADA PERANGKAT', bold14),
  c1('RASPBERRY PI', bold14, { after: 480 }),
  c1('Oleh'),
  c1('Saleh Wiradikarta', { bold: true }),
  c1('NPM: L250990001', { bold: true }),
  c1('(Program Studi Magister Teknik Informatika)', { bold: true }, { after: 240 }),
  c1('Universitas Langlangbuana', { bold: true }, { after: 480 }),
];
const twoCol = (left, right) => new Table({
  width: { size: TEXT_W, type: WidthType.DXA }, columnWidths: [TEXT_W / 2, TEXT_W / 2],
  rows: [new TableRow({ children: [left, right].map((col) => new TableCell({
    width: { size: TEXT_W / 2, type: WidthType.DXA }, borders: noBorders,
    children: col.map((t) => new Paragraph({ alignment: AlignmentType.CENTER, spacing: { line: LINE1 }, children: runs(t) })),
  })) })],
});
const lampF = [
  HL('F', 'Contoh Halaman Pengesahan'),
  new Paragraph({ spacing: { after: 120 }, children: runs('**F.1 Contoh dengan Satu Pembimbing**') }),
  ...pengesahanHead,
  c1('Menyetujui'),
  c1('Pembimbing', {}, { after: 120 }),
  c1('Tanggal ..............................', {}, { after: 960 }),
  c1('______________________________'),
  c1('(Prof. Dr. Ir. Dayang Sumbi)'),
  new Paragraph({ pageBreakBefore: true, spacing: { after: 120 }, children: runs('**F.2 Contoh dengan Dua Pembimbing**') }),
  ...pengesahanHead,
  c1('Menyetujui'),
  c1('Tim Pembimbing', {}, { after: 120 }),
  c1('Tanggal ..............................', {}, { after: 360 }),
  twoCol(['Pembimbing Pertama', '', '', '', '', '______________________', '(Prof. Dr. Ir. Dayang Sumbi)'], ['Pembimbing Kedua', '', '', '', '', '______________________', '(Dr. Ir. Joko Tarub)']),
  note('Catatan: halaman pengesahan dicetak 1 spasi; judul ukuran 14 tebal; unsur lain ukuran 12. Baris tanggal diisi tanggal pembimbing mengesahkan naskah final.'),
];

const lampG = [
  HL('G', 'Contoh Halaman Pernyataan Keaslian Tesis'),
  c1('PERNYATAAN KEASLIAN TESIS', bold14, { before: 120, after: 360 }),
  P('Dengan ini saya menyatakan bahwa:'),
  ...list([
    'tesis berjudul "Implementasi Deteksi Serangan Jaringan Berbasis Pembelajaran Mesin pada Perangkat Raspberry Pi" adalah hasil karya saya sendiri dan belum pernah diajukan untuk memperoleh gelar akademik di perguruan tinggi mana pun;',
    'tesis ini merupakan gagasan, rumusan, dan hasil penelitian saya sendiri dengan arahan tim pembimbing;',
    'dalam tesis ini tidak terdapat karya atau pendapat yang telah ditulis atau dipublikasikan orang lain, kecuali yang secara tertulis dicantumkan sebagai acuan dengan menyebut nama pengarang dan dicantumkan dalam daftar pustaka;',
    'penggunaan alat kecerdasan artifisial generatif dalam penyusunan tesis ini telah saya ungkapkan sepenuhnya pada halaman Pernyataan Penggunaan Kecerdasan Artifisial Generatif.',
  ]),
  P('Pernyataan ini saya buat dengan sesungguhnya. Apabila di kemudian hari terdapat penyimpangan dan ketidakbenaran dalam pernyataan ini, saya bersedia menerima sanksi akademik sesuai peraturan yang berlaku di Universitas Langlangbuana.'),
  ...blank(1),
  new Paragraph({ indent: { left: CM(9) }, spacing: { line: LINE1 }, children: runs('Bandung, ............................') }),
  new Paragraph({ indent: { left: CM(9) }, spacing: { line: LINE1 }, children: runs('Yang membuat pernyataan,') }),
  ...blank(4),
  new Paragraph({ indent: { left: CM(9) }, spacing: { line: LINE1 }, children: runs('Saleh Wiradikarta') }),
  new Paragraph({ indent: { left: CM(9) }, spacing: { line: LINE1 }, children: runs('NPM: L250990001') }),
];

// H: pernyataan AI generatif
const idRow = (k, v) => new TableRow({ children: [
  new TableCell({ width: { size: 2400, type: WidthType.DXA }, borders: noBorders, children: [new Paragraph({ spacing: { line: LINE1 }, children: runs(k) })] }),
  new TableCell({ width: { size: TEXT_W - 2400, type: WidthType.DXA }, borders: noBorders, children: [new Paragraph({ spacing: { line: LINE1 }, children: runs(': ' + v) })] }),
] });
const lampH = [
  HL('H', 'Contoh Halaman Pernyataan Penggunaan AI Generatif'),
  new Paragraph({ spacing: { after: 120 }, children: runs('**H.1 Bentuk Formulir**') }),
  c1('PERNYATAAN PENGGUNAAN KECERDASAN ARTIFISIAL GENERATIF', bold14, { before: 0, after: 120 }),
  new Table({ width: { size: TEXT_W, type: WidthType.DXA }, columnWidths: [2400, TEXT_W - 2400], rows: [
    idRow('Nama', '..............................................'),
    idRow('NPM', '..............................................'),
    idRow('Program Studi', 'Magister Teknik Informatika'),
    idRow('Judul Tesis', '..............................................'),
    idRow('Tahap', 'Seminar Proposal / Seminar Hasil / Sidang Tesis'),
  ] }),
  P('**A. Tidak menggunakan AI generatif**', { line: LINE1, after: 60 }),
  P(`☐ Saya menyatakan tidak menggunakan alat kecerdasan artifisial generatif dalam penyusunan tesis ini, selain alat kategori A sebagaimana diatur dalam ${PANDUAN}.`, { line: LINE1 }),
  P('**B. Menggunakan AI generatif**', { line: LINE1, after: 60 }),
  P('☐ Saya menggunakan alat kecerdasan artifisial generatif dengan rincian sebagai berikut:', { line: LINE1, after: 120 }),
  table([
    ['No', 'Alat, versi, penyedia', 'Tanggal/ rentang', 'Tujuan', 'Bagian yang dibantu', 'Cara verifikasi'],
    ['1', '', '', '', '', ''],
    ['2', '', '', '', '', ''],
    ['3', '', '', '', '', ''],
  ], [500, 1600, 1200, 1500, 1500, TEXT_W - 6300], { size: 18 }),
  P('Penggunaan kategori C (bagian dari metode penelitian): ☐ Tidak ada  ☐ Ada, disetujui pembimbing pada tanggal ................ dan diuraikan pada Subbab ..........', { line: LINE1, after: 60 }),
  P('Rincian *prompt* kunci dan keluaran yang dipakai tercantum pada Lampiran .......... (log *prompt*).', { line: LINE1, after: 120 }),
  P('Dengan ini saya menyatakan bahwa:', { line: LINE1, after: 0 }),
  ...list([
    'pernyataan di atas benar dan lengkap;',
    'seluruh keluaran AI yang saya gunakan telah saya periksa, sunting, dan verifikasi terhadap sumber yang kredibel;',
    'argumen, analisis, data, hasil, dan kesimpulan dalam tesis ini merupakan hasil pemikiran dan pekerjaan saya sendiri;',
    'saya tidak memasukkan data rahasia ke layanan AI publik;',
    `saya bertanggung jawab penuh atas isi tesis ini dan bersedia menerima sanksi sesuai ${PANDUAN} apabila pernyataan ini tidak benar.`,
  ], 'num', { line: LINE1 }),
  twoCol(['Mengetahui,', 'Pembimbing Utama,', '', '', '(..............................)', 'NIDN ........................'], ['Bandung, ............................', 'Yang menyatakan,', '', '', '(..............................)', 'NPM ........................']),

  new Paragraph({ pageBreakBefore: true, spacing: { after: 120 }, children: runs('**H.2 Bentuk Naratif**') }),
  P(`Formulir pada H.1 mengikuti Lampiran A ${PANDUAN}; coret pilihan tahap yang tidak perlu. Apabila format pada panduan tersebut diperbarui, gunakan format terbaru. Selain bentuk formulir, halaman pernyataan dalam naskah tesis dapat ditulis secara naratif dengan memuat unsur yang sama. Contoh:`),
  boxNote(['*Contoh 1 (tidak menggunakan AI).* Penulis menyatakan tidak menggunakan alat kecerdasan artifisial generatif dalam penyusunan tesis ini. Pemeriksaan ejaan dilakukan dengan fitur bawaan Microsoft Word dan pengelolaan rujukan dengan Zotero.']),
  ...blank(1),
  boxNote(['*Contoh 2 (perbaikan bahasa dan bantuan kode).* Dalam penyusunan tesis ini, penulis menggunakan ChatGPT (GPT-4o, OpenAI) pada Maret sampai Mei 2026 untuk memperbaiki kejelasan kalimat pada Bab I dan Bab II serta membantu menerjemahkan abstrak ke dalam bahasa Inggris, dan GitHub Copilot pada April sampai Juni 2026 untuk membantu menulis fungsi praproses data pada Lampiran C. Draf awal, rancangan sistem, algoritme utama, dan analisis hasil disusun sendiri oleh penulis. Seluruh keluaran AI telah disunting, kode diuji dengan pengujian unit, dan rincian *prompt* kunci tercantum pada Lampiran F. Penulis bertanggung jawab penuh atas isi tesis ini.']),
  ...blank(1),
  boxNote(['*Contoh 3 (AI sebagai bagian metode, kategori C).* Atas persetujuan pembimbing tanggal 10 Februari 2026, penelitian ini menggunakan model Llama 3.1 8B yang dijalankan secara lokal untuk melabeli awal 5.000 ulasan pengguna. Seluruh label diperiksa ulang oleh dua anotator manusia dengan nilai kesepakatan Cohen\'s kappa 0,82. Prosedur, *prompt*, dan parameter model diuraikan pada Subbab III.4. Data ulasan dianonimkan sebelum diproses.']),

  new Paragraph({ pageBreakBefore: true, spacing: { after: 120 }, children: runs('**H.3 Format Log** ***Prompt*** **(Lampiran Terakhir Tesis)**') }),
  P('Log *prompt* memuat interaksi yang keluarannya dipakai dalam naskah (*prompt* kunci), bukan seluruh percakapan. *Prompt* yang panjang dapat diringkas dengan tetap menjaga maksudnya.'),
  caption('Tabel H.1 Contoh log *prompt*', { before: 0, after: 120, keepNext: true }),
  table([
    ['No', 'Tanggal', 'Alat dan versi', '*Prompt* kunci (ringkas)', 'Keluaran yang dipakai dan penyuntingan', 'Bagian naskah dan verifikasi'],
    ['1', '12-03-2026', 'ChatGPT, GPT-4o', '"Perbaiki tata bahasa paragraf berikut tanpa mengubah makna: [paragraf latar belakang]"', 'Perbaikan susunan kalimat; sekitar 30% kalimat disunting ulang oleh penulis', 'Subbab I.1; dibaca ulang dan disetujui pembimbing'],
    ['2', '02-04-2026', 'GitHub Copilot', '"Buat fungsi Python untuk menghapus stopword bahasa Indonesia dari daftar token"', 'Kerangka fungsi; daftar stopword diganti dengan pustaka Sastrawi', 'Lampiran C; diuji dengan pengujian unit'],
  ], [450, 1000, 1150, 1900, 1800, TEXT_W - 6300], { size: 18 }),
];

const lampI = [
  HL('I', 'Contoh Halaman Pedoman Penggunaan Tesis'),
  c1('PEDOMAN PENGGUNAAN TESIS', bold14, { before: 120, after: 360 }),
  P('Tesis magister yang tidak dipublikasikan terdaftar dan tersedia di Perpustakaan Universitas Langlangbuana, dan terbuka untuk umum dengan ketentuan bahwa hak cipta ada pada penulis dengan mengikuti aturan hak kekayaan intelektual yang berlaku di Universitas Langlangbuana. Referensi kepustakaan diperkenankan dicatat, tetapi pengutipan atau peringkasan hanya dapat dilakukan seizin penulis dan harus disertai kaidah ilmiah untuk menyebutkan sumbernya.'),
  P('Sitasi hasil penelitian tesis ini dapat ditulis dalam bahasa Indonesia sebagai berikut:', { after: 120 }),
  REF('Wiradikarta, S. (2026): *Implementasi deteksi serangan jaringan berbasis pembelajaran mesin pada perangkat Raspberry Pi*, Tesis Program Magister, Universitas Langlangbuana.', { after: 240 }),
  P('dan dalam bahasa Inggris sebagai berikut:', { after: 120 }),
  REF('Wiradikarta, S. (2026): *Implementation of machine learning-based network attack detection on Raspberry Pi devices*, Master\'s Thesis, Universitas Langlangbuana.', { after: 240 }),
  P('Memperbanyak atau menerbitkan sebagian atau seluruh tesis ini harus seizin Direktur Pascasarjana, Universitas Langlangbuana.'),
];

const lampJ = [
  HL('J', 'Contoh Halaman Peruntukan'),
  ...blank(14),
  C('*Dipersembahkan kepada Siti Sundari, Deni, dan Dewi*'),
];

const lampK = [
  HL('K', 'Contoh Halaman Kata Pengantar'),
  c1('KATA PENGANTAR', bold14, { before: 120, after: 360 }),
  P('Penulis sangat berterima kasih kepada Prof. Dr. Ir. Dayang Sumbi dan Dr. Ir. Joko Tarub sebagai pembimbing atas segala saran, bimbingan, dan nasihatnya selama penelitian berlangsung dan selama penulisan tesis ini.'),
  P('Terima kasih disampaikan juga kepada Lembaga Pengelola Dana Pendidikan (LPDP) atas bantuan beasiswa yang diterima penulis selama pendidikan program magister ini, serta kepada PT Mitra Data Nusantara yang telah menyediakan data lalu lintas jaringan untuk penelitian.'),
  C('(dan seterusnya)'),
];

const tocLine = (left, title, page, indent = 0) => new Paragraph({
  spacing: { line: LINE1, after: 60 },
  indent: { left: indent },
  tabStops: [{ type: TabStopType.LEFT, position: 1134 - indent > 0 ? 1134 : indent + 567 }, { type: TabStopType.RIGHT, position: TEXT_W, leader: 'dot' }],
  children: runs(`${left}${left ? '\t' : ''}${title}\t${page}`),
});
const lampL = [
  HL('L', 'Contoh Halaman Daftar Isi'),
  c1('DAFTAR ISI', bold14, { before: 120, after: 360 }),
  ...[['', 'ABSTRAK', 'i'], ['', '*ABSTRACT*', 'iii'], ['', 'HALAMAN PENGESAHAN', 'v'], ['', 'PERNYATAAN KEASLIAN TESIS', 'vi'], ['', 'PERNYATAAN PENGGUNAAN KECERDASAN ARTIFISIAL GENERATIF', 'vii'], ['', 'PEDOMAN PENGGUNAAN TESIS', 'viii'], ['', 'KATA PENGANTAR', 'ix'], ['', 'DAFTAR ISI', 'x'], ['', 'DAFTAR LAMPIRAN', 'xii'], ['', 'DAFTAR GAMBAR DAN ILUSTRASI', 'xiii'], ['', 'DAFTAR TABEL', 'xiv'], ['', 'DAFTAR SINGKATAN DAN LAMBANG', 'xv']].map(([a, b, c]) => tocLine(a, b, c)),
  ...blank(1),
  tocLine('Bab I', 'Pendahuluan', '1'),
  tocLine('I.1', 'Latar Belakang', '1', 1134), tocLine('I.2', 'Masalah Penelitian', '3', 1134), tocLine('I.3', 'Tujuan Penelitian', '4', 1134), tocLine('I.4', 'Lingkup dan Batasan Masalah', '4', 1134), tocLine('I.5', 'Asumsi dan Hipotesis', '5', 1134), tocLine('I.6', 'Metodologi Penelitian', '5', 1134), tocLine('I.7', 'Sistematika Penulisan', '7', 1134),
  tocLine('Bab II', 'Tinjauan Pustaka', '8'),
  tocLine('II.1', 'Sistem Deteksi Intrusi', '8', 1134), tocLine('II.2', 'Pembelajaran Mesin untuk Deteksi Intrusi', '11', 1134), tocLine('II.3', 'Komputasi pada Perangkat Tepi', '15', 1134), tocLine('II.4', 'Penelitian Terkait dan Posisi Penelitian', '18', 1134),
  tocLine('Bab III', 'Metodologi dan Perancangan Sistem', '22'),
  new Paragraph({ indent: { left: 1134 }, spacing: { line: LINE1, after: 60 }, children: runs('......dst.') }),
  tocLine('Bab VI', 'Kesimpulan dan Saran', '70'),
  tocLine('', 'DAFTAR PUSTAKA', '73'),
  tocLine('', 'LAMPIRAN', '79'),
];

const lampM = [
  HL('M', 'Contoh Halaman Daftar Lampiran'),
  c1('DAFTAR LAMPIRAN', bold14, { before: 120, after: 360 }),
  ...[
    ['Lampiran A', 'Spesifikasi Perangkat Keras dan Perangkat Lunak', '81', 0],
    ['Lampiran B', 'Hasil Pengujian Tiap Skenario', '83', 0],
    ['', 'B.1 Skenario Serangan *Denial of Service*', '83', 1],
    ['', 'B.2 Skenario Pemindaian Porta', '86', 1],
    ['Lampiran C', 'Potongan Kode Program Praproses Data', '89', 0],
    ['Lampiran D', 'Log *Prompt* Penggunaan AI Generatif', '92', 0],
  ].map(([a, b, c]) => new Paragraph({
    spacing: { line: LINE1, after: 60 },
    tabStops: [{ type: TabStopType.LEFT, position: 1418 }, { type: TabStopType.RIGHT, position: TEXT_W, leader: 'dot' }],
    children: runs(`${a}\t${b}\t${c}`),
  })),
];

const capLine = (a, b, c) => new Paragraph({
  spacing: { line: LINE1, after: 60 }, indent: { left: 1418, hanging: 1418 },
  tabStops: [{ type: TabStopType.LEFT, position: 1418 }, { type: TabStopType.RIGHT, position: TEXT_W, leader: 'dot' }],
  children: runs(`${a}\t${b}\t${c}`),
});
const lampN = [
  HL('N', 'Contoh Halaman Daftar Gambar dan Ilustrasi'),
  c1('DAFTAR GAMBAR DAN ILUSTRASI', bold14, { before: 120, after: 360 }),
  capLine('Gambar I.1', 'Diagram alir penelitian', '6'),
  capLine('Gambar II.1', 'Taksonomi sistem deteksi intrusi', '9'),
  capLine('Gambar III.1', 'Arsitektur sistem deteksi serangan pada perangkat Raspberry Pi', '24'),
  capLine('Gambar III.2', 'Rancangan alur praproses data lalu lintas jaringan, mulai dari penangkapan paket hingga ekstraksi fitur aliran (diadaptasi dari Sumbi, 2023a)', '27'),
  capLine('Gambar V.1', 'Grafik akurasi model terhadap jumlah *epoch*', '55'),
  new Paragraph({ spacing: { line: LINE1 }, children: runs('......dst.') }),
];
const lampO = [
  HL('O', 'Contoh Halaman Daftar Tabel'),
  c1('DAFTAR TABEL', bold14, { before: 120, after: 360 }),
  capLine('Tabel II.1', 'Perbandingan penelitian terkait', '19'),
  capLine('Tabel III.1', 'Spesifikasi perangkat pengujian', '30'),
  capLine('Tabel V.1', 'Perbandingan kinerja model klasifikasi pada data uji', '57'),
  new Paragraph({ spacing: { line: LINE1 }, children: runs('......dst.') }),
];

const lampP = [
  HL('P', 'Contoh Halaman Daftar Singkatan dan Lambang'),
  c1('DAFTAR SINGKATAN DAN LAMBANG', bold14, { before: 120, after: 360 }),
  table([
    ['SINGKATAN', 'Nama', 'Pemakaian pertama kali pada halaman'],
    ['CNN', '*Convolutional Neural Network*', '12'],
    ['DoS', '*Denial of Service*', '2'],
    ['IDS', '*Intrusion Detection System*', '1'],
    ['LSTM', '*Long Short-Term Memory*', '13'],
    ['**LAMBANG**', '', ''],
    ['*F1*', 'Rerata harmonik presisi dan perolehan', '34'],
    ['*P*', 'Presisi', '34'],
    ['*R*', 'Perolehan (*recall*)', '34'],
    ['*η*', 'Laju pembelajaran', '29'],
    ['*θ*', 'Parameter model', '28'],
  ], [1800, 4100, TEXT_W - 5900], { noBorders: true, noShade: true, size: 22, align: [null, null, AlignmentType.CENTER] }),
];

const lampQ = [
  HL('Q', 'Contoh Halaman Daftar Pustaka'),
  c1('DAFTAR PUSTAKA', bold14, { before: 120, after: 360 }),
  REF('Baker, A. A., Sosro, K., dan Suditomo, B. (1998): Pembakaran hutan di Kalimantan, *Majalah Kehutanan*, **5**, 23–25.'),
  REF('Cotton, F. A. (1998): Kinetics of gasification of brown coal, *Journal of American Chemical Society*, **54**, 38–43.'),
  REF('Hill, R. (1997): *The mathematical theory of plasticity*, Oxford Press, Oxford, 545–547.'),
  REF('Kramer, A., Djubiantono, T., Aziz, F., Bogard, J. S., Weeks, R. A., Weinand, D. C., Hames, W. E., Elam, J. M., Durband, A. C., dan Agus (2005): The first hominid fossil recovered from West Java, Indonesia, *Journal of Human Evolution*, **48**, 661–667.'),
  REF('Kumai, H., Itihara, M., Sudijono, Shibasaki, T., Aziz, F., Yoshikawa, S., Akahane, S., Soeradi, T., Hayashi, T., dan Furuyama, K. (1985): Geology and stratigraphy of the Mojokerto area, 55–61 dalam Watanabe, N. dan Kadar, D., ed., *Quaternary geology of the hominid fossil bearing formations in Java*, Geological Research and Development Centre, Bandung.'),
  REF('Stark, H. (1998): The dynamics of surface adsorption, *Proceedings of the International Congress on Current Aspects of Quantum Chemistry*, London, Carbo, R., ed., Prentice Hall, 24–36.'),
  REF('Sumbi, D. (2023a): Deteksi intrusi ringan pada perangkat tepi, *Jurnal Teknik Informatika Nusantara*, **8**, 101–112. https://doi.org/10.xxxx/jtin.2023.0101.'),
  REF('Sumbi, D. (2023b): Kompresi model pembelajaran mendalam untuk perangkat berdaya rendah, *Prosiding Seminar Nasional Informatika*, Bandung, 45–52.'),
  REF('Wijaya, R. (1996): *Diagnosis penyakit tipus dengan metode PCR*, Disertasi Program Doktor, Institut Teknologi Bandung, 25–29.'),
  new Paragraph({ spacing: { before: 120, after: 120 }, keepNext: true, children: runs('**Daftar Pustaka dari Surat Kabar:**') }),
  REF('Saidi, A. I. (16 Oktober 2015): Semiotika laut, *Kompas*, hal. 6.'),
  new Paragraph({ spacing: { before: 120, after: 120 }, keepNext: true, children: runs('**Daftar Pustaka dari Film atau Televisi:**') }),
  REF('Arlusi, R. dan Ginting, E. (Produser Eksekutif) (21 Oktober 2015): *Mata Najwa* [Siaran Televisi], Metro TV, Jakarta.'),
  REF('Sagantoro, A. (Produser) (2011): *The Raid* [Gambar Hidup], PT Merantau Films dan XYZ Films, Jakarta.'),
  new Paragraph({ spacing: { before: 120, after: 120 }, keepNext: true, children: runs('**Daftar Pustaka dari Situs Internet:**') }),
  REF('Badan Siber dan Sandi Negara (2025): Lanskap keamanan siber Indonesia 2024, https://www.bssn.go.id/. Diakses 5 Mei 2026.'),
  REF('Data Indeks DM periode 1901–2000 hasil reanalisis dari Japan Agency for Marine-Earth Science and Technology (JAMSTEC), http://www.jamstec.go.jp/frcgc/research/d1/iod/kaplan_sst_dmi_new.txt. Diakses 28 Oktober 2013.'),
  note('Catatan: (1) daftar ini menunjukkan cara penulisan artikel jurnal, buku, bab dalam buku yang disunting, prosiding, artikel dengan DOI, dua karya penulis yang sama pada tahun yang sama (2023a dan 2023b), disertasi, surat kabar, siaran televisi, film, dan situs internet; (2) nama Sumbi, D. dan jurnal pada contoh adalah fiktif; (3) kriteria pustaka yang layak dirujuk mengikuti kelaziman bidang teknik informatika.'),
];

const lampR = [
  HL('R', 'Contoh Grafik'),
  P('Grafik pada Gambar V.1 memperlihatkan kenaikan akurasi model pada data latih dan data validasi seiring bertambahnya jumlah *epoch*.'),
  img('grafik.png', 480, 304),
  caption('Gambar V.1 Grafik akurasi model terhadap jumlah *epoch*'),
  note('Catatan: judul gambar satu baris diletakkan rata tengah di bawah gambar. Data pada contoh ini fiktif.'),
];
const lampS = [
  HL('S', 'Contoh Gambar (Diagram Alir Penelitian)'),
  P('Tahapan penelitian ditunjukkan pada Gambar I.1.'),
  img('alir.png', 260, 396),
  caption('Gambar I.1\tDiagram alir penelitian yang dimulai dari identifikasi masalah hingga penarikan kesimpulan (diadaptasi dari Sumbi, 2023a)*', { long: true, hang: 1134 }),
  note('Catatan (tanda bintang pada judul gambar): gambar yang dikutip atau diadaptasi dari sumber lain wajib mencantumkan nama penulis dan tahun di akhir judul gambar. Judul gambar lebih dari satu baris ditulis rata kiri-kanan dengan indentasi gantung.'),
];

const perfRows = [
  ['Model', 'Akurasi (%)', 'Presisi (%)', 'Perolehan (%)', 'F1 (%)', 'Waktu inferensi (ms)'],
  ['*Decision Tree*ᵃ', '94,12', '93,80', '92,45', '93,12', '0,8'],
  ['*Random Forest*ᵃ', '97,35', '97,10', '96,52', '96,81', '3,4'],
  ['*Support Vector Machine*ᵇ', '95,48', '95,02', '94,11', '94,56', '5,9'],
  ['CNN 1-D (usulan)', '98,21', '98,05', '97,66', '97,85', '7,2'],
];
const lampT = [
  HL('T', 'Contoh Penulisan Tabel'),
  P('Perbandingan kinerja model disajikan pada Tabel V.5.'),
  caption('Tabel V.5\tPerbandingan kinerja model klasifikasi pada data uji (Sumbi, 2023a, 2023b)*', { long: true, hang: 1134, before: 0, after: 120, keepNext: true }),
  table(perfRows, [2300, 1100, 1100, 1150, 900, TEXT_W - 6550], { size: 20, align: [null, AlignmentType.CENTER, AlignmentType.CENTER, AlignmentType.CENTER, AlignmentType.CENTER, AlignmentType.CENTER] }),
  new Paragraph({ spacing: { before: 60, line: LINE1 }, children: runs('ᵃ Sumbi (2023a).', { size: 20 }) }),
  new Paragraph({ spacing: { line: LINE1, after: 240 }, children: runs('ᵇ Sumbi (2023b).', { size: 20 }) }),
  new Paragraph({ spacing: { after: 120 }, children: runs('**Contoh tabel yang berlanjut ke halaman berikutnya**') }),
  P('Pada halaman lanjutan, baris judul kolom diulang dan di atas tabel ditulis nomor tabel diikuti kata "(lanjutan)":', { after: 120 }),
  caption('Tabel V.5 (lanjutan)', { long: false, before: 0, after: 120, keepNext: true }),
  table([perfRows[0], ['*Long Short-Term Memory*', '97,90', '97,64', '97,02', '97,33', '11,5'], ['*Gradient Boosting*', '96,88', '96,40', '96,01', '96,20', '4,1']], [2300, 1100, 1100, 1150, 900, TEXT_W - 6550], { size: 20, align: [null, AlignmentType.CENTER, AlignmentType.CENTER, AlignmentType.CENTER, AlignmentType.CENTER, AlignmentType.CENTER] }),
  note('Catatan (tanda bintang pada judul tabel): apabila tabel dikutip dari makalah atau buku, cantumkan nama penulis dan tahun, atau nama instansi dan sumber lainnya, di akhir judul tabel. Data dan nama pada contoh ini fiktif. Pada Word, aktifkan pilihan "Repeat as header row at the top of each page" pada baris judul kolom.'),
];

// ---------- Assemble ----------
const footer = new Footer({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ children: [PageNumber.CURRENT], font: FONT, size: 24 })] })] });
const pageProps = (fmt, start) => ({
  page: {
    size: { width: 11906, height: 16838 },
    margin: { top: CM(3), bottom: CM(3), left: CM(4), right: CM(3), footer: CM(1.5), header: CM(1.5) },
    pageNumbers: { start, formatType: fmt },
  },
});

const numberingLevels = (fmtA, fmtB) => [
  { level: 0, format: fmtA[0], text: fmtA[1], alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 567, hanging: 425 } }, run: { font: FONT } } },
  { level: 1, format: fmtB[0], text: fmtB[1], alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 1134, hanging: 425 } }, run: { font: FONT } } },
];

const doc = new Document({
  creator: 'Tim Satuan Tugas MTI Pascasarjana UnLa',
  title: 'Pedoman Penulisan Tesis Magister MTI UnLa Edisi Revisi 2026',
  description: 'Pedoman penulisan tesis Program Studi Magister Teknik Informatika, Universitas Langlangbuana',
  features: { updateFields: true },
  styles: {
    default: { document: { run: { font: FONT, size: 24 }, paragraph: { spacing: { line: LINE15 } } } },
    paragraphStyles: [
      { id: 'HeadingBab', name: 'Heading Bab', basedOn: 'Normal', next: 'Normal', quickFormat: true, run: { font: FONT, size: 28, bold: true }, paragraph: { alignment: AlignmentType.CENTER, spacing: { before: 0, after: 360, line: LINE15 }, keepNext: true, keepLines: true, outlineLevel: 0 } },
      { id: 'HeadingSubbab', name: 'Heading Subbab', basedOn: 'Normal', next: 'Normal', quickFormat: true, run: { font: FONT, size: 24, bold: true }, paragraph: { alignment: AlignmentType.LEFT, spacing: { before: 0, after: 0, line: LINE15 }, keepNext: true, keepLines: true, outlineLevel: 1 } },
      { id: 'HeadingAnakSubbab', name: 'Heading Anak Subbab', basedOn: 'Normal', next: 'Normal', quickFormat: true, run: { font: FONT, size: 24, bold: true }, paragraph: { alignment: AlignmentType.LEFT, spacing: { before: 0, after: 0, line: LINE15 }, keepNext: true, keepLines: true, outlineLevel: 2 } },
      { id: 'JudulBagian', name: 'Judul Bagian', basedOn: 'Normal', next: 'Normal', quickFormat: true, run: { font: FONT, size: 28, bold: true }, paragraph: { alignment: AlignmentType.CENTER, spacing: { before: 0, after: 360, line: LINE15 }, keepNext: true, outlineLevel: 0 } },
      { id: 'JudulLampiran', name: 'JudulLampiran', basedOn: 'Normal', next: 'Normal', quickFormat: true, run: { font: FONT, size: 24, bold: true }, paragraph: { spacing: { before: 0, after: 240, line: LINE1 }, keepNext: true } },
      { id: 'TOC1', name: 'toc 1', basedOn: 'Normal', next: 'Normal', run: { font: FONT, size: 24 }, paragraph: { spacing: { before: 120, after: 40, line: LINE1 } } },
      { id: 'TOC2', name: 'toc 2', basedOn: 'Normal', next: 'Normal', run: { font: FONT, size: 24 }, paragraph: { spacing: { before: 0, after: 40, line: LINE1 }, indent: { left: 1134 } } },
      { id: 'TOC3', name: 'toc 3', basedOn: 'Normal', next: 'Normal', run: { font: FONT, size: 24 }, paragraph: { spacing: { before: 0, after: 40, line: LINE1 }, indent: { left: 1985 } } },
      { id: 'JudulTanpaToc', name: 'Judul Tanpa Daftar Isi', basedOn: 'Normal', next: 'Normal', run: { font: FONT, size: 28, bold: true }, paragraph: { alignment: AlignmentType.CENTER, spacing: { before: 0, after: 360 }, keepNext: true } },
    ],
  },
  numbering: {
    config: [
      { reference: 'judulbab', levels: [
        { level: 0, format: LevelFormat.UPPER_ROMAN, text: 'Bab %1', alignment: AlignmentType.LEFT, suffix: LevelSuffix.SPACE, style: { paragraph: { indent: { left: 0, hanging: 0 } } } },
        { level: 1, format: LevelFormat.DECIMAL, text: '%1.%2', alignment: AlignmentType.LEFT, suffix: LevelSuffix.TAB, style: { paragraph: { indent: { left: 851, hanging: 851 }, tabStops: [{ type: TabStopType.LEFT, position: 851 }] } } },
        { level: 2, format: LevelFormat.DECIMAL, text: '%1.%2.%3', alignment: AlignmentType.LEFT, suffix: LevelSuffix.TAB, style: { paragraph: { indent: { left: 1134, hanging: 1134 }, tabStops: [{ type: TabStopType.LEFT, position: 1134 }] } } },
      ] },
      { reference: 'angka', levels: numberingLevels([LevelFormat.DECIMAL, '%1.'], [LevelFormat.LOWER_LETTER, '%2.']) },
      { reference: 'huruf', levels: numberingLevels([LevelFormat.LOWER_LETTER, '%1.'], [LevelFormat.DECIMAL, '%2)']) },
      { reference: 'butir', levels: numberingLevels([LevelFormat.BULLET, '•'], [LevelFormat.BULLET, '–']) },
    ],
  },
  sections: [
    { properties: { ...pageProps(NumberFormat.LOWER_ROMAN, 1), titlePage: true }, children: cover },
    { properties: { ...pageProps(NumberFormat.LOWER_ROMAN, 1), type: SectionType.NEXT_PAGE }, footers: { default: footer }, children: [...kataPengantar, ...daftarIsi, ...daftarLampiran, ...daftarTabel] },
    { properties: { ...pageProps(NumberFormat.DECIMAL, 1), type: SectionType.NEXT_PAGE }, footers: { default: footer }, children: [
      ...B.bab1.map((x, i) => i === 0 ? x : x),
      ...B.bab2, ...B.bab3, ...B.bab4, ...B.bab5, ...B.bab6, ...B.bab7, ...B.bab8,
      ...pustaka, ...lampiranCover,
      ...lampA, ...lampB, ...lampC, ...lampD, ...lampE, ...lampF, ...lampG, ...lampH, ...lampI, ...lampJ, ...lampK, ...lampL, ...lampM, ...lampN, ...lampO, ...lampP, ...lampQ, ...lampR, ...lampS, ...lampT,
    ] },
  ],
});

Packer.toBuffer(doc).then((buf) => { fs.writeFileSync(process.argv[2] || 'out.docx', buf); console.log('written'); });
