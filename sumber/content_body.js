const L = require('./lib');
const { P, C, H1, H2, H3, list, REF, table, caption, img, note, boxNote, blank, D, TEXT_W } = L;
const CODE = (lines) => lines.map((t, i) => new D.Paragraph({ shading: { fill: 'F2F2F2', type: D.ShadingType.CLEAR, color: 'auto' }, indent: { left: 284 }, spacing: { line: 240, before: 0, after: i === lines.length - 1 ? 240 : 0 }, children: [new D.TextRun({ text: t, font: 'Courier New', size: 18 })] }));
const { AlignmentType, Paragraph, TextRun, TabStopType, Math: M, MathRun, MathFraction } = D;

const PANDUAN = '*Panduan Penggunaan AI Pascasarjana UNLA*';

const bab1 = [
  H1('Bab I', 'Pendahuluan', { noBreak: true }),
  P('Buku Pedoman Penulisan Tesis Magister Edisi Revisi 2026, untuk seterusnya disebut buku pedoman, disusun untuk memudahkan mahasiswa Program Studi Magister Teknik Informatika (MTI) menulis tesis. Buku pedoman ini mengatur cara dan format penulisan tesis magister dan berlaku di Program Studi Magister Teknik Informatika, Pascasarjana Universitas Langlangbuana. Apabila mahasiswa ingin menerbitkan tesis atau sebagian tesisnya dalam jurnal atau prosiding ilmiah, pedoman dan ketentuan jurnal atau prosiding tersebutlah yang diikuti.'),

  H2('I.1', 'Latar Belakang Pembaruan'),
  P('Pedoman edisi Juni 2021 telah menjadi acuan penulisan tesis MTI selama lima tahun. Dalam kurun waktu tersebut terjadi beberapa perubahan yang perlu diakomodasi, yaitu:'),
  ...list([
    'berlakunya Ejaan Bahasa Indonesia Edisi V (EYD Edisi V) sejak tahun 2022 menggantikan Pedoman Umum Ejaan Bahasa Indonesia yang Disempurnakan;',
    'meluasnya pemakaian alat kecerdasan artifisial (*artificial intelligence*, AI), khususnya AI generatif, dalam penelusuran pustaka, penulisan, penerjemahan, dan pemrograman, sehingga diperlukan aturan pengungkapan yang jelas demi menjaga integritas akademik;',
    'kebutuhan akan ketentuan format yang lebih rinci dan terukur, termasuk templat pengolah kata yang sudah memuat *style* dan gaya sitasi yang dapat dipakai oleh perangkat lunak pengelola referensi;',
    'kebutuhan agar isi Bab Pendahuluan dan Tinjauan Pustaka lebih tegas menunjukkan tujuan, lingkup, kebaruan, dan posisi penelitian terhadap penelitian sejenis (*state of the art*).',
  ], 'alpha'),
  P('Sebagian pembaruan tersebut diadaptasi dari *Petunjuk Teknis Penulisan Tesis Magister* Sekolah Pascasarjana ITB (2017), yang juga menjadi salah satu rujukan pedoman edisi 2021, dengan tetap mempertahankan ketentuan khas Program Studi MTI UnLa.'),

  H2('I.2', 'Ruang Lingkup dan Keberlakuan'),
  P('Buku pedoman ini tidak mengatur batas jumlah halaman tesis. Mahasiswa sangat dianjurkan menulis tesis secara efisien, tidak bertele-tele, serta fokus pada permasalahan, analisis, dan kesimpulan sehingga menghasilkan tesis yang komprehensif tanpa harus tebal. Ketentuan dalam buku pedoman ini, beserta semua format yang terkandung di dalamnya, wajib diikuti dalam penulisan tesis di Program Studi Magister Teknik Informatika, Universitas Langlangbuana.'),
  P(`Buku pedoman ini berlaku bagi tesis yang diajukan untuk sidang sejak tanggal ditetapkan. Mahasiswa yang naskahnya telah disetujui pembimbing berdasarkan pedoman edisi 2021 sebelum tanggal tersebut dapat menyelesaikan naskahnya dengan pedoman edisi 2021, kecuali ketentuan pengungkapan penggunaan AI (Subbab VIII.10), yang keberlakuannya mengikuti ketentuan peralihan dalam ${PANDUAN}.`),
  P(`Hal-hal yang berkaitan dengan penggunaan AI diatur lebih rinci dalam ${PANDUAN}. Apabila terdapat perbedaan antara buku pedoman ini dan panduan tersebut mengenai penggunaan AI, yang berlaku adalah ${PANDUAN}.`),

  H2('I.3', 'Perangkat Pendukung'),
  P('Untuk memudahkan penerapan ketentuan format, Program Studi MTI menyediakan perangkat pendukung berikut:'),
  ...list([
    '**Templat tesis Microsoft Word** (word/Templat-Tesis-MTI-UnLa.dotx) yang telah memuat *style* judul (Heading Bab, Heading Subbab, Heading Anak Subbab), naskah, judul gambar dan tabel, daftar pustaka, pengaturan batas tepi dan nomor halaman, serta pengaturan bahasa Indonesia dan pemenggalan kata sesuai buku pedoman ini;',
    '**Templat tesis LaTeX** (latex/mti-unla.cls dengan contoh naskah tesis.tex, serta templat-latex-overleaf.zip untuk Overleaf) dengan ketentuan format yang sama, termasuk pola pemenggalan kata bahasa Indonesia;',
    '**Kamus dan alat pemeriksa bahasa Indonesia**, yaitu kamus pengguna istilah teknik informatika untuk Word (kamus/kamus-mti.dic), ekstensi LibreOffice berisi pola pemenggalan, kamus ejaan Indonesia, dan kamus istilah (libreoffice/pemenggalan-ejaan-id-mti.oxt), serta alat penyisip tanda pemenggal untuk naskah Word (pemenggal/pemenggal-id.html, berjalan luring di peramban);',
    '**Berkas gaya sitasi** (*Citation Style Language*, CSL) MTI UnLa (zotero/mti-unla.csl) untuk Zotero atau Mendeley sehingga penulisan rujukan dalam teks dan daftar pustaka otomatis mengikuti Bab VI;',
    '**Formulir Pernyataan Penggunaan AI** sesuai contoh pada Lampiran H.',
  ]),
  P('Perangkat tersebut tersedia dalam **paket proofing MTI** (paket-proofing-id) yang dapat diperoleh dari Program Studi MTI. Nama berkas di atas mengikuti susunan folder dalam paket, dan petunjuk pemasangannya terdapat pada berkas README.md. Penggunaan templat, berkas CSL, dan kamus pengguna sangat dianjurkan. Apabila terdapat perbedaan antara templat dan buku pedoman ini, yang berlaku adalah buku pedoman ini.'),

  H2('I.4', 'Masukan'),
  P('Buku pedoman ini disusun agar mencakup semua segi yang berkaitan dengan penulisan tesis, meskipun disadari masih terdapat kekurangan. Saran perbaikan dapat disampaikan kepada Tim Satuan Tugas Penyusun Pedoman Tesis Magister Teknik Informatika, Pascasarjana UnLa.'),
];

const bab2 = [
  H1('Bab II', 'Bagian-Bagian Tesis'),
  P('Bab ini menguraikan bagian-bagian yang menyusun naskah tesis dan urutannya. Ketentuan format setiap bagian diuraikan pada bab-bab berikutnya.'),
  H2('II.1', 'Susunan Naskah Tesis'),
  P('Naskah tesis dibagi menjadi lima bagian, yaitu:'),
  ...list(['abstrak (dalam bahasa Indonesia dan bahasa Inggris);', 'bagian persiapan;', 'tubuh utama tesis;', 'daftar pustaka;', 'lampiran.']),

  H2('II.2', 'Abstrak'),
  P('Abstrak tesis memuat secara komprehensif permasalahan ilmiah yang diteliti, yang mencakup latar belakang, permasalahan yang dikaji, tujuan, pendekatan dan metode yang digunakan, tahapan penelitian, hasil, serta kesimpulan yang diperoleh. Selain itu, abstrak harus:'),
  ...list([
    'menyebutkan kajian, analisis, atau pembuktian hipotesis, termasuk perbandingan hasil penelitian dengan penelitian sejenis;',
    'menyatakan dengan jelas kebaruan (*novelty*) dan orisinalitas penelitian;',
    'menyatakan sumbangan (kontribusi) hasil penelitian terhadap khazanah ilmu pengetahuan dan/atau praktik di bidang teknik informatika.',
  ], 'alpha'),
  P('Abstrak ditulis dalam bahasa Indonesia dan bahasa Inggris, masing-masing dimulai pada halaman baru dan terdiri atas 500–800 kata. Abstrak tidak boleh memuat rujukan pustaka, singkatan yang tidak dijelaskan, maupun gambar dan tabel.'),
  P('Abstrak dicetak dengan jarak satu spasi dan batas tepi yang sama dengan tubuh utama tesis. Halaman abstrak diberi judul ABSTRAK yang terletak 3 cm dari tepi atas kertas. Halaman ini juga memuat judul tesis, kata "Oleh", nama lengkap mahasiswa, NPM, dan nama program studi. Kalimat pertama abstrak berjarak tiga spasi dari baris nama program studi.'),
  P('Kata ABSTRAK, judul tesis, nama mahasiswa, NPM, dan nama program studi dicetak dengan huruf berukuran 14 dan tebal, sedangkan bagian lain dicetak dengan ukuran 12 dan tidak tebal. Antarparagraf dalam abstrak dipisahkan oleh satu baris kosong. Abstrak diakhiri dengan kata kunci (*keywords*) yang terletak satu spasi di bawah paragraf terakhir, berjumlah paling banyak tujuh kata atau kelompok kata, dan tidak berupa kalimat. Format halaman abstrak dapat dilihat pada Lampiran B.'),

  H2('II.3', 'Abstract'),
  P('*Abstract* adalah terjemahan bahasa Inggris dari abstrak pada Subbab II.2. Judul tesis dalam bahasa Inggris dan seluruh isi *abstract* dicetak miring (*italic*), dan nama program studi ditulis dalam bahasa Inggris (*Master\'s Program in Informatics Engineering*). Terjemahan dengan bantuan alat AI atau mesin penerjemah harus diperiksa kembali oleh mahasiswa dan diungkapkan sesuai Subbab VIII.10.'),

  H2('II.4', 'Bagian Persiapan Tesis'),
  P('Bagian persiapan tesis terdiri atas halaman-halaman berikut, dengan urutan sebagai berikut:'),
  ...list([
    'sampul;',
    'halaman judul (sampul dalam);',
    'abstrak dan *abstract*;',
    'halaman pengesahan;',
    'halaman pernyataan keaslian tesis;',
    'halaman pernyataan penggunaan kecerdasan artifisial (AI) generatif;',
    'halaman pedoman penggunaan tesis;',
    'halaman peruntukan (jika ada);',
    'halaman kata pengantar;',
    'halaman daftar isi;',
    'halaman daftar lampiran (jika terdapat lampiran);',
    'halaman daftar gambar dan ilustrasi (jika terdapat gambar atau ilustrasi);',
    'halaman daftar tabel (jika terdapat tabel);',
    'halaman daftar singkatan dan lambang (jika terdapat singkatan atau lambang).',
  ]),

  H2('II.5', 'Tubuh Utama Tesis'),
  P('Tubuh utama tesis terdiri atas:'),
  ...list(['Bab Pendahuluan, yang merupakan bab pertama;', 'Bab Tinjauan Pustaka;', 'bab-bab isi utama tesis (metodologi, perancangan, implementasi, hasil, dan pembahasan sesuai keperluan);', 'Bab Kesimpulan dan Saran, yang merupakan bab terakhir.']),
  P('Uraian rinci tentang isi tubuh utama tesis terdapat pada Bab V.'),

  H2('II.6', 'Daftar Pustaka'),
  P('Daftar pustaka memuat semua rujukan yang dikutip dalam naskah tesis. Ketentuannya diuraikan pada Bab VI.'),

  H2('II.7', 'Lampiran'),
  P('Lampiran dapat terdiri atas beberapa buah. Lampiran memuat keterangan tambahan, penurunan rumus, contoh perhitungan, data mentah penelitian, kode program yang relevan, instrumen penelitian, log interaksi dengan alat AI (jika ada), dan sebagainya, yang apabila dimasukkan ke dalam tubuh tesis akan mengganggu kelancaran uraian. Setiap lampiran diberi kode berupa huruf kapital abjad Latin A, B, C, dan seterusnya.'),
  P('Lampiran didahului oleh satu halaman yang hanya memuat kata LAMPIRAN (ukuran 14, cetak tebal) di tengah halaman dan diberi nomor halaman. Setiap lampiran **wajib dirujuk** di dalam teks tubuh utama tesis dengan format "Lampiran A", "Lampiran B", dan seterusnya. Lampiran yang tidak pernah dirujuk dalam teks sebaiknya ditiadakan.'),
  P(`Apabila mahasiswa menggunakan AI generatif kategori B atau C menurut ${PANDUAN}, **log** ***prompt*** yang memuat *prompt* kunci dan keluaran yang dipakai diletakkan sebagai **lampiran terakhir** tesis (Subbab VIII.10).`),
];

