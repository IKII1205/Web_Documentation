---
title: OcNOS
parent: Open Optical Network
author: Muhammad Rizki Akbar 
nav_order: 1
---

---
# Dokumentasi Konfigurasi Perangkat Cassini dan Software OcNOS
---

![Konfigurasi IP OcNOS]({{ site.baseurl }}/assets/images/hardware/cassini.png)

---

## Pendahuluan

Pada bagian ini, kita akan membahas **software OcNOS** yang telah terpasang pada perangkat **Cassini (Edgecore AS7716-24SC)**.  
Software OcNOS berperan sebagai sistem operasi jaringan (Network Operating System) yang digunakan untuk mengelola fungsi-fungsi switching, routing, dan manajemen jaringan secara keseluruhan.

Sebelum melanjutkan, kamu dapat membaca pengantar terkait perangkat **Cassini dan DCSG** pada halaman berikut:  
--> [Cassini & DCSG]({{ site.baseurl }}{% link docs/Open Optical Network/Cassini & DCSG.md %})

---

## Versi Perangkat dan Software OcNOS

Berikut adalah contoh hasil output perintah `show version` yang menunjukkan versi perangkat Cassini dan software OcNOS yang digunakan:

```bash
OcNOS(config)#do show version
Software version: EC_AS7716-24SC-OcNOS-1.1.0.2-OTN_IPBASE-S0-P0 11/24/2020 16:18:11
Copyright (C) 2020 IP Infusion. All rights reserved

Software Product: OcNOS, Version: 1.1.0.2  ( ini merupakan versi lawas, karena saat ini ocnos sudah berada pada versi 6.x )
Hardware Model: Edgecore 7716-24SC-O-AC-F
Software Feature Code: OTN-IPBASE
System Configuration Code: S0
Package Configuration Code: P0
Software Baseline Version: 1.3.8.80

Installation Information:
Image Filename: EC_AS7716_24SC-OcNOS-1.1.0.2-OTN_IPBASE-S0-P0-installer
Install method: ftp
ONIE SysInfo: x86_64-accton_as7716_24sc-r0
```
Dari informasi di atas menunjukkan bahwa perangkat Cassini menggunakan sistem operasi OcNOS versi 1.1.0.2, dengan paket fitur OTN-IPBASE, dan instalasi dilakukan melalui metode FTP.

---

## Metode FTP (File Transfer Protocol) 
Merupakan salah satu cara untuk mengirim file instalasi NOS (Network Operating System). dalam konteks instalasi Cassini adalah mekanisme pull (menarik) yang dijalankan oleh bootloader perangkat, yang mana memiliki peran:

### Peran Protokol (FTP)
FTP adalah protokol standar di internet yang tugasnya murni mentransfer file. Dalam kasus ini:

-> FTP Server: Merupakan laptop (Ubuntu) atau server lain di jaringan yang menyimpan file instalasi OcNOS (NOS installer).

-> FTP Client: Merupakan perangkat Cassini, yang berjalan di bawah lingkungan instalasi ONIE (Open Network Install Environment).

### Proses Instalasi Cassini
Saat Cassini pertama kali dihidupkan (Initial System Boot) dan masuk ke ONIE, langkah selanjutnya adalah:

-> ONIE Mencari: ONIE akan secara otomatis mencari server jaringan terdekat untuk menemukan file instalasi NOS yang kompatibel.

-> ONIE Menggunakan FTP: Setelah ONIE menemukan server yang menyimpan image OcNOS, ONIE akan menggunakan protokol FTP untuk menarik (download) file instalasi tersebut dari server.

-> Instalasi: Setelah file OcNOS selesai diunduh ke memori internal Cassini, ONIE akan mengeksekusi installer tersebut dan memasang OcNOS.

### Kelebihan FTP
Sederhana: Lebih mudah diatur dibandingkan protokol lain (seperti SFTP yang terenkripsi).

Universal: Hampir semua sistem operasi, termasuk bootloader perangkat jaringan, mendukung klien FTP standar.

