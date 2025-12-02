---
title: Perbedaan kabel optik simplex dan duplex
parent: Research
author: Muhammad Rizki Akbar 
nav_order: 1
---

# Perbedaan Kabel Optik: Simplex vs Duplex

## Pengertian singkat
Kabel optik (fiber optik) adalah media transmisi yang menggunakan kaca atau plastik untuk meneruskan sinyal berupa cahaya. Kabel ini memungkinkan pengiriman data berkecepatan tinggi dan jarak jauh dengan gangguan elektromagnetik yang sangat rendah.

Dalam konteks koneksi data, istilah *simplex* dan *duplex* merujuk pada cara aliran sinyal:
- Simplex: komunikasi satu arah saja (A → B).
- Duplex: komunikasi dua arah. Ada dua jenis duplex:
  - Half-duplex: kedua arah tetapi tidak bersamaan (A ↔ B bergantian).
  - Full-duplex: kedua arah secara bersamaan (A ↔ B secara paralel).

---

## Struktur fisik & cara kerja
- Kabel optik simplex biasanya hanya memiliki satu serat inti. Cocok untuk aplikasi yang hanya membutuhkan transmisi satu arah (mis. satu arah telemetry).
- Kabel optik duplex memiliki dua serat inti — satu untuk masing-masing arah — sehingga mendukung komunikasi dua arah tanpa harus bergantian.

Secara ringkas:
- Simplex = 1 serat = 1 arah.
- Duplex = 2 serat = 2 arah (simultan).

---

## Kelebihan dan kekurangan (perbandingan)

Kelebihan kabel optik secara umum:
- Bandwidth sangat besar → cocok untuk data berkecepatan tinggi.
- Imunitas terhadap noise elektromagnetik.
- Aman karena sulit disadap dan tidak membawa arus listrik.
- Ringan dan relatif kecil dibandingkan kabel tembaga.

Kekurangan kabel optik:
- Rentan terhadap kerusakan mekanis bila tidak ditangani hati-hati.
- Instalasi dan penyambungan memerlukan keterampilan khusus.
- Tidak dapat menyalurkan energi listrik.
- Biaya material dan alat sambung relatif lebih tinggi.

Perbedaan simplex vs duplex:
- Simplex: lebih murah, lebih sederhana, cocok untuk link satu arah.
- Duplex: fleksibel untuk komunikasi dua arah; butuh dua jalur fisik, sedikit lebih mahal dan lebih besar ukurannya.

---

## Contoh penggunaan
- Simplex: sistem monitoring sensor yang hanya mengirim data ke pusat (data flow satu arah).
- Duplex (full-duplex): link jaringan antara switch/router atau perangkat yang saling bertukar data simultan.
- Duplex (half-duplex): beberapa sistem radio/data legacy yang bergantian kirim-terima.

---

## Instalasi dan praktik terbaik
- Hindari menekuk serat melebihi radius minimum (baca datasheet), karena dapat menyebabkan loss.
- Gunakan connector dan splice berkualitas; pembersihan konektor penting untuk menghindari refleksi dan loss.
- Label setiap serat dengan jelas sehingga arah transmisi diketahui (penting untuk duplex).
- Gunakan pelindung (armoring) atau ducting jika kabel ditanam atau di-area luar ruangan.


## Referensi & bacaan lanjutan
-> [datasheet YSP96](https://www.bing.com/search?qs=UT&pq=apa+itu+kabel+serat+opti&sk=CSYN1&sc=15-24&pglt=2339&q=apa+itu+kabel+serat+optik&cvid=f2378f89e53d48a8a2a79318c4ca0fd2&gs_lcrp=EgRlZGdlKgYIABAAGEAyBggAEAAYQDIGCAEQABhAMgYIAhAAGEAyBggDEAAYQDIGCAQQABhAMgYIBRAAGEAyBggGEAAYQDIGCAcQABhAMgYICBAAGEDSAQg2MDk0ajBqMagCALACAA&FORM=ANNTA1&PC=ASTS)

---
Kesimpulan: Pilih simplex jika kebutuhan hanya satu arah dan ingin solusi sederhana/hemat. Pilih duplex untuk komunikasi dua arah (kinerja dan fleksibilitas lebih baik), terutama pada infrastruktur jaringan.