const specRows = [
  ['Unsur', 'Ketentuan'],
  ['Kertas', 'A4 (210 mm × 297 mm), HVS 80 gsm'],
  ['Batas tepi', 'Kiri 4 cm; atas, kanan, bawah 3 cm (cetak satu sisi). Cetak bolak-balik: *mirror margins*, tepi dalam 4 cm dan tepi luar 3 cm'],
  ['Huruf naskah', 'Times New Roman 12, rata kiri-kanan (*justify*) dengan pemenggalan kata otomatis (*hyphenation*)'],
  ['Bahasa dan pemenggalan', 'Bahasa dokumen Indonesia (id-ID); kata dipenggal sesuai kaidah EYD Edisi V (otomatis di LaTeX dan LibreOffice, dengan tanda pemenggal opsional di Word); paling banyak dua baris berturut-turut berakhir dengan tanda hubung; judul tidak dipenggal (Subbab III.8)'],
  ['Spasi naskah', '1,5 spasi; *spacing before* 0 pt dan *after* 0 pt; antarparagraf satu baris kosong (atau *after* 18 pt pada templat)'],
  ['Indentasi paragraf', 'Tanpa indentasi; baris pertama paragraf dimulai dari batas tepi kiri'],
  ['Judul bab', 'Times New Roman 14, tebal, rata tengah, 1,5 spasi, 3 cm dari tepi atas; format "Bab I Pendahuluan" (style Heading Bab)'],
  ['Judul anak bab', 'Times New Roman 12, tebal, rata kiri; nomor pada batas tepi kiri diikuti tab (mis. "I.1<tab>Latar Belakang"; style Heading Subbab)'],
  ['Judul anak pada anak bab', 'Times New Roman 12, tebal, rata kiri; nomor tiga tingkat (mis. "IV.1.1"; style Heading Anak Subbab)'],
  ['Judul gambar dan tabel', 'Times New Roman 12, 1 spasi; satu baris rata tengah, lebih dari satu baris rata kiri-kanan dengan indentasi gantung'],
  ['Isi tabel', 'Times New Roman 10–12, 1 spasi'],
  ['Daftar pustaka', 'Times New Roman 12, 1 spasi, indentasi gantung 1,27 cm, satu baris kosong antarpustaka'],
  ['Nomor halaman', 'Times New Roman 12, rata tengah, 1,5 cm dari tepi bawah; Romawi kecil untuk bagian persiapan, Arab untuk tubuh utama dan lampiran'],
  ['Halaman judul, abstrak, pengesahan', 'Judul halaman ukuran 14 tebal; isi 1 spasi, *before* 0 pt, *after* 0 pt (lihat Lampiran A, B, dan F)'],
];

