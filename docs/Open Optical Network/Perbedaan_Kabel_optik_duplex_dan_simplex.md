---
title: Perbedaan kabel optik simplex dan duplex
parent: Open Optical Network
author: Muhammad Rizki Akbar 
nav_order: 6
---

# Perbedaan Kabel Optik: Simplex vs Duplex

## Pengertian Singkat
Kabel optik (*fiber optic*) adalah media transmisi yang menggunakan serat kaca atau plastik untuk meneruskan sinyal berupa cahaya. Kabel ini memungkinkan pengiriman data berkecepatan tinggi dan jarak jauh dengan gangguan elektromagnetik yang sangat rendah.

Dalam konteks koneksi data, istilah *simplex* dan *duplex* merujuk pada arah aliran sinyal:
- **Simplex:** Komunikasi satu arah saja (A → B).
- **Duplex:** Komunikasi dua arah. Terbagi menjadi:
  - *Half-duplex:* Kedua arah tetapi bergantian (A ↔ B tidak simultan).
  - *Full-duplex:* Kedua arah secara simultan (A ↔ B bersamaan secara paralel).

---

## Struktur Fisik & Cara Kerja
- **Kabel Optik Simplex:** Hanya memiliki satu inti serat (*single core*). Sangat cocok untuk aplikasi yang hanya membutuhkan pengiriman data satu arah (misalnya sensor telemetri satu arah).
- **Kabel Optik Duplex:** Memiliki dua inti serat (*dual core* / zipcord) — satu untuk jalur kirim (TX) dan satu untuk jalur terima (RX) — sehingga mendukung komunikasi dua arah simultan.

Secara ringkas:
- **Simplex** = 1 serat = 1 arah.
- **Duplex** = 2 serat = 2 arah (simultan).

---

## Perbandingan Kelebihan & Kekurangan

### Kelebihan Kabel Optik secara Umum:
- Bandwidth sangat besar (cocok untuk data kecepatan tinggi).
- Kebal terhadap interferensi gelombang elektromagnetik (*EMI*).
- Sangat aman dari penyadapan fisik konvensional.
- Bobot ringan dan dimensi kabel relatif kecil.

### Kekurangan Kabel Optik:
- Rentan patah jika ditekuk melebihi batas radius tekukan (*bending radius*).
- Pemasangan dan *splicing* memerlukan alat khusus (*fusion splicer*).
- Tidak dapat mengalirkan daya listrik (*non-conductive*).

### Perbedaan Simplex vs Duplex:
- **Simplex:** Biaya lebih hemat, instalasi kabel lebih tipis/sederhana, cocok untuk komunikasi searah.
- **Duplex:** Menghubungkan komunikasi dua arah penuh dengan throughput tinggi, memerlukan 2 konektor (misal LC Duplex / SC Duplex).

---

## Contoh Penggunaan
- **Simplex:** Sistem sensor/telemetri yang hanya memancarkan data ke stasiun penerima.
- **Duplex (Full-Duplex):** Interkoneksi switch-to-switch, router-to-server, dan modul transceiver optik (SFP/SFP+/QSFP).

---

## Praktik Terbaik Instalasi
- Hindari menekuk kabel melebihi batas kelengkungan minimum (*minimum bend radius*).
- Gunakan konektor dan sambungan (*splice*) berkualitas, serta selalu bersihkan ujung ferrule sebelum dicolokkan untuk menghindari *insertion loss*.
- Beri label (*tagging*) yang jelas pada serat TX dan RX agar tidak tertukar saat patching.
- Gunakan pelindung tambahan (*armored fiber / conduit*) untuk penanaman kabel di luar ruangan (*outdoor*).

---

## Kesimpulan
Pilih **Simplex** jika kebutuhan transmisi hanya satu arah dan ingin solusi paling hemat. Pilih **Duplex** untuk komunikasi jaringan dua arah dengan keandalan dan fleksibilitas performa tinggi.
