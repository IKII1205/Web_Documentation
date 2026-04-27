---
title: DHT22 Sensor
parent: IOT
author: Muhammad Rizki Akbar 
nav_order: 1
---

# DHT22 Sensor


## Ringkasan
DHT22 adalah sensor yang digunakan untuk mengukur suhu dan kelembapan udara. Sensor ini banyak dipakai pada proyek Internet of Things karena mudah dihubungkan ke mikrokontroler seperti ESP32, Arduino, dan ESP8266.

Berbeda dengan sensor suhu sederhana, DHT22 bisa membaca dua data sekaligus, yaitu:

- suhu udara
- kelembapan udara

Sensor ini cocok untuk pemantauan ruangan, rumah kaca, sistem cuaca sederhana, dan proyek otomatisasi yang membutuhkan pembacaan kondisi lingkungan.

## Cara kerja DHT22
DHT22 bekerja dengan cara membaca kondisi udara di sekitarnya melalui elemen pengukur internal. Di dalam sensor ini terdapat komponen untuk mendeteksi kelembapan dan suhu, lalu hasil pengukuran diubah menjadi data digital.

Alur kerjanya secara sederhana adalah:

1. Mikrokontroler mengirim permintaan data ke sensor.
2. DHT22 memproses pembacaan suhu dan kelembapan.
3. Sensor mengirimkan data digital melalui satu pin data.
4. ESP32 atau mikrokontroler membaca data tersebut dan menampilkannya di serial monitor, LCD, atau sistem lain.

Karena data dikirim secara digital, pembacaan sensor ini lebih mudah dibanding sensor analog. Namun, DHT22 memiliki jeda pembacaan yang tidak terlalu cepat, sehingga cocok untuk monitoring berkala, bukan pembacaan sangat cepat.

## Inti pembahasan
Hal penting yang perlu diketahui tentang DHT22 adalah:

- dapat membaca suhu dan kelembapan
- menggunakan satu jalur data digital
- mudah dipakai pada proyek IoT
- membutuhkan waktu jeda antar pembacaan
- hasil pembacaannya cukup stabil untuk pemantauan lingkungan

## Contoh penggunaan dengan ESP32
Pada ESP32, DHT22 biasanya dihubungkan ke salah satu pin digital. Setelah itu program akan mengambil data dari sensor, lalu menampilkan nilai suhu dan kelembapan ke serial monitor.

Contoh proses pemakaian:

1. Hubungkan pin VCC ke 3.3V atau 5V sesuai modul.
2. Hubungkan pin GND ke ground.
3. Hubungkan pin DATA ke pin digital ESP32.
4. Jalankan program pembacaan sensor.
5. Baca hasil suhu dan kelembapan dari monitor.

## Kesimpulan
DHT22 adalah sensor yang sederhana, praktis, dan umum dipakai untuk membaca suhu serta kelembapan udara. Cara kerjanya cukup mudah: mikrokontroler meminta data, sensor membaca kondisi lingkungan, lalu mengirim hasilnya dalam bentuk digital. Karena itu DHT22 sangat cocok digunakan pada proyek pemantauan lingkungan berbasis ESP32.