const bab3 = [
  H1('Bab III', 'Teknik Pembuatan dan Penulisan Tesis'),
  P('Bab ini mengatur bahasa, kaidah penulisan, format halaman, pencetakan, dan penjilidan naskah tesis.'),
  H2('III.1', 'Pemakaian Bahasa Indonesia Baku'),
  P('Bahasa Indonesia yang digunakan dalam naskah tesis harus bahasa Indonesia baku dengan tingkat keresmian yang tinggi dan menaati kaidah tata bahasa resmi. Kalimat harus utuh dan lengkap. Gunakan tanda baca seperlunya dan secukupnya agar anak kalimat dapat dibedakan dari induk kalimatnya, keterangan dapat dibedakan dari yang diterangkan, dan sebagainya.'),
  P('Acuan kebahasaan yang digunakan adalah *Ejaan Bahasa Indonesia yang Disempurnakan Edisi Kelima* (EYD Edisi V), *Pedoman Umum Pembentukan Istilah*, dan *Kamus Besar Bahasa Indonesia* (KBBI) edisi terbaru, yang diterbitkan oleh Badan Pengembangan dan Pembinaan Bahasa, Kementerian Pendidikan, Kebudayaan, Riset, dan Teknologi. EYD Edisi V dan KBBI dapat diakses secara daring melalui laman resmi Badan Bahasa. Selain itu, dapat digunakan pula kamus atau glosarium istilah teknik informatika yang lazim.'),

  H2('III.2', 'Kaidah Penulisan Tesis'),
  P('Naskah tesis dibuat dengan pengolah kata (*word processor*) dan dicetak dengan tinta hitam menggunakan huruf Times New Roman ukuran 12. Ringkasan spesifikasi format disajikan pada Tabel III.1, sedangkan uraiannya adalah sebagai berikut:'),
  ...list([
    'Naskah tesis ditulis pada dua muka halaman kertas (bolak-balik) dengan fasilitas *mirror margins* pada pengolah kata. Batas halaman ganjil adalah tepi kiri 4 cm serta tepi atas, kanan, dan bawah masing-masing 3 cm, sedangkan batas halaman genap adalah tepi kanan 4 cm serta tepi atas, kiri, dan bawah masing-masing 3 cm (Lampiran C dan D).',
    'Naskah yang sebelum dijilid tebalnya kurang dari 1,5 cm (kurang dari ±115 lembar) boleh dicetak pada satu muka halaman dengan batas tepi kiri 4 cm serta tepi atas, kanan, dan bawah masing-masing 3 cm.',
    'Baris naskah berjarak 1,5 spasi dengan *spacing before* 0 pt dan *spacing after* 0 pt.',
    'Naskah ditulis rata kiri-kanan (*justify*) dengan **pemenggalan kata** (*hyphenation*) bahasa Indonesia agar tidak terbentuk celah lebar antarkata. Pemenggalan mengikuti kaidah EYD Edisi V. Judul bab, judul anak bab, nama orang, alamat situs, dan kode program tidak dipenggal. Cara pengaturannya dijelaskan pada Subbab III.8.',
    'Jarak satu spasi digunakan pada kutipan langsung yang lebih dari empat baris (ditulis menjorok ke dalam), catatan kaki, judul dan isi gambar, judul dan isi tabel, serta daftar pustaka.',
    'Paragraf ditulis tanpa indentasi. Baris pertama paragraf baru dipisahkan oleh satu baris kosong (1,5 spasi, ukuran huruf 12) dari baris terakhir paragraf sebelumnya. Pada templat, pemisahan ini diwujudkan dengan *spacing after* 18 pt.',
    'Paragraf baru tidak dimulai pada dasar halaman kecuali tersedia tempat untuk sedikitnya dua baris, dan baris terakhir paragraf tidak diletakkan sendirian pada halaman berikutnya (gunakan fasilitas *widow/orphan control*).',
    'Satu spasi disisipkan sesudah tanda koma (,), titik koma (;), titik dua (:), dan titik (.), dan tidak ada spasi di antara huruf terakhir kata dan tanda baca tersebut.',
    'Setiap bab dimulai pada halaman baru.',
  ]),
  caption('Tabel III.1 Ringkasan spesifikasi format naskah tesis', { before: 240, after: 120, keepNext: true }),
  table(specRows, [2300, TEXT_W - 2300], { size: 20 }),
  ...blank(1, 360),
  P('Penulisan tesis juga harus mengikuti kaidah berikut:'),
  ...list([
    'Bahasa dan istilah yang digunakan baku, singkat, dan jelas sesuai EYD Edisi V.',
    'Penulisan istilah, rumus, notasi, dan simbol mengikuti kelaziman disiplin ilmu yang bersangkutan.',
    'Kata ganti orang pertama (saya, aku, kami, kita) tidak digunakan, kecuali dalam kutipan. Susunlah kalimat sedemikian rupa sehingga tidak memerlukan kata ganti orang; bila perlu, gunakan kata "penulis".',
    'Pemenggalan kata mengikuti kaidah EYD Edisi V. Kata terakhir pada dasar halaman tidak boleh dipenggal. Pemenggalan kata asing mengikuti kamus bahasa asing tersebut.',
    'Penulisan "di" dan "ke" sebagai awalan (ditulis serangkai) dibedakan dari "di" dan "ke" sebagai kata depan (ditulis terpisah).',
    'Frasa "di mana" dan "yang mana" tidak digunakan sebagai kata penghubung (terjemahan *where* atau *which*); gunakan "tempat", "yang", atau susun ulang kalimatnya.',
    'Kata penghubung antarklausa seperti "maka", "sedangkan", "sehingga", dan "dan" tidak digunakan pada awal kalimat.',
    'Rumus, lambang, dan angka tidak ditempatkan pada awal kalimat.',
    'Penggunaan kata atau istilah asing dihindari bila padanannya dalam bahasa Indonesia sudah lazim. Istilah asing yang terpaksa digunakan ditulis miring (*italic*) secara konsisten. Nama produk, bahasa pemrograman, dan merek (mis. Python, TensorFlow, MySQL) ditulis tegak.',
    'Satu paragraf memuat satu gagasan pokok yang tersusun atas beberapa kalimat; hindari paragraf yang hanya terdiri atas satu kalimat.',
  ]),
  P('Naskah tesis final yang telah disetujui wajib ditandatangani oleh seluruh anggota tim pembimbing. Naskah tersebut kemudian dicetak sesuai kebutuhan, antara lain untuk pembimbing, penguji, program studi, dan Pascasarjana, serta diserahkan dalam bentuk berkas digital (PDF) sesuai ketentuan program studi dan perpustakaan.'),

  H2('III.3', 'Penomoran Halaman'),
  P('Halaman abstrak dan bagian persiapan tesis diberi nomor terpisah dari tubuh utama tesis, berupa angka Romawi kecil (i, ii, iii, iv, dan seterusnya). Halaman tubuh utama tesis diberi angka Arab (1, 2, 3, dan seterusnya). Nomor halaman ditulis di tengah bawah, 1,5 cm dari tepi bawah kertas, dengan huruf Times New Roman ukuran 12. Nomor halaman lampiran melanjutkan nomor halaman tubuh utama tesis. Halaman sampul dan halaman judul tidak diberi nomor, tetapi tetap dihitung.'),

  H2('III.4', 'Pencetakan'),
  P('Tesis dicetak pada kertas HVS A4 (210 mm × 297 mm) dengan berat 80 g/m² (HVS 80 gsm) mengikuti batas tepi pada Subbab III.2. Gambar berwarna boleh dicetak berwarna. Berkas digital (PDF) tesis harus identik dengan naskah cetak yang telah ditandatangani.'),

  H2('III.5', 'Penjilidan'),
  P('Naskah tesis final yang tidak lagi mengandung kesalahan, serta telah disetujui dan ditandatangani oleh tim pembimbing, dijilid dengan sampul keras (*hard cover*) berwarna biru gelap (biru dongker), kertas Omega No. 10, dan tulisan pada sampul dicetak dengan tinta berwarna emas. Contoh sampul dan penjilidan terdapat pada Lampiran E.'),

  H2('III.6', 'Perbaikan Kesalahan'),
  P('Perbaikan naskah tesis dilakukan sebelum naskah disahkan dan ditandatangani oleh tim pembimbing. Naskah final yang telah disahkan tidak boleh lagi mengandung kesalahan ataupun bekas perbaikan.'),

  H2('III.7', 'Penggunaan Templat dan Pengelola Referensi'),
  P('Mahasiswa dianjurkan menulis tesis langsung pada templat program studi (Subbab I.3) dan menggunakan *style* yang tersedia, bukan memformat setiap paragraf secara manual. Daftar isi, daftar lampiran, daftar gambar, dan daftar tabel dibangkitkan otomatis dari *style* tersebut. Judul gambar dan tabel sebaiknya dibuat dengan fasilitas *caption*, dan rujukan silang ke gambar, tabel, dan rumus dibuat dengan fasilitas *cross-reference* agar penomorannya selalu tepat.'),
  P('Style judul yang digunakan adalah **Heading Bab** untuk judul bab (bernomor otomatis "Bab I", "Bab II", dan seterusnya), **Heading Subbab** untuk judul anak bab ("I.1"), dan **Heading Anak Subbab** untuk judul anak pada anak bab ("I.1.1"). Judul tanpa nomor, seperti ABSTRAK, KATA PENGANTAR, DAFTAR ISI, DAFTAR PUSTAKA, dan LAMPIRAN, menggunakan style **Judul Bagian**. Nomor bab dan anak bab tidak diketik manual, tetapi dibangkitkan oleh style tersebut.'),
  P('Rujukan pustaka dikelola dengan perangkat lunak pengelola referensi (mis. Zotero atau Mendeley) yang menggunakan berkas CSL MTI UnLa. Hasil keluaran otomatis tetap wajib diperiksa kesesuaiannya dengan Bab VI.'),
  H2('III.8', 'Pengaturan Bahasa, Perataan, dan Pemenggalan Kata'),
  P('Pengaturan berikut sudah tersedia pada templat program studi. Mahasiswa yang tidak memakai templat, atau yang menyalin teks dari dokumen lain, wajib memastikan pengaturan ini berlaku pada seluruh naskah.'),
  H3('III.8.1', 'Microsoft Word'),
  P('Langkah berikut berlaku untuk Microsoft Word for Windows (Microsoft 365, 2019, atau lebih baru). Pada Word for Mac, menu yang sama terdapat pada **Tools** dan **Layout**.'),
  ...list([
    '**Pasang alat periksa bahasa Indonesia.** Buka *File > Options > Language*. Pada bagian *Office authoring languages and proofing*, tambahkan *Indonesian* (*Add a language*) dan pastikan statusnya *Proofing installed*. Jika belum terpasang, unduh *Language Accessory Pack* bahasa Indonesia dari Microsoft.',
    '**Setel bahasa naskah.** Pilih seluruh teks (*Ctrl+A*), lalu buka *Review > Language > Set Proofing Language*, pilih *Indonesian*, hilangkan centang *Detect language automatically*, dan klik *OK*. Untuk menjadikannya bawaan dokumen baru, klik *Set As Default* pada kotak dialog yang sama.',
    '**Ratakan kiri-kanan.** Gunakan *Home > Justify* (*Ctrl+J*), sebaiknya melalui *style* Normal agar berlaku pada seluruh naskah.',
    '**Atur pemenggalan kata.** Buka *Layout > Hyphenation > Automatic*, lalu buka *Hyphenation Options*, isi *Hyphenation zone* 0,63 cm (rentang 0,5–0,75 cm), isi *Limit consecutive hyphens to* 2, dan hilangkan centang *Hyphenate words in CAPS*. Pengaturan ini sudah ada pada templat. Perlu diperhatikan bahwa Word **tidak memiliki pola pemenggalan bahasa Indonesia**, sehingga pengaturan tersebut hanya memenggal teks yang bahasanya ditandai bahasa lain, misalnya istilah berbahasa Inggris.',
    '**Sisipkan tanda pemenggal sebelum mencetak.** Kata bahasa Indonesia dipenggal dengan **tanda pemenggal opsional** (*optional hyphen*) yang hanya tampil ketika kata jatuh di akhir baris. Tanda ini disisipkan ke seluruh naskah dengan membuka pemenggal/pemenggal-id.html di peramban (berjalan luring), menyeret berkas .docx naskah ke halaman tersebut, lalu mengunduh hasilnya (berakhiran -dipenggal.docx). Lakukan langkah ini pada naskah final sebelum dicetak dan diubah ke PDF. Pengguna baris perintah dapat memakai pemenggal_id.py. Selain pola bawaan, tersedia pola alternatif berbasis kamus autohyphen-id (pemenggal/hyph_id_ID-baku.dic) yang dapat dipilih di halaman pemenggal atau dengan *python3 pemenggal_id.py --pola hyph_id_ID-baku.dic naskah.docx*. Tanda pemenggal juga dapat disisipkan manual dengan *Ctrl+tanda hubung*.',
    '**Kecualikan bagian yang tidak boleh dipenggal.** Pada *style* judul, tabel, daftar pustaka berisi alamat situs, dan kode program, buka *Paragraph > Line and Page Breaks* lalu centang *Don\'t hyphenate*. Pada templat, pengaturan ini sudah melekat pada *style* judul.',
    '**Periksa hasil pemenggalan.** Tinjau baris-baris dengan celah antarkata yang lebar; sisipkan atau pindahkan tanda pemenggal opsional pada posisi suku kata yang benar.',
    '**Tambahkan kamus pengguna.** Buka *File > Options > Proofing > Custom Dictionaries*, klik *Add*, pilih kamus/kamus-mti.dic dari paket proofing MTI, lalu setel bahasanya ke *Indonesian*.',
  ]),
  P('Berbeda dengan Word, LibreOffice Writer dapat memenggal kata bahasa Indonesia secara otomatis. Pasang ekstensi libreoffice/pemenggalan-ejaan-id-mti.oxt melalui *Tools > Extension Manager > Add* (berisi pola pemenggalan, kamus ejaan Indonesia, dan kamus istilah MTI), kemudian setel bahasa melalui *Tools > Language > For All Text > Indonesian* dan aktifkan *Format > Paragraph > Text Flow > Hyphenation: Automatically*.'),
  H3('III.8.2', 'LaTeX'),
  P('Mahasiswa yang menulis dengan LaTeX menggunakan kelas dokumen MTI UnLa (latex/mti-unla.cls) yang sudah memuat format naskah, bahasa Indonesia, dan pola pemenggalan kata. Naskah dimulai dengan:'),
  ...CODE([
    '\\documentclass{mti-unla}',
    '% contoh lengkap: latex/tesis.tex',
    '% pola alternatif autohyphen-id: \\documentclass[polabaku]{mti-unla}',
  ]),
  P('Kompilasi dengan **LuaLaTeX** disarankan karena pola pemenggalan MTI dimuat penuh. pdfLaTeX dan XeLaTeX tetap dapat digunakan dengan koreksi pemenggalan yang lebih terbatas. Untuk Overleaf, unggah templat-latex-overleaf.zip sebagai proyek baru dan setel *Compiler* ke LuaLaTeX. Pemenggalan yang keliru diperbaiki dengan perintah \\babelhyphenation atau \\hyphenation pada preambul, atau tanda pemenggalan \\- di dalam kata. Pola alternatif berbasis kamus autohyphen-id (latex/hyph-id-baku.tex) dipakai dengan menambahkan opsi polabaku pada kelas dokumen, seperti contoh di atas. Pemeriksaan ejaan dilakukan oleh penyunting, misalnya TeXstudio atau Overleaf, dengan memilih kamus bahasa Indonesia.'),
];