Intinya: Metode FTP hanyalah jalur yang digunakan Cassini untuk mendapatkan file OcNOS dari laptop/server-mu, sebelum file itu dipasang secara permanen oleh ONIE.

---
##  Kumpulan Datasheet Cassini

Berikut beberapa datasheet Cassini yang bisa langsung kamu lihat di halaman ini 


###  Datasheet OcNOS Data Center - November 2023  
[Klik untuk lihat datasheet](https://www.stordis.com/wp-content/uploads/2019/08/Edgecore-Cassini-AS7716-24SC-V5.pdfv)
Datasheet ini menjelaskan spesifikasi lengkap perangkat keras Cassini, termasuk jumlah port, tipe antarmuka optik, daya listrik, dan fitur manajemen yang tersedia.



##  Kumpulan Datasheet OcNOS

Berikut beberapa datasheet OcNOS yang bisa langsung kamu lihat di halaman ini 


###  Datasheet OcNOS Data Center - November 2023  
[Klik untuk lihat datasheet](https://psitec.com/assets/ipinfusion-dc-11-23-IPI-OcNOS-6.4-DC-Datasheet-v4.pdf) Berisi deskripsi fitur-fitur utama OcNOS versi 6.4, seperti dukungan untuk protokol data center, manajemen lalu lintas jaringan, dan otomatisasi berbasis API.

###  Datasheet OcNOS Data Center - Februari 2025  
[Klik untuk lihat datasheet](https://stordis.com/wp-content/uploads/2025/04/OcNOS_DC_Datasheet_.6.6-1.pdf) Merupakan versi terbaru dengan pembaruan pada efisiensi routing dan dukungan arsitektur multi-fabric.

###  OcNOS SP Carrier Ethernet Guide
[Klik untuk lihat datasheet](https://espalobi.sirv.com/product-documentation/ocnos-sp/6.4/ocnos-sp-carrier-ethernet-guide.pdf)Dokumen panduan untuk konfigurasi dan manajemen jaringan Carrier Ethernet berbasis OcNOS.

---

## Tahapan Awal Konfigurasi OcNOS
Berikut contoh langkah untuk keluar dari mode konfigurasi dan login ulang ke perangkat:

```bash
OcNOS(config)#exit
OcNOS#exit
OcNOS>logout
Welcome to OcNOS
OcNOS login:
```
Tips:
Setelah login, kamu akan masuk ke User EXEC mode, yang memungkinkan kamu menjalankan perintah dasar sebelum masuk ke mode konfigurasi penuh.

---
## Mode dan Command Dasar OcNOS

Beberapa perintah dasar yang sering digunakan saat konfigurasi OcNOS adalah sebagai berikut:

---

Masuk dari User EXEC mode ke Privileged EXEC mode (mode enable).

```bash
OcNOS>en
```
---
Masuk ke Global Configuration mode untuk melakukan perubahan konfigurasi sistem.

```bash
OcNOS#conf t
```
---
Menampilkan versi software OcNOS yang sedang digunakan.

```bash
OcNOS(config)#do show version
```
---
Menampilkan daftar interface yang berstatus aktif (up).


```bash
OcNOS(config)#show interface brief | include up
```
---
## Interface yang ada pada cassini 
Berikut adalah hasil perintah show interface brief yang menunjukkan daftar interface yang tersedia pada perangkat Cassini beserta statusnya:

| Interface       | IP-Address   | Admin-Status | Link-Status |
|-----------------|--------------|---------------|--------------|
| ce1/1           | unassigned   | up            | down         |
| ce1/2           | unassigned   | up            | down         |
| ce1/3           | unassigned   | up            | down         |
| ce1/4           | unassigned   | up            | down         |
| ce2/1           | unassigned   | up            | down         |
| ce2/2           | unassigned   | up            | down         |
| ce2/3           | unassigned   | up            | down         |
| ce2/4           | unassigned   | up            | down         |
| ce3/1           | unassigned   | up            | down         |
| ce3/2           | unassigned   | up            | down         |
| ce3/3           | unassigned   | up            | down         |
| ce3/4           | unassigned   | up            | down         |
| ce4/1           | unassigned   | up            | down         |
| ce4/2           | unassigned   | up            | down         |
| ce4/3           | unassigned   | up            | down         |
| ce4/4           | unassigned   | up            | down         |
| ce5/1           | unassigned   | up            | down         |
| ce5/2           | unassigned   | up            | down         |
| ce5/3           | unassigned   | up            | down         |
| ce5/4           | unassigned   | up            | down         |
| ce6/1           | unassigned   | up            | down         |
| ce6/2           | unassigned   | up            | down         |
| ce6/3           | unassigned   | up            | down         |
| ce6/4           | unassigned   | up            | down         |
| ce7/1           | unassigned   | up            | down         |
| ce7/2           | unassigned   | up            | down         |
| ce7/3           | unassigned   | up            | down         |
| ce7/4           | unassigned   | up            | down         |
| ce8/1           | unassigned   | up            | down         |
| ce8/2           | unassigned   | up            | down         |
| ce8/3           | unassigned   | up            | down         |
| ce8/4           | unassigned   | up            | down         |
| ce9/1           | unassigned   | up            | down         |
| ce9/2           | unassigned   | up            | down         |
| ce9/3           | unassigned   | up            | down         |
| ce9/4           | unassigned   | up            | down         |
| ce10/1          | unassigned   | up            | down         |
| ce10/2          | unassigned   | up            | down         |
| ce10/3          | unassigned   | up            | down         |
| ce10/4          | unassigned   | up            | down         |
| ce11/1          | unassigned   | up            | down         |
| ce11/2          | unassigned   | up            | down         |
| ce11/3          | unassigned   | up            | down         |
| ce11/4          | unassigned   | up            | down         |
| ce12/1          | unassigned   | up            | down         |
| ce12/2          | unassigned   | up            | down         |
| ce12/3          | unassigned   | up            | down         |
| ce12/4          | unassigned   | up            | down         |
| ce13/1          | unassigned   | up            | down         |
| ce13/2          | unassigned   | up            | down         |
| ce13/3          | unassigned   | up            | down         |
| ce13/4          | unassigned   | up            | down         |
| ce14/1          | unassigned   | up            | down         |
| ce14/2          | unassigned   | up            | down         |
| ce14/3          | unassigned   | up            | down         |
| ce14/4          | unassigned   | up            | down         |
| ce15/1          | unassigned   | up            | down         |
| ce15/2          | unassigned   | up            | down         |
| ce15/3          | unassigned   | up            | down         |
| ce15/4          | unassigned   | up            | down         |
| ce16/1          | unassigned   | up            | down         |
| ce16/2          | unassigned   | up            | down         |
| ce16/3          | unassigned   | up            | down         |
| ce16/4          | unassigned   | up            | down         |
| ce17            | unassigned   | up            | down         |
| ce18            | unassigned   | up            | down         |
| ce19            | unassigned   | up            | down         |
| ce20            | unassigned   | up            | down         |
| ce21            | unassigned   | up            | down         |
| ce22            | unassigned   | up            | down         |
| ce23            | unassigned   | up            | down         |
| ce24            | unassigned   | up            | down         |
| ce25            | unassigned   | up            | down         |
| ce26            | unassigned   | up            | down         |
| ce27            | unassigned   | up            | down         |
| ce28            | unassigned   | up            | down         |
| ce29            | unassigned   | up            | down         |
| ce30            | unassigned   | up            | down         |
| ce31            | unassigned   | up            | down         |
| ce32            | unassigned   | up            | down         |
| eth0            | 10.30.1.131  | up            | down         |
| lo              | 127.0.0.1    | up            | up           |
| lo.management   | 127.0.0.1    | up

Keterangan:

-> Admin Status menunjukkan apakah interface diaktifkan oleh sistem.

-> Link Status menunjukkan apakah interface fisik terhubung ke perangkat lain.

-> eth0 biasanya digunakan untuk koneksi manajemen.

-> lo dan lo.management adalah interface loopback internal sistem.

---

