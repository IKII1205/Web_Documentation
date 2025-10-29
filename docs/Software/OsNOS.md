---
title: OcNOS
parent: Software
author: Muhammad Rizki Akbar 
nav_order: 1
---

# Versi dari Cassini — Edgecore AS7716-24SC dan OcNOS yang digunakan
```bash
OcNOS(config)#do show version
Software version: EC_AS7716-24SC-OcNOS-1.1.0.2-OTN_IPBASE-S0-P0 11/24/2020 16:18
:11
 Copyright (C) 2020 IP Infusion. All rights reserved

 Software Product: OcNOS, Version: 1.1.0.2
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


# 📘 Kumpulan Datasheet OcNOS

Berikut beberapa datasheet OcNOS yang bisa langsung kamu lihat di halaman ini 👇


### 🧩 Datasheet OcNOS Data Center - November 2023  
[Klik untuk lihat datasheet](https://psitec.com/assets/ipinfusion-dc-11-23-IPI-OcNOS-6.4-DC-Datasheet-v4.pdf)

### 🧩 Datasheet OcNOS Data Center - Februari 2025  
[Klik untuk lihat datasheet](https://stordis.com/wp-content/uploads/2025/04/OcNOS_DC_Datasheet_.6.6-1.pdf)

### 🧩 OcNOS SP Carrier Ethernet Guide
[Klik untuk lihat datasheet](https://espalobi.sirv.com/product-documentation/ocnos-sp/6.4/ocnos-sp-carrier-ethernet-guide.pdf)


# Ini merupakan langkah awal untuk melakukan konfigurasi

```bash
OcNOS(config)#exit
OcNOS#exit
OcNOS>logout
Welcome to OcNOS
OcNOS login:
```

# Command yang digunakan pada saat melakukan konfigurasi pada OcNOS
```bash
OcNOS>en
```
command ini digunakan untuk masuk dari mode User EXEC ke mode Privileged EXEC (mode enable).

```bash
OcNOS#conf t
```

```bash
OcNOS(config)#do show version
``` 

```bash
OcNOS(config)#show interface brief | include up
```

# Kalau mau liat mana aja port yang terhubung 
```bash
OcNOS(config)#show interface brief | include up
```

# Interface yang ada pada cassini 

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