const bab4 = [
  H1('Bab IV', 'Bagian Persiapan Tesis'),
  P('Bab ini menguraikan isi dan format setiap halaman pada bagian persiapan tesis sesuai urutan pada Subbab II.4.'),
  H2('IV.1', 'Sampul dan Halaman Judul'),
  P('Sampul tesis berwarna biru gelap (biru dongker), kertas Omega No. 10, dijilid dengan *hard cover*, dan tulisannya dicetak dengan tinta berwarna emas (Lampiran E). Pada sampul dicetak judul tesis, kata TESIS, keterangan "Karya tulis sebagai salah satu syarat untuk memperoleh gelar Magister dari Universitas Langlangbuana", nama lengkap mahasiswa, NPM, nama program studi, lambang UnLa, baris UNIVERSITAS LANGLANGBUANA, serta bulan dan tahun kelulusan. Judul tesis, nama lengkap mahasiswa, dan baris UNIVERSITAS LANGLANGBUANA ditulis dengan huruf kapital. Halaman judul (sampul dalam) memuat isi yang sama dengan sampul dan dicetak pada kertas naskah.'),
  P('Pada punggung sampul dicantumkan nama penulis, NPM, judul, lambang UnLa, serta bulan dan tahun tesis. Nama bulan pada punggung sampul disingkat, yaitu Jan, Feb, Mar, Apr, Mei, Jun, Jul, Agu, Sep, Okt, Nov, dan Des.'),
  P('Baris pada sampul berjarak satu spasi. Jenis dan ukuran huruf adalah sebagai berikut (contoh pada Lampiran A):'),
  ...list([
    'judul tesis: Times New Roman, huruf kapital, ukuran 14, tebal;',
    'kata TESIS: sama dengan judul;',
    'kalimat keterangan di bawah kata TESIS: ukuran 12, tebal;',
    'kata "Oleh": ukuran 12, tebal;',
    'nama mahasiswa, NPM, dan nama program studi: ukuran 14, tebal;',
    'UNIVERSITAS LANGLANGBUANA serta bulan dan tahun: ukuran 14, tebal;',
    'lambang UnLa: tinggi 3,5 cm dengan perbandingan lebar dan tinggi yang tetap proporsional.',
  ], 'bullet'),
  P('Jarak antarunsur pada sampul tidak mengikat, tetapi diatur proporsional sesuai panjang judul sehingga seluruh isi sampul termuat dalam satu halaman. Bulan dan tahun diletakkan tepat pada batas bawah bidang cetak.'),

  H2('IV.2', 'Halaman Pengesahan'),
  P('Halaman pengesahan dicetak pada halaman baru dengan jarak satu spasi. Halaman ini memuat judul tesis, nama mahasiswa, NPM, nama program studi, nama Universitas Langlangbuana, kata "Menyetujui", **baris tanggal pengesahan**, serta nama dan tanda tangan pembimbing. Format untuk satu pembimbing terdapat pada Lampiran F.1. Apabila pembimbing lebih dari satu orang, nama pembimbing ditulis sejajar, dimulai dengan pembimbing pertama (ketua) di sebelah kiri dan pembimbing kedua di sebelah kanan (Lampiran F.2).'),

  H2('IV.3', 'Halaman Pernyataan Keaslian Tesis'),
  P('Halaman pernyataan keaslian dicetak pada halaman baru dan diberi judul PERNYATAAN KEASLIAN TESIS. Pada halaman ini mahasiswa menyatakan bahwa tesis merupakan hasil karyanya sendiri, belum pernah diajukan untuk memperoleh gelar akademik di perguruan tinggi mana pun, dan semua sumber yang dikutip atau dirujuk telah dinyatakan dengan benar. Pernyataan ditandatangani oleh mahasiswa (di atas meterai apabila dipersyaratkan Pascasarjana). Contohnya terdapat pada Lampiran G.'),

  H2('IV.4', 'Halaman Pernyataan Penggunaan AI Generatif'),
  P(`Halaman ini **wajib** ada pada setiap tesis, dicetak pada halaman baru tepat setelah halaman pernyataan keaslian, dan diberi judul PERNYATAAN PENGGUNAAN KECERDASAN ARTIFISIAL GENERATIF. Halaman ini memuat pernyataan mahasiswa tentang alat AI generatif yang digunakan selama penelitian dan penulisan tesis, sesuai unsur pengungkapan pada Subbab VIII.10 dan ${PANDUAN}. Mahasiswa yang tidak menggunakan AI generatif tetap mengisi halaman ini dengan pernyataan nihil. Halaman ini ditandatangani oleh mahasiswa dan diketahui oleh pembimbing utama. Pernyataan dapat disajikan dalam bentuk formulir atau naratif sebagaimana contoh pada Lampiran H.`),

  H2('IV.5', 'Halaman Pedoman Penggunaan Tesis'),
  P('Halaman pedoman penggunaan tesis dicetak pada halaman baru dan diberi judul PEDOMAN PENGGUNAAN TESIS. Tesis dalam bentuk aslinya bukan merupakan hasil penerbitan sehingga peredarannya terbatas. Halaman ini memuat ketentuan hak cipta, cara mengutip tesis dalam bahasa Indonesia dan bahasa Inggris, serta ketentuan izin memperbanyak tesis. Isi dan formatnya dapat dilihat pada Lampiran I.'),

  H2('IV.6', 'Halaman Peruntukan'),
  P('Halaman peruntukan (*dedication*) bukan halaman yang diharuskan. Jika ada, halaman ini memuat kalimat singkat untuk siapa tesis didedikasikan, diletakkan di tengah halaman dan dicetak miring. Contohnya dapat dilihat pada Lampiran J.'),

  H2('IV.7', 'Halaman Kata Pengantar'),
  P('Halaman kata pengantar dicetak pada halaman baru. Pada halaman ini mahasiswa menyampaikan terima kasih secara tertulis kepada pembimbing dan pihak lain yang telah memberi bimbingan, nasihat, saran, dan kritik, kepada pihak yang membantu pelaksanaan penelitian, serta kepada perorangan atau lembaga yang memberi bantuan pembiayaan.'),
  P('Kata pengantar ditulis dengan kalimat baku. Ucapan terima kasih dibuat tidak berlebihan dan dibatasi pada pihak yang berkaitan secara ilmiah (*scientifically related*). Alat AI tidak dicantumkan sebagai pihak yang diberi ucapan terima kasih; penggunaannya diungkapkan pada halaman pernyataan (Subbab IV.4). Contoh kata pengantar terdapat pada Lampiran K.'),

  H2('IV.8', 'Halaman Daftar Isi'),
  P('Halaman daftar isi dicetak pada halaman baru dan diberi judul DAFTAR ISI (ukuran 14, tebal) tanpa titik di akhir. Baris pada daftar isi berjarak satu spasi. Halaman ini memuat nomor bab, judul bab, nomor dan judul anak bab, serta nomor halamannya. Nomor bab, judul bab, dan nomor halaman ditulis pada tiga kolom yang berurutan.'),
  P('Nomor bab ditulis dengan angka Romawi tanpa titik di akhir. Nomor anak bab terdiri atas angka Romawi (nomor bab) dan angka Arab (nomor urut anak bab dalam bab) yang dipisahkan oleh titik, misalnya II.3. Nomor anak pada anak bab terdiri atas angka Romawi dan dua angka Arab, misalnya II.3.1. Anak pada anak bab boleh dimuat dalam daftar isi. Judul bab dan anak bab tidak diakhiri titik karena judul bukan kalimat.'),
  P('Judul bab, anak bab, dan anak pada anak bab ditulis dengan huruf awal kapital pada setiap kata, kecuali kata tugas yang tidak terletak pada posisi awal, seperti *di*, *ke*, *dari*, *dan*, *yang*, *untuk*, *pada*, *dengan*, *terhadap*, *dalam*, *sebagai*, *atau*, *serta*, *bagi*, dan *oleh*, sesuai kaidah penulisan judul dalam EYD Edisi V.'),
  P('Daftar isi dapat terdiri atas lebih dari satu halaman dan **dibangkitkan otomatis** dengan fasilitas pengolah kata, bukan diketik manual. Contohnya terdapat pada Lampiran L.'),

  H2('IV.9', 'Halaman Daftar Lampiran'),
  P('Halaman daftar lampiran dicetak pada halaman baru dengan jarak satu spasi. Halaman ini memuat kode dan judul lampiran, nomor dan judul anak lampiran, serta nomor halamannya. Lampiran diberi kode huruf kapital A, B, C, dan seterusnya, sedangkan anak lampiran diberi nomor gabungan huruf dan angka Arab, misalnya A.1 dan A.2. Cara penulisan judul lampiran sama dengan penulisan judul bab pada daftar isi. Daftar lampiran dibangkitkan otomatis dengan fasilitas pengolah kata. Contohnya terdapat pada Lampiran M.'),

  H2('IV.10', 'Halaman Daftar Gambar dan Ilustrasi'),
  P('Halaman daftar gambar dan ilustrasi dicetak pada halaman baru dengan jarak satu spasi. Halaman ini memuat nomor gambar, judul gambar, dan nomor halaman tempat gambar dimuat. Nomor gambar terdiri atas angka Romawi yang menunjukkan nomor bab (bukan nomor subbab) dan angka Arab yang menunjukkan nomor urut gambar dalam bab, dipisahkan oleh titik, misalnya Gambar III.2.'),
  P('Judul gambar ditulis dengan huruf kecil, kecuali huruf pertama kata pertama dan huruf pertama nama diri. Judul gambar pada daftar harus sama dengan judul gambar pada naskah. Daftar gambar dibangkitkan otomatis dengan fasilitas pengolah kata. Contohnya terdapat pada Lampiran N.'),

  H2('IV.11', 'Halaman Daftar Tabel'),
  P('Halaman daftar tabel dicetak pada halaman baru dengan jarak satu spasi. Halaman ini memuat nomor tabel, judul tabel, dan nomor halaman tempat tabel dimuat. Penomoran dan penulisan judul tabel sama dengan penomoran dan penulisan judul gambar. Daftar tabel dibangkitkan otomatis dengan fasilitas pengolah kata. Contohnya terdapat pada Lampiran O.'),

  H2('IV.12', 'Halaman Daftar Singkatan dan Lambang'),
  P('Halaman daftar singkatan dan lambang dicetak pada halaman baru dengan jarak satu spasi. Halaman ini memuat singkatan, satuan, dan lambang (kolom pertama), kepanjangan atau nama besarannya (kolom kedua), dan nomor halaman tempat singkatan atau lambang itu pertama kali digunakan (kolom ketiga).'),
  P('Singkatan dan lambang pada kolom pertama diurutkan menurut abjad Latin, huruf kapital lebih dahulu daripada huruf kecil, kemudian disusul lambang berhuruf Yunani yang diurutkan menurut abjad Yunani. Kepanjangan atau nama besaran pada kolom kedua ditulis dengan huruf kecil, kecuali huruf pertama dan nama diri. Contohnya terdapat pada Lampiran P.'),
];

