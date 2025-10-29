---
title: Cara menginstall OcNOS VM
parent: Software
author: Muhammad Rizki Akbar 
nav_order: 1
---


# Cara menginstall OcNOS VM

OcNOS Virtual Machine dari IP Infusion berguna untuk mengenal OcNOS. OCNOS VM berjalan pada lingkungan x86 standar dan dapat digunakan untuk memvalidasi konfigurasi serta menguji fitur L2, L3, dan MPLS tanpa biaya. Tanpa perlu perangkat fisik, OCNOS VM dapat dijalankan pada *hypervisor* populer seperti **KVM, VirtualBox,** dan **VMware**.

Semua fungsionalitas dasar Layer 2, Layer 3, dan multicast tersedia. Dukungan MPLS juga tersedia, termasuk dukungan terbatas untuk penerusan MPLS.

## Manfaat dari VM OcNOS:

• Gratis 

• Tidak perlu menunggu perangkat keras 

• Mendapatkan familiaritas dengan perangkat lunak OcNOS 

• Memvalidasi konfigurasi 

• Menguji fitur L2, L3, dan MPLS tanpa risiko 

• Prototipe operasi jaringan Daftar Fitur CLI untuk fitur-fitur berikut tersedia.

## Fitur :

- ARP  support
- SSH/Telnet
- SNMP
- Debugging and logging
- AAA
- DHCP, DNS

## Fitur pada layer 2 :

- STP/RSTP/MSTP
- BPDU Guard and Root Guard
- VLAN
- Private VLAN
- LACP
- LLDP
- VLAN Interface
- QinQ
- 802.1x

## Fitur pada layer 3:

- IPV4 Routing
- VRF Support
- RIP v2, RIP NG
- BFD with
- BGP
- OSPF v2, OSPF v3
- VRRP

## Fitur MPLS (Multi-Protocol Label Switching)

- MPLS Label Switching
- LDP and RSVP Support
- RSVP FRR
- VPLS with LDP Signaling
- VPWS with 1:1 backup support
- BGP MPLS L3VPN
- MPLS DCI menggunakan VPLS redudancy

## Fitur Multicast

- IGMP
- PIM-SM/SSM/DM
- MSDP Support

 

## Proses instalasi virtual machine

- Siapkan bahan terlebih dahulu:
    - Oracle Virtual box  : [Downloads – Oracle VirtualBox](https://www.virtualbox.org/wiki/Downloads)
    - Install image Ocnos pada link berikut : [OcNOS Virtual Machine (VM) | IP Infusion](https://www.ipinfusion.com/products/ocnos-vm/)
- Buka virtual box , lalu pilih pada bagian New untuk melakukan konfigurasi awal

![Konfigurasi IP OcNOS]({{ site.baseurl }}/assets/images/image-0.png)



- Setelah itu lanjutkan konfigurasi pemasangan
    - Nama : OcNOS-VM
    - Type : Linux
    - Subtype : Ubuntu
    - Version : Ubuntu (64-bit)

![Konfigurasi IP OcNOS]({{ site.baseurl }}/assets/images/image.png)

- Lakukan Konfigurasikan jumlah memori yang akan dialokasikan untuk mesin virtual. Dengan ukuran memori yang

![Konfigurasi IP OcNOS]({{ site.baseurl }}/assets/images/image-1.png)

- Lakukan proses ekstrak file image VM OcNOS

![Konfigurasi IP OcNOS]({{ site.baseurl }}/assets/images/image-2.png)

- Lalu pada “Hard Disk” lakukan konfigurasi seperti yang saya berikan dibawah ini

![Konfigurasi IP OcNOS]({{ site.baseurl }}/assets/images/image-3.png)

![Konfigurasi IP OcNOS]({{ site.baseurl }}/assets/images/image-4.png)

![Konfigurasi IP OcNOS]({{ site.baseurl }}/assets/images/image-5.png)

![Konfigurasi IP OcNOS]({{ site.baseurl }}/assets/images/image-6.png)

- Lalu lakukan konfigurasi untuk display klik kanan pada image> setting> dan pilih vboxVGA

![Konfigurasi IP OcNOS]({{ site.baseurl }}/assets/images/image-13.png)

![Konfigurasi IP OcNOS]({{ site.baseurl }}/assets/images/image-7.png)

![Konfigurasi IP OcNOS]({{ site.baseurl }}/assets/images/image-8.png)

Dan pada bagian display graphis controller akan berubah menjadi VBoxVGA

- Langkah selanjutnya kita set up network untuk virtual box

![Konfigurasi IP OcNOS]({{ site.baseurl }}/assets/images/image-9.png)

Pada pengaturan network untuk adapter 1 gunakan konfigurasi seperti yang sudah saya berikan 

- Langkah selanjutnya dilanjutkan dengan konfigurasi untuk adapter 2, 3, dan 4

![Konfigurasi IP OcNOS]({{ site.baseurl }}/assets/images/image-14.png)

Nah untuk adapter 2, 3, dan 4 itu ngikutin kofigurasi yang saya berikan

- Lanjutkan untuk menambahkan data ports sesuai yang sudah saya buatkan

![Konfigurasi IP OcNOS]({{ site.baseurl }}/assets/images/image-10.png)

- Lalu di lanjut dengan masuk ke dalam Images OcNOS nya masuk dengan
    - Username : ocnos
    - Password : ocnos

![Konfigurasi IP OcNOS]({{ site.baseurl }}/assets/images/image-11.png)

![Konfigurasi IP OcNOS]({{ site.baseurl }}/assets/images/image-12.png)


Dan proses instalasi selesai