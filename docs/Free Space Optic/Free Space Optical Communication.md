--- 
title: Free Space Optical Communication
parent: Free Space Optic
author: Muhammad Rizki Akbar 
nav_order: 1
permalink: /Hardware/FSO/
---

# Apa itu Free Space Optic

FSO (*Free Space Optics*) merupakan teknologi komunikasi nirkabel optik yang mentransmisikan data melalui udara menggunakan berkas cahaya (sinar laser / inframerah). FSO dapat digunakan untuk komunikasi data:

- Satelit ke penerima darat (ground station)
- Antar satelit (*inter-satellite links*)
- Pemancar di darat ke penerima lain di darat (*terrestrial point-to-point*)

---

## Komponen yang Digunakan

### Transmitter (Pemancar)
1. **KY-008** (Modul Laser Diode)
2. **CHT1230**

### Receiver (Penerima)
1. **Photoresistor (LDR)**
2. **OPT101** (Monolithic Photodiode with On-Chip Transimpedance Amplifier)

---

## Mekanisme Modulasi
1. **PWM** (*Pulse Width Modulation*)
2. **OOK** (*On-Off Keying*)

---

## Cara Kerja FSO

![FSO]({{ site.baseurl }}/assets/images/FSO1.webp)

Sistem FSO terdiri dari tiga blok utama:
- **Pemancar (*Transmitter*):** Terdiri dari *source encoder*, Light Emitting Diode (LED) atau Laser Diode (LD), dan lensa optik/cermin pemfokus.
- **Saluran Transmisi (*Channel*):** Ruang bebas / atmosfer (udara) tempat berkas cahaya merambat.
- **Penerima (*Receiver*):** Terdiri dari lensa pengumpul, fotodetektor (*photodiode*), pengkondisi sinyal/penguat (*amplifier*), dan dekoder.

---

## Keunggulan FSO
- **Akses Internet Berkecepatan Tinggi:** Menyediakan bandwidth lebar untuk lokasi yang sulit dijangkau kabel optik konvensional (*last-mile connectivity*).
- **Bandwidth Sangat Lebar:** Mampu mentransfer data berkecepatan tinggi dalam orde Gbps.
- **Bebas Biaya Lisensi Spektrum:** Beroperasi pada frekuensi optik non-teregulasi, sehingga tidak memerlukan biaya perizinan spektrum seperti gelombang radio (RF).
- **Keamanan Tinggi:** Berkas cahaya yang sangat terfokus (*narrow beam*) sangat sulit disadap atau diintersep.
- **Penerapan Cepat:** Instalasi jauh lebih cepat dan hemat biaya karena tidak memerlukan galian tanah untuk menggelar kabel fiber fisik.
- **Kebal terhadap EMI:** Karena menggunakan medium cahaya, transmisi kebal terhadap interferensi elektromagnetik dan interferensi sinyal radio.

---

## Tantangan & Kekurangan FSO
- **Pengaruh Kondisi Atmosfer:** Kabut tebal (*fog*) adalah peredam sinyal terbesar karena droplet air membiaskan dan menyerap cahaya. Hujan lebat, debu, salju, dan asap juga dapat menurunkan daya sinyal (*attenuation*).
- **Persyaratan Line-of-Sight (LOS):** Jalur antara pemancar dan penerima harus benar-benar bebas rintangan (tidak boleh terhalang pohon, gedung, burung, dsb).
- **Jarak Transmisi Terbatas:** Untuk aplikasi darat, jarak efektif biasanya berkisar dari beberapa ratus meter hingga beberapa kilometer tergantung visibilitas.
- **Stabilitas Penyelarasan (*Alignment*):** Memerlukan akurasi sudut pancaran dan penerimaan yang presisi. Goyangan struktur gedung atau getaran tiang dapat menggeser fokus berkas cahaya.

---

## Referensi & Bacaan Lanjutan
- [Video: Penjelasan Konsep FSO (YouTube)](https://youtu.be/kJyDBmvBVz4?si=fJ9FG1CFXqPB46u_)
- [Jurnal: Free-Space Optical Communication Overview](https://sci-hub.se/https://doi.org/10.1155/2015/945483)
- [Artikel: FSO Advantages & Disadvantages - RF Wireless World](https://www.rfwireless-world.com/terminology/free-space-optics-fso-advantages-disadvantages)
- [Jurnal: FSO Through Atmospheric Turbulence Channels (Stanford)](https://ee.stanford.edu/~jmk/pubs/trans.com.ml.det.turb.pdf)
- [Video: Prinsip Dasar Free-Space Optical (YouTube)](https://youtu.be/K0mqoDKdl-4)
- [Artikel: Sensor Cahaya pada Sistem Optik](https://www.rfwireless-world.com/terminology/light-sensor-advantages-disadvantages)
- [Publikasi Riset: Free Space Optics (ResearchGate)](https://www.researchgate.net/publication/384464261_Free_Space_Optics)