const bab5 = [
  H1('Bab V', 'Tubuh Utama Tesis'),
  P('Isi tubuh utama tesis sepenuhnya merupakan tanggung jawab mahasiswa dan pembimbing. Tubuh utama dibagi menjadi beberapa bab, diawali dengan Bab Pendahuluan dan diakhiri dengan Bab Kesimpulan dan Saran. Jumlah bab tidak dibakukan, tetapi disesuaikan dengan keperluan penyajian tesis. Setiap bab dimulai pada halaman baru. Cara menulis judul bab dan anak bab dijelaskan pada Subbab VIII.6. Uraian pada bab ini merujuk antara lain pada Booth dkk. (1995), FMIPA UGM (2009), Phillips dan Pugh (1993), Sekolah Pascasarjana ITB (2008), dan Sekolah Pascasarjana ITB (2017).'),

  H2('V.1', 'Bab Pendahuluan'),
  P('Judul bab, yaitu Pendahuluan (ukuran 14, tebal), ditulis dengan huruf kecil kecuali huruf pertama, dicetak sejajar dengan Bab I tanpa titik di akhir, dan diletakkan di tengah halaman. Bab Pendahuluan sedikitnya memuat hal-hal berikut, yang dapat dirinci dalam bentuk anak bab:'),
  ...list([
    '**Latar belakang dan deskripsi topik penelitian**, yaitu fenomena ilmiah atau permasalahan nyata yang melahirkan kerangka pemikiran dan menjadi alasan dilakukannya penelitian, baik alasan strategis maupun alasan spesifik yang terkait dengan topik penelitian.',
    '**Masalah penelitian** (*statement of the problem*) dan/atau **pertanyaan penelitian** (*research question*), dirumuskan dengan jelas, tegas, dan rinci karena masalah yang diselesaikan dalam tesis seharusnya sudah menjurus dan runcing dalam bidang teknik informatika.',
    '**Tujuan penelitian**, yang berkorespondensi langsung dengan masalah atau pertanyaan penelitian.',
    '**Lingkup dan batasan masalah**, yaitu batas objek, data, metode, perangkat, atau lingkungan yang dicakup penelitian.',
    '**Asumsi** yang digunakan dalam penelitian.',
    '**Hipotesis**, apabila penelitian bersifat pengujian hipotesis.',
    '**Metodologi penelitian**, yaitu cara pendekatan dan metode yang digunakan, dilengkapi dengan **diagram alir penelitian** (contoh pada Lampiran S).',
    '**Pelaksanaan penelitian** secara garis besar, termasuk lokasi, sumber data, dan jadwal bila relevan.',
    '**Sistematika** (*outline*) tesis.',
  ]),

  H2('V.2', 'Bab Tinjauan Pustaka'),
  P('Bab Tinjauan Pustaka berisi uraian tentang ***state of the art***, yaitu alur pikir dan perkembangan terkini keilmuan dalam topik kajian. Pada hakikatnya, hasil penelitian seorang peneliti bukanlah penemuan baru yang berdiri sendiri, melainkan berkaitan dengan hasil penelitian sebelumnya. Oleh karena itu, pada bab ini harus dielaborasi hasil penelitian terdahulu yang berkaitan dengan masalah yang dikaji sedemikian rupa sehingga tergambar perkembangan pengetahuan yang mendasari tesis dan **garis depan** (*front line*) pengetahuan di bidang tersebut. Dengan tinjauan pustaka ini, mahasiswa juga menunjukkan bahwa ia menguasai ilmu yang mendasari permasalahan yang dikaji serta menunjukkan **posisi dan kontribusi** penelitiannya terhadap penelitian sejenis.'),
  P('Tinjauan pustaka **bukan** uraian mengenai metode dan/atau dasar-dasar teori yang sudah lazim, baik yang akan digunakan maupun tidak. Teori dasar yang diperlukan cukup diringkas dan dirujuk.'),
  P('Tinjauan pustaka disusun sesuai urutan perkembangan cabang ilmu yang dikandungnya dan memuat ulasan kritis terhadap setiap rujukan utama: apa yang telah dicapai, metode apa yang digunakan, dan apa keterbatasannya. Mahasiswa dianjurkan menyajikan **tabel perbandingan penelitian terkait** yang memuat sekurang-kurangnya penulis dan tahun, masalah, metode, data atau objek, hasil, dan keterbatasan, kemudian menyimpulkan celah penelitian (*research gap*) yang diisi oleh tesis. Rujukan utama hendaknya didominasi oleh artikel jurnal dan prosiding bereputasi dalam lima sampai sepuluh tahun terakhir.'),
  P('Bila dipandang perlu, tinjauan pustaka dapat disisipkan pada bab-bab isi sesuai keperluan penulisan dan kelaziman di bidangnya, dan tidak harus ditulis sebagai bab terpisah.'),

  H2('V.3', 'Bab-Bab Isi Tesis'),
  P('Jumlah bab isi disesuaikan dengan keperluan. Dalam bab-bab tersebut diuraikan secara rinci metodologi dan pelaksanaan penelitian, perancangan dan implementasi (bila ada), hasil pengujian, percobaan, atau pengumpulan data, pengolahan dan analisis data, serta pembahasan hasil (*discussion*), termasuk perbandingan hasil dengan penelitian sejenis.'),
  P('Untuk penelitian di bidang teknik informatika, uraian hendaknya cukup rinci agar penelitian dapat diulang (*reproducible*), antara lain dengan menjelaskan sumber dan karakteristik data, praproses, konfigurasi dan parameter model atau sistem, spesifikasi lingkungan pengujian (perangkat keras, perangkat lunak, dan versinya), metrik evaluasi, serta skenario pengujian. Kode sumber yang relevan dapat disajikan dalam lampiran atau disediakan melalui repositori yang alamatnya dicantumkan dalam tesis. Apabila alat atau model AI digunakan sebagai bagian dari metode penelitian, penggunaannya diuraikan pada bab metodologi sesuai Subbab VIII.10.'),

  H2('V.4', 'Bab Kesimpulan dan Saran'),
  P('Bab ini memuat elaborasi dan rincian kesimpulan yang dituliskan dalam abstrak. Kesimpulan harus menjawab masalah atau pertanyaan penelitian dan tujuan yang dirumuskan pada Bab Pendahuluan, serta menegaskan kontribusi penelitian. Saran untuk penelitian lanjutan dan implikasi praktis (*practical implication*) dari hasil penelitian dapat dituliskan pada bab ini.'),
];

const bab6 = [
  H1('Bab VI', 'Daftar Pustaka'),
  P('Daftar pustaka bukan bab tersendiri. Bab ini menguraikan cara merujuk pustaka di dalam teks tesis dan cara menyusun daftar pustaka yang dibakukan dalam buku pedoman ini.'),
  H2('VI.1', 'Penulisan Pustaka dalam Teks Tesis'),
  P('Daftar pustaka memuat semua rujukan yang digunakan mahasiswa dalam menyiapkan dan menyelesaikan tesisnya. **Semua pustaka yang tercantum dalam daftar pustaka harus benar-benar dirujuk dalam teks tesis, dan sebaliknya.** Catatan kaki (*footnote*) tidak dianjurkan untuk menunjukkan rujukan; hal yang ingin disampaikan hendaknya diuraikan menyatu dalam teks.'),
  P('Pustaka dapat berupa buku, artikel jurnal, prosiding, tesis, disertasi, laporan teknis, standar, dan dokumen dari situs internet yang dapat dipertanggungjawabkan. Buku ajar (*textbook*) yang dirujuk hendaknya edisi yang paling mutakhir. Penilaian tentang pustaka yang layak dan tidak layak dirujuk mengikuti kelaziman di bidang teknik informatika.'),
  P('Dalam teks tesis, nama penulis yang ditulis paling banyak dua orang. Untuk pustaka dengan lebih dari dua penulis, yang ditulis adalah nama penulis pertama diikuti **dkk.** (dan kawan-kawan), bukan *et al.*, kemudian tahun publikasi. Dalam daftar pustaka, seluruh nama penulis tetap ditulis lengkap. Rujukan dapat ditulis menyatu dalam kalimat, seperti "Kramer dkk. (2005) menyatakan bahwa ...", atau diletakkan di akhir kalimat yang disadur, seperti "... (Sumbi, 2019)".'),
  P('Cara penulisan rujukan dalam teks dirangkum pada Tabel VI.1.'),
  caption('Tabel VI.1 Cara penulisan rujukan dalam teks tesis', { before: 120, after: 120, keepNext: true }),
  table([
    ['Kasus', 'Contoh penulisan'],
    ['Satu penulis', '(Hill, 2007) atau Hill (2007)'],
    ['Dua penulis', '(Gao dan Zhao, 2009) atau Gao dan Zhao (2009)'],
    ['Lebih dari dua penulis', '(Kramer dkk., 2005) atau Kramer dkk. (2005)'],
    ['Disertai nomor halaman (kutipan langsung atau bagian buku)', '(Baker dkk., 1998: 23–25)'],
    ['Dua rujukan atau lebih sekaligus', '(Hill, 2007; Kramer dkk., 2005) diurutkan menurut tahun atau abjad secara konsisten'],
    ['Dua rujukan dari penulis yang sama, tahun berbeda', '(Culver dkk., 2003, 2010)'],
    ['Dua rujukan dari penulis yang sama, tahun sama', '(Culver dkk., 2003a, 2003b); huruf a, b juga dicantumkan pada daftar pustaka'],
    ['Lembaga sebagai penulis', '(Badan Pengembangan dan Pembinaan Bahasa, 2022) atau singkatannya setelah disebut lengkap'],
    ['Situs internet tanpa nama penulis', '(nama lembaga pemilik situs, tahun) atau alamat situs, dengan tanggal akses pada daftar pustaka'],
  ], [3000, TEXT_W - 3000], { size: 20 }),
  ...blank(1, 360),
  P('Penulisan huruf tebal dan kapital pada contoh-contoh dalam buku pedoman ini hanya untuk penekanan. Dalam teks tesis, penulisannya mengikuti format normal.'),

  H2('VI.2', 'Penyusunan Daftar Pustaka'),
  P('Daftar pustaka tidak diberi nomor bab. Daftar pustaka ditulis pada halaman baru dengan judul DAFTAR PUSTAKA yang dicetak 3 cm dari tepi atas halaman dengan huruf kapital, ukuran 14, tebal, tanpa titik di akhir.'),
  P('Daftar pustaka disusun menurut abjad nama keluarga penulis pertama tanpa nomor urut. Setiap pustaka dicetak dengan jarak satu spasi, dan antarpustaka dipisahkan satu spasi. Baris kedua dan seterusnya dari setiap pustaka dimulai dengan indentasi gantung (*hanging indentation*) 1,27 cm. Pustaka dari penulis yang sama diurutkan menurut tahun terbit, dan pustaka dari penulis dan tahun yang sama dibedakan dengan huruf a, b, dan seterusnya di belakang tahun.'),
  P('Nama penulis Indonesia yang tidak mengandung nama keluarga ditulis seperti yang dikehendaki pemilik nama, yaitu seperti yang ia tulis sendiri dalam karya tulisnya.'),
  P('Pustaka dikelompokkan sebagai berikut, dengan urutan:'),
  ...list([
    'pustaka dari buku, artikel jurnal, prosiding, tesis, disertasi, laporan, dan standar;',
    'pustaka dari surat kabar;',
    'pustaka dari film atau televisi;',
    'pustaka dari situs internet.',
  ]),
  P('Kelompok kedua sampai keempat diberi subjudul tersendiri setelah kelompok pertama. Rujukan dari surat kabar, radio, televisi, dan film hanya dapat digunakan apabila menjadi bagian dari materi atau objek penelitian, bukan sekadar sebagai rujukan. Contoh lengkap daftar pustaka terdapat pada Lampiran Q.'),

  H3('VI.2.1', 'Buku, Jurnal, Prosiding, dan Karya Ilmiah Sejenis'),
  P('Pustaka dari artikel jurnal, majalah ilmiah, buletin, atau prosiding ditulis sebagai berikut:'),
  ...list([
    'Penulis tunggal: nama keluarga penulis diikuti koma dan inisial nama depan yang diakhiri titik, lalu tahun dalam kurung yang diikuti titik dua, judul artikel dengan huruf kecil kecuali huruf pertama dan nama diri (lihat Subbab VII.4) yang diakhiri koma, nama jurnal (miring), volume (tebal), dan halaman. Contoh:',
  ], 'num', { noGap: true }),
  REF('Cotton, F. A. (1998): Kinetics of gasification of brown coal, *Journal of American Chemical Society*, **54**, 38–43.', { left: 360 }),
  ...list([
    'Dua penulis: penulis pertama ditulis seperti butir 1, diikuti kata "dan" (bukan *and* atau &), kemudian nama keluarga dan inisial penulis kedua. Contoh:',
  ], 'num', { noGap: true }),
  REF('Tarub, J. dan Tingkir, D. (1999): Dampak penebangan hutan dan erosi di hulu aliran Sungai Bengawan Solo terhadap potensi banjir di sekitar muaranya, *Majalah Kehutanan*, **7**, 12–22.', { left: 360 }),
  ...list([
    'Lebih dari dua penulis (dalam teks ditulis dengan dkk.): seluruh nama penulis ditulis lengkap, dengan kata "dan" sebelum penulis terakhir. Contoh:',
  ], 'num', { noGap: true }),
  REF('Kramer, A., Djubiantono, T., Aziz, F., Bogard, J. S., Weeks, R. A., Weinand, D. C., Hames, W. E., Elam, J. M., Durband, A. C., dan Agus (2005): The first hominid fossil recovered from West Java, Indonesia, *Journal of Human Evolution*, **48**, 661–667.', { left: 360 }),
  P('Hal-hal lain yang perlu diperhatikan:'),
  ...list([
    'Nama jurnal ditulis miring dengan huruf awal kapital pada setiap kata (kecuali kata tugas) dan boleh disingkat sesuai kelaziman internasional, diakhiri koma.',
    'Nomor volume dicetak tebal dan diakhiri koma.',
    'Halaman awal dan halaman akhir dihubungkan dengan tanda pisah (–).',
    'Apabila pustaka memiliki *Digital Object Identifier* (DOI), DOI dicantumkan di akhir pustaka dalam bentuk tautan, misalnya https://doi.org/10.xxxx/xxxxx. Artikel yang hanya memiliki nomor artikel (tanpa halaman) ditulis dengan nomor artikelnya.',
    'Bab dalam buku yang disunting ditulis dengan menyebut nama penyunting (ed.), judul buku (miring), penerbit, dan kota terbit. Artikel prosiding ditulis dengan menyebut nama prosiding (miring), tempat konferensi, penyunting (bila ada), penerbit, dan halaman.',
    'Tesis atau disertasi ditulis dengan menyebut jenis karya (Tesis Program Magister atau Disertasi Program Doktor) dan nama perguruan tinggi.',
  ], 'alpha'),

  H3('VI.2.2', 'Surat Kabar'),
  P('Pustaka dari surat kabar ditulis dengan mencantumkan nama penulis (bila ada), tanggal terbit, judul artikel, nama surat kabar (miring), dan halaman. Apabila nama penulis tidak ada, pustaka diawali dengan judul artikel. Dalam teks, rujukan ditulis dengan nama penulis dan tahun, atau judul singkat dan tahun bila tanpa penulis. Contoh:'),
  REF('Saidi, A. I. (16 Oktober 2015): Semiotika laut, *Kompas*, hal. 6.'),
  REF('Pengelolaan data pribadi diatur ketat (12 Maret 2025): *Pikiran Rakyat*, hal. 3.'),

  H3('VI.2.3', 'Film atau Televisi'),
  P('Rujukan dari film dalam teks ditulis dengan nama produser eksekutif atau produser dan tahun rilis, misalnya (Sagantoro, 2011). Dalam daftar pustaka dicantumkan nama produser, tahun rilis, judul film, jenis karya, serta nama studio dan kota. Rujukan dari televisi dalam teks ditulis dengan nama produser eksekutif dan tahun penayangan, misalnya (Arlusi dan Ginting, 2015). Dalam daftar pustaka dicantumkan nama produser eksekutif, tanggal penayangan, judul acara, jenis siaran, serta nama stasiun dan kota. Contoh:'),
  REF('Sagantoro, A. (Produser) (2011): *The Raid* [Gambar Hidup], PT Merantau Films dan XYZ Films, Jakarta.'),
  REF('Arlusi, R. dan Ginting, E. (Produser Eksekutif) (21 Oktober 2015): *Mata Najwa* [Siaran Televisi], Metro TV, Jakarta.'),

  H3('VI.2.4', 'Situs Internet'),
  P('Rujukan dari situs internet ditulis dalam teks dengan nama penulis atau lembaga dan tahun, atau dengan alamat situs bila tidak ada keduanya. Dalam daftar pustaka, rujukan tersebut ditulis lengkap dengan nama penulis atau lembaga, tahun, judul dokumen atau halaman, alamat situs, dan **tanggal diakses**. Dokumen daring yang memiliki DOI atau diterbitkan secara resmi diperlakukan seperti pustaka cetak. Contoh terdapat pada Lampiran Q.'),

  H3('VI.2.5', 'Keluaran Alat Kecerdasan Artifisial'),
  P(`AI generatif **tidak diakui sebagai sumber rujukan ilmiah** untuk mendukung klaim karena keluarannya tidak dapat diverifikasi dan dapat berubah. Fakta, angka, definisi, atau gagasan yang diperoleh melalui alat AI harus ditelusuri ke sumber aslinya, dan sumber asli itulah yang dirujuk. Keluaran AI hanya dikutip apabila keluaran itu sendiri dianalisis atau menjadi data penelitian. Dalam hal tersebut, kutipan ditulis sebagai kutipan langsung, *prompt*-nya dicantumkan pada log *prompt*, dan rujukannya ditulis dengan format pada buku pedoman ini, yaitu nama penyedia, tahun, nama alat, versi atau model, tanggal penggunaan, jenis karya, dan alamat layanan. Contoh dalam teks "(OpenAI, 2026)" dan dalam daftar pustaka:`),
  REF('OpenAI (2026): *ChatGPT* (versi GPT-4o, 12 Maret 2026) [Model bahasa besar], https://chatgpt.com/.'),
];

const bab7 = [
  H1('Bab VII', 'Cara Membuat Gambar dan Tabel'),
  P('Bab ini mengatur pembuatan, penempatan, penomoran, dan pemberian judul gambar dan tabel.'),
  H2('VII.1', 'Gambar'),
  P('Dalam buku pedoman ini, istilah gambar mencakup gambar, ilustrasi, grafik, diagram, denah, peta, bagan, diagram alir, diagram perancangan sistem (mis. UML, ERD, arsitektur), tangkapan layar (*screenshot*), dan foto. Gambar dicetak pada kertas naskah. Huruf, angka, dan tanda baca pada gambar harus jelas terbaca, sebaiknya tidak lebih kecil daripada ukuran 9 pt setelah gambar diperkecil. Gambar disisipkan dengan resolusi yang memadai (sekurang-kurangnya 300 dpi untuk gambar raster) atau dalam format vektor.'),
  H2('VII.2', 'Gambar yang Tidak Dapat Diterima'),
  P('Gambar yang tidak dapat diterima sebagai bagian dari naskah tesis adalah:'),
  ...list([
    'gambar yang dibuat pada kertas grafik atau kertas lain lalu ditempel pada kertas naskah;',
    'gambar beresolusi rendah sehingga tulisan atau detailnya tidak terbaca;',
    'gambar hasil AI generatif yang disajikan seolah-olah data, hasil pengamatan, atau hasil eksperimen;',
    'gambar dari sumber lain yang tidak mencantumkan sumbernya.',
  ]),
  H2('VII.3', 'Cara Meletakkan Gambar'),
  P('Gambar diletakkan simetris (*centered*) dan tidak boleh melampaui batas bidang cetak (*margins*). Sisi terpanjang gambar boleh sejajar dengan lebar atau panjang kertas. Gambar yang sisi terpanjangnya sejajar dengan panjang kertas sebaiknya dimuat pada halaman tersendiri tanpa teks dan diputar sehingga bagian atas gambar menghadap ke tepi kiri (jilid) kertas.'),
  P('Gambar yang diletakkan di antara baris teks dipisahkan satu spasi dari teks sebelumnya, dan judul gambar dipisahkan satu spasi dari teks sesudahnya. Nomor dan judul gambar diletakkan di bawah gambar. **Setiap gambar wajib dirujuk dalam teks** (misalnya "seperti terlihat pada Gambar III.1") sebelum atau di dekat gambar tersebut dimuat.'),
  P('Gambar yang lebih besar daripada halaman naskah dapat diterima apabila cukup dilipat satu kali; gambar yang lebih besar dari itu dimuat dalam lampiran.'),
  H2('VII.4', 'Penomoran dan Judul Gambar'),
  P('Setiap gambar diberi nomor yang terdiri atas dua angka yang dipisahkan titik. Angka pertama berupa angka Romawi yang menunjukkan nomor bab (**bukan nomor subbab**) dan angka kedua berupa angka Arab yang menunjukkan nomor urut gambar dalam bab, misalnya Gambar IV.2.'),
  P('Judul gambar ditulis dengan huruf kecil, kecuali huruf pertama kata pertama. Huruf pertama nama diri tetap ditulis kapital walaupun terletak di tengah judul, seperti nama tempat, nama orang, nama bangsa, nama bahasa, nama lembaga resmi, nama khas geografi (contoh: Laut Jawa), serta nama produk atau perangkat lunak.'),
  P('Judul gambar berjarak satu spasi. Judul yang terdiri atas satu baris diletakkan simetris (*centered*), sedangkan judul yang terdiri atas dua baris atau lebih diletakkan rata kiri-kanan (*justified*) dengan indentasi gantung sehingga baris kedua dan seterusnya dimulai di bawah huruf pertama judul. Contohnya terdapat pada Lampiran R dan S.'),
  H2('VII.5', 'Foto dan Tangkapan Layar'),
  P('Foto dan tangkapan layar dianggap gambar sehingga diberi nomor dan judul. Foto yang diperoleh dari sumber lain wajib mencantumkan sumbernya; **tanpa pencantuman sumber, hal tersebut termasuk plagiarisme**. Foto bangunan, lanskap, bentang alam, atau sejenisnya dilengkapi arah pengambilan foto (contoh: foto diambil dari arah selatan). Tangkapan layar aplikasi hasil penelitian dipotong seperlunya sehingga bagian yang dibahas terlihat jelas, dan data pribadi atau rahasia di dalamnya disamarkan.'),
  H2('VII.6', 'Sumber Gambar'),
  P('Gambar yang dikutip atau diadaptasi dari sumber lain dijelaskan dengan mencantumkan nama penulis dan tahunnya di akhir judul gambar, dan sumber tersebut dicantumkan dalam daftar pustaka sesuai Bab VI. Gambar yang diadaptasi diberi keterangan "(diadaptasi dari Penulis, Tahun)". **Tanpa pencantuman sumber pada judul gambar dan daftar pustaka, hal tersebut termasuk plagiarisme.** Gambar yang dibuat atau dimodifikasi dengan alat AI generatif diberi keterangan pada judul gambar, misalnya "(dibuat dengan bantuan [nama alat])", dan penggunaannya diungkapkan sesuai Subbab VIII.10.'),
  H2('VII.7', 'Tabel'),
  P('Tabel dibuat dengan fasilitas tabel pada pengolah kata, bukan berupa gambar tangkapan layar. Kolom-kolom tabel disusun sehingga tabel mudah dibaca. Isi tabel dicetak dengan jarak satu spasi dan huruf berukuran 10–12. Garis tabel dibuat seperlunya; garis vertikal sebaiknya dihindari kecuali diperlukan untuk kejelasan.'),
  P('Tabel diletakkan simetris dan tidak melampaui batas bidang cetak. Tabel yang memanjang sejajar dengan panjang kertas sebaiknya dimuat pada halaman tersendiri tanpa teks. Tabel yang diletakkan di antara baris teks dipisahkan satu spasi dari teks sebelum judul tabel dan dari teks sesudah tabel. **Setiap tabel wajib dirujuk dalam teks.**'),
  P('Tata cara penulisan nomor dan judul tabel sama dengan penulisan nomor dan judul gambar (Subbab VII.4), tetapi nomor dan judul tabel diletakkan **di atas** tabel. Baris terakhir judul tabel berjarak satu spasi dari garis atas tabel.'),
  P('Tabel sebaiknya dimuat dalam satu halaman. Tabel yang terpaksa berlanjut ke halaman berikutnya harus memenuhi ketentuan berikut (contoh pada Lampiran T):'),
  ...list([
    'baris judul kolom (*header*) tabel **diulang** pada setiap halaman lanjutan (gunakan fasilitas *Repeat Header Rows*);',
    'di atas tabel pada halaman lanjutan ditulis nomor tabel diikuti kata "(lanjutan)", misalnya "Tabel V.5 (lanjutan)", tanpa mengulang judul lengkap dan tanpa dimuat dalam daftar tabel;',
    'baris tabel tidak terpotong di antara dua halaman.',
  ], 'alpha'),
  P('Tabel yang lebih besar daripada halaman naskah dapat diterima apabila cukup dilipat satu kali; tabel yang lebih besar dari itu dimuat dalam lampiran.'),
  H2('VII.8', 'Tabel Data Sekunder'),
  P('Tabel yang memuat data dari sumber lain wajib mencantumkan nama penulis dan tahun di akhir judul tabel, dan sumber tersebut dicantumkan dalam daftar pustaka. **Tanpa pencantuman sumber pada judul tabel dan daftar pustaka, hal tersebut termasuk plagiarisme.**'),
  P('Tabel yang memuat data dari beberapa sumber memberi tanda superskrip pada setiap kelompok data dari satu sumber, dan superskrip tersebut dijelaskan dalam keterangan di bawah tabel. Sumber dapat pula dituliskan pada satu kolom khusus dalam tabel sehingga superskrip tidak diperlukan.'),
];

// equation paragraph: left aligned with right tab number
const eqPara = new Paragraph({
  tabStops: [{ type: TabStopType.RIGHT, position: TEXT_W }],
  indent: { left: 567 },
  spacing: { before: 120, after: 120, line: 360 },
  children: [
    new M({ children: [
      new MathRun('F1 = 2 × '),
      new MathFraction({ numerator: [new MathRun('P × R')], denominator: [new MathRun('P + R')] }),
    ] }),
    new TextRun({ text: '\t(VIII.1)', font: 'Times New Roman' }),
  ],
});

const bab8 = [
  H1('Bab VIII', 'Pedoman Lain'),
  P('Bab ini memuat ketentuan penulisan lain yang belum diatur pada bab-bab sebelumnya, termasuk pemeriksaan kemiripan dan pengungkapan penggunaan AI.'),
  H2('VIII.1', 'Lambang'),
  P('Lambang variabel digunakan untuk memudahkan penulisan variabel dalam rumus dan pernyataan matematis lainnya. Semua huruf Latin dan Yunani, baik kapital maupun kecil, dapat digunakan sebagai lambang variabel. Lambang dapat terdiri atas satu atau dua huruf dan dapat diberi subskrip, superskrip, atau keduanya. Subskrip dan superskrip dapat berupa huruf, angka, atau keduanya. Lambang variabel ditulis miring. Sebagai petunjuk umum, pilihlah lambang yang lazim digunakan di bidang ilmu yang bersangkutan.'),
  P('Kalimat tidak boleh diawali dengan lambang variabel. Susunlah kalimat sedemikian rupa sehingga tidak perlu diawali lambang.'),
  H2('VIII.2', 'Satuan dan Singkatan'),
  P('Satuan yang digunakan dalam tesis adalah Satuan Internasional (SI). Singkatan satuan mengikuti ketentuan SI, ditulis tanpa titik dan tidak dicetak miring. Singkatan satuan dapat dibubuhi awalan seperti µ (mikro), m (mili), c (senti), k (kilo), M (mega), dan G (giga). Untuk satuan data digital, gunakan bit (b) dan bita (B) secara konsisten, dan bedakan awalan desimal (kB, MB, GB) dari awalan biner (KiB, MiB, GiB) bila perbedaannya berpengaruh.'),
  P('Satuan sebagai kata benda dan satuan pada awal kalimat ditulis lengkap. Satuan yang mengikuti bilangan ditulis dengan singkatannya, misalnya 16 GB atau 2,4 GHz.'),
  H2('VIII.3', 'Angka dan Bilangan'),
  H3('VIII.3.1', 'Angka'),
  P('Angka yang dimaksud pada anak bab ini adalah angka Arab. Angka digunakan untuk menyatakan:'),
  ...list([
    'ukuran, massa, suhu, persentase, dan besaran tentu lainnya (misalnya 174 cm, 81,0 kg, 25 °C, 95,7%);',
    'nomor halaman;',
    'tanggal (1 Januari 2026);',
    'waktu (pukul 10.45);',
    'bilangan dalam perhitungan dan rumus, termasuk pecahan;',
    'nomor versi perangkat lunak (Python 3.12) dan hal lain yang lazim ditulis dengan angka.',
  ]),
  H3('VIII.3.2', 'Bilangan'),
  ...list([
    'Tanda desimal dinyatakan dengan koma, misalnya 25,5, sedangkan tanda ribuan dinyatakan dengan titik, misalnya 1.000.000. Hindari penulisan desimal tepat tiga angka di belakang koma (misalnya 25,247) agar tidak rancu dengan ribuan; tulislah 25,25 atau 25,2472 sesuai ketelitian yang diperlukan.',
    'Perhatikan banyaknya angka bermakna. Misalnya, 25,2472 cukup ditulis 25,2 kecuali bidangnya memerlukan ketelitian tinggi.',
    'Bilangan dalam kalimat yang dapat dinyatakan dengan satu atau dua kata ditulis dengan huruf, misalnya enam perguruan tinggi atau dua puluh responden, kecuali jika bilangan itu dipakai secara berurutan atau dalam perincian, misalnya 17 server, 5 klien, dan 120 pengguna.',
    'Besaran tak tentu dan bilangan yang menyatakan besaran secara umum ditulis dengan kata-kata, misalnya sepuluh tahun yang lalu, setengah jam, atau beberapa ratus sentimeter.',
    'Hindari penggunaan angka Romawi untuk menyatakan bilangan, kecuali untuk penomoran bab, gambar, tabel, dan rumus.',
    'Bilangan sangat besar atau sangat kecil ditulis dalam notasi ilmiah, misalnya 1.908.176 ditulis 1,91 × 10⁶.',
  ]),
  P('Kalimat tidak boleh diawali dengan angka. Jika awal kalimat memerlukan bilangan, tulislah bilangan tersebut dengan kata-kata atau susun ulang kalimatnya.'),
  H2('VIII.4', 'Cetak Miring'),
  P('Ukuran huruf cetak miring sama dengan ukuran huruf naskah. Cetak miring digunakan untuk judul buku, nama jurnal, dan nama surat kabar dalam daftar pustaka (Lampiran Q), istilah asing atau daerah, serta lambang variabel. Cetak miring juga dapat digunakan untuk memberi penekanan khusus secara terbatas. Nama ilmiah organisme (genus dan spesies) dicetak miring, misalnya *Sonchus arvensis* L.'),
  P('Kode program, nama berkas, perintah, dan nama fungsi dalam teks ditulis dengan huruf berlebar tetap (*monospace*), misalnya Courier New, agar dapat dibedakan dari teks biasa.'),
  H2('VIII.5', 'Penulisan Rumus dan Perhitungan Numerik'),
  P('Rumus ditulis dengan fasilitas penyunting persamaan (*equation editor*) pada pengolah kata, bukan berupa gambar. Rumus diletakkan **rata kiri** dengan indentasi 1 cm dari batas tepi kiri dan dipisahkan satu spasi dari teks sebelum dan sesudahnya. Rumus yang panjang ditulis dalam dua baris atau lebih; pemotongan dilakukan pada tanda operasi aritmetika atau tanda sama dengan, dan tanda tersebut ditulis pada awal baris lanjutan. Tanda operasi aritmetika didahului dan diikuti satu spasi. Lambang dalam rumus ditulis miring.'),
  P('Hindari pemakaian tanda akar dan gunakan pangkat pecahan. Penulisan pecahan sebaiknya tidak menggunakan garis miring. Gunakan tanda kurung secukupnya untuk menunjukkan hierarki operasi dengan urutan [{( )}]. Hindari pemakaian titik sebagai lambang perkalian; gunakan tanda ×.'),
  P('Setiap rumus diberi nomor di antara tanda kurung yang diletakkan pada batas kanan bidang cetak. Nomor rumus terdiri atas angka Romawi yang menunjukkan nomor bab dan angka Arab yang menunjukkan nomor urut rumus dalam bab, misalnya:'),
  eqPara,
  P('dengan *P* adalah presisi (*precision*) dan *R* adalah perolehan (*recall*). Keterangan lambang setelah rumus bukan paragraf baru sehingga ditulis tanpa baris kosong dan diawali dengan huruf kecil, karena masih merupakan bagian dari kalimat yang memuat rumus.', { after: 240 }),
  P('Substitusi nilai variabel dalam operasi aritmetika ditulis seperti penulisan rumus.'),
  H2('VIII.6', 'Penulisan Judul Bab dan Judul Anak Bab'),
  P('Sebagian cara penulisan judul bab dan anak bab telah dijelaskan pada Subbab IV.8. Kata "Bab" ditulis dengan huruf awal kapital dan diikuti nomor bab dalam angka Romawi, misalnya Bab I. Kata Bab beserta nomornya dicetak 3 cm dari tepi atas, tanpa titik di belakang angka Romawi, dan diletakkan simetris dalam bidang cetak. Setiap bab dimulai pada halaman baru.'),
  P('Judul bab dicetak sebaris dengan nomor bab, dipisahkan oleh satu spasi, misalnya "Bab I Pendahuluan". Judul bab ditulis dengan huruf awal kapital pada setiap kata (kecuali kata tugas), ukuran 14, tebal, tanpa titik di akhir. Judul bab yang panjang dilanjutkan pada baris berikutnya dan tetap diletakkan simetris.'),
  P('Judul anak bab dipisahkan satu baris kosong dari baris terakhir judul bab atau paragraf sebelumnya. Nomor anak bab dicetak tebal pada batas tepi kiri, diikuti tab dan judul anak bab yang dicetak tebal dengan huruf awal kapital pada setiap kata (kecuali kata tugas), tanpa titik di akhir. Judul anak bab yang lebih dari satu baris dilanjutkan sejajar dengan huruf pertama judul (indentasi gantung). Anak pada anak bab ditulis dengan cara yang sama, dengan nomor tiga tingkat, misalnya IV.1.1.'),
  P('Antara judul bab dan judul anak bab, serta antara judul anak bab dan judul anak pada anak bab, **harus disisipkan sekurang-kurangnya satu paragraf**. Judul bab, judul anak bab, dan judul anak pada anak bab tidak boleh ditulis berturut-turut tanpa kalimat di antaranya.'),
  H2('VIII.7', 'Kutipan'),
  P('Rumus, kalimat, paragraf, atau inti pengertian yang dikutip dari makalah, buku, atau sumber lain ditunjukkan dengan mencantumkan nama penulis dan tahun terbit, dan rujukan tersebut dicantumkan dalam daftar pustaka sesuai Bab VI. Kutipan langsung ditulis di antara tanda petik dan disertai nomor halaman; kutipan langsung yang lebih dari empat baris ditulis menjorok ke dalam dengan jarak satu spasi tanpa tanda petik. **Tidak mencantumkan sumber kutipan merupakan tindakan plagiarisme.** Ketentuan ini juga berlaku untuk teks hasil parafrase, termasuk parafrase dengan bantuan alat AI.'),
  H2('VIII.8', 'Penulisan Kata Benda yang Diikuti Nomor'),
  P('Kata benda seperti "bab", "subbab", "lampiran", "gambar", "tabel", dan "persamaan" ditulis dengan huruf kecil, kecuali jika diikuti nomor atau kode urutannya. Dalam hal tersebut, huruf pertamanya ditulis kapital walaupun tidak berada pada awal kalimat, misalnya Bab I, Subbab VI.2, Lampiran B, Gambar V.2, Persamaan (II.2), dan Tabel V.5.'),
  H2('VIII.9', 'Pemeriksaan Kemiripan (Similarity) dan Plagiarisme'),
  P('Tesis merupakan karya ilmiah mahasiswa yang tentu menggunakan rujukan dari karya ilmiah lain. Sebelum sidang tesis, naskah tesis **wajib diperiksa tingkat kemiripannya** (*similarity*) terhadap karya lain dengan perangkat lunak yang ditetapkan program studi. **Nilai kemiripan maksimum yang diizinkan adalah 35%.** Laporan hasil pemeriksaan diserahkan sebagai salah satu syarat pendaftaran sidang.'),
  P('Nilai kemiripan di bawah batas tersebut tidak dengan sendirinya membuktikan bahwa naskah bebas dari plagiarisme. Penyalinan gagasan, data, gambar, atau kode tanpa menyebut sumber, termasuk melalui parafrase dengan alat AI atau mesin penerjemah, tetap merupakan plagiarisme dan diproses sesuai peraturan akademik Universitas Langlangbuana.'),
  H2('VIII.10', 'Pengungkapan Penggunaan Kecerdasan Artifisial'),
  P(`Mahasiswa **wajib mengungkapkan** penggunaan alat kecerdasan artifisial (AI) generatif dalam penelitian dan penulisan tesis dengan merujuk pada ${PANDUAN}. Panduan tersebut mengatur prinsip penggunaan, kategori penggunaan yang diizinkan dan dilarang, unsur dan letak pengungkapan, peran pembimbing dan penguji, serta sanksi pelanggaran. Subbab ini merangkum ketentuan yang berdampak langsung pada naskah tesis.`),
  P('Penggunaan AI generatif dikelompokkan ke dalam empat kategori sebagaimana Tabel VIII.1.'),
  caption('Tabel VIII.1 Kategori penggunaan AI generatif (ringkasan dari Panduan Penggunaan AI Pascasarjana UNLA)', { long: true, hang: 1418, before: 120, after: 120, keepNext: true }),
  table([
    ['Kategori', 'Ketentuan', 'Contoh'],
    ['A\nTanpa pengungkapan', 'Diizinkan, tidak perlu dicantumkan dalam pernyataan', 'Pemeriksa ejaan bawaan pengolah kata; pengelola referensi (Zotero, Mendeley); mesin pencari dan basis data akademik; pelengkapan otomatis kode tingkat baris'],
    ['B\nWajib diungkapkan', 'Diizinkan dengan syarat diungkapkan dan keluarannya diverifikasi', 'Curah gagasan; kerangka awal tulisan; memahami konsep; perbaikan bahasa, parafrase, dan terjemahan teks sendiri; ringkasan artikel yang telah dibaca; bantuan kode program pendukung; ilustrasi yang bukan data hasil penelitian'],
    ['C\nDengan persetujuan pembimbing', 'Diizinkan hanya dengan persetujuan tertulis pembimbing sebelum digunakan, diungkapkan, dan diuraikan dalam bab metodologi', 'AI untuk anotasi data, data sintetis, atau ekstraksi informasi; model AI sebagai objek atau komponen sistem yang diteliti; pembangkitan kode inti artefak; analisis data dengan bantuan AI'],
    ['D\nDilarang', 'Tidak diizinkan dalam keadaan apa pun', 'Menyerahkan keluaran AI sebagai karya sendiri tanpa kontribusi orisinal; fabrikasi atau manipulasi data, hasil, gambar, dan tabel; rujukan fiktif; AI sebagai penulis atau rujukan; AI saat ujian tanpa izin; memasukkan data rahasia ke layanan AI publik; menyamarkan plagiarisme'],
  ], [1700, 2500, TEXT_W - 4200], { size: 20 }),
  ...blank(1, 360),
  P('Penggunaan yang tidak tercantum dalam tabel tersebut diperlakukan sebagai kategori C sehingga mahasiswa wajib berkonsultasi dengan pembimbing sebelum menggunakannya.'),
  P('Pengungkapan penggunaan kategori B dan C memuat delapan unsur, yaitu (1) nama alat dan penyedia, (2) versi atau model, (3) tanggal atau rentang waktu penggunaan, (4) tujuan penggunaan, (5) bagian tesis yang dibantu, (6) *prompt* kunci, (7) keluaran yang dipakai dan tingkat penyuntingannya, serta (8) cara verifikasi. Pengungkapan tersebut diletakkan pada tempat-tempat berikut:'),
  ...list([
    '**Halaman Pernyataan Penggunaan AI Generatif** pada bagian persiapan tesis, tepat setelah halaman pernyataan keaslian (Subbab IV.4 dan Lampiran H). Mahasiswa yang tidak menggunakan AI generatif tetap mengisi pernyataan nihil.',
    '**Lampiran log** ***prompt*** sebagai lampiran terakhir tesis, yang memuat *prompt* kunci dan keluaran yang dipakai (contoh format pada Lampiran H).',
    '**Bab metodologi**, untuk penggunaan kategori C, yang menguraikan nama dan versi model, konfigurasi atau parameter, *prompt*, prosedur validasi, dan keterbatasannya sehingga penelitian dapat direplikasi.',
    '**Judul gambar atau tabel**, apabila gambar atau tabel dibuat atau dimodifikasi dengan bantuan AI (Subbab VII.6).',
  ], 'alpha'),
  P('Mahasiswa bertanggung jawab penuh atas seluruh isi tesis, termasuk bagian yang dibantu AI, dan harus mampu menjelaskan serta mempertahankan seluruh isinya, termasuk kode program, tanpa bantuan AI pada saat ujian. Mahasiswa menyimpan riwayat penggunaan AI sejak penyusunan proposal hingga yudisium, karena riwayat tersebut dapat diminta oleh pembimbing, penguji, atau tim pemeriksa. Pernyataan Penggunaan AI Generatif yang telah ditandatangani pembimbing dilampirkan pada saat pendaftaran seminar proposal, seminar hasil, dan sidang tesis.'),
  P(`Penggunaan AI yang tidak diungkapkan, pengungkapan yang tidak sesuai dengan kenyataan, atau penggunaan kategori D diperlakukan sebagai pelanggaran integritas akademik dan ditangani sesuai ${PANDUAN} dan peraturan akademik Universitas Langlangbuana.`),
];

module.exports = { bab1, bab2, bab3, bab4, bab5, bab6, bab7, bab8, PANDUAN };
