---
title: Smartfarm
parent: IOT
author: Muhammad Rizki Akbar
nav_order: 3
---

# Smartfarm

## Gambaran singkat
Dokumentasi ini menjelaskan sistem smart farming yang menggunakan dua sensor utama, yaitu [DHT22](DHT22.md) dan [RS485 7-in-1 Soil Sensor](RS485_7in1soilsensor.md). Keduanya dipakai bersama ESP32 dan Blynk untuk memantau kondisi lingkungan dan kondisi tanah secara real time.

Secara sederhana, DHT22 dipakai untuk membaca suhu dan kelembapan udara, sedangkan RS485 7-in-1 Soil Sensor dipakai untuk membaca kondisi tanah seperti kelembapan tanah, suhu tanah, EC, pH, nitrogen, fosfor, dan kalium. Kombinasi keduanya cocok untuk sistem monitoring pertanian yang membutuhkan data udara dan data tanah sekaligus.

## Perangkat yang digunakan
Berikut komponen utama pada sistem ini:

- ESP32 sebagai mikrokontroler utama
- DHT22 untuk membaca suhu dan kelembapan udara
- RS485 7-in-1 Soil Sensor untuk membaca parameter tanah
- modul RS485 to TTL seperti MAX485 untuk komunikasi sensor tanah
- Blynk sebagai platform pemantauan data
- jaringan WiFi untuk mengirim data dari ESP32 ke Blynk

## Apa yang dibaca oleh masing-masing sensor
Sensor DHT22 hanya membaca dua parameter:

- suhu udara
- kelembapan udara

Sensor ini cocok untuk memantau kondisi sekitar tanaman, rumah kaca, atau ruang tanam. Data dari DHT22 membantu melihat apakah lingkungan terlalu panas, terlalu lembap, atau masih ideal untuk pertumbuhan.

Sensor RS485 7-in-1 Soil Sensor membaca tujuh parameter tanah:

- kelembapan tanah
- suhu tanah
- electrical conductivity atau EC
- pH tanah
- nitrogen (N)
- fosfor (P)
- kalium (K)

Sensor ini digunakan untuk memahami kondisi media tanam dan kebutuhan nutrisi tanaman. Data tanah seperti EC, pH, dan NPK penting untuk analisis kualitas tanah dan pengambilan keputusan pemupukan.

## Alur kerja sistem
Alur kerja sistem smart farming ini secara umum adalah sebagai berikut:

1. ESP32 dinyalakan dan menghubungkan WiFi ke jaringan yang tersedia.
2. DHT22 dibaca melalui pin digital ESP32.
3. ESP32 mengirim request Modbus RTU ke sensor tanah melalui jalur RS485.
4. Data dari kedua sensor diproses dan disiapkan dalam bentuk angka.
5. Data dikirim ke Blynk agar bisa dipantau dari aplikasi atau dashboard.
6. Hasil pembacaan juga ditampilkan di Serial Monitor untuk pengecekan lokal.

## Contoh kode ESP32
Kode berikut memperlihatkan alur pembacaan DHT22 dan sensor RS485 7-in-1 Soil Sensor, lalu mengirimkan hasilnya ke Blynk. Untuk dokumentasi, kredensial WiFi dan token Blynk diganti dengan placeholder agar tidak menyimpan data sensitif di halaman publik.

```cpp
#define BLYNK_TEMPLATE_ID "YOUR_TEMPLATE_ID" 
#define BLYNK_TEMPLATE_NAME "DHT22"
#define BLYNK_AUTH_TOKEN "YOUR_BLYNK_AUTH_TOKEN"
#define BLYNK_PRINT Serial (Dari bagian "BLYNK_TEMPLATE_ID" sampai dengan "BLYNK_PRINT Serial" itu bisa rekan rekan ambil dari website blynk langsung)

#include <WiFi.h>
#include <WiFiClient.h>
#include <BlynkSimpleEsp32.h>
#include <DHT.h>

// ===== KONFIGURASI SENSOR DHT22 =====
#define DHTPIN 4  
#define DHTTYPE DHT22
DHT dht(DHTPIN, DHTTYPE);

// ===== KONFIGURASI RS485 =====
#define RX_PIN 16    
#define TX_PIN 17  
#define RE_DE_PIN 5 

// ===== KONFIGURASI WIFI =====
const char* ssid = "YOUR_WIFI_SSID";
const char* pass = "YOUR_WIFI_PASSWORD";

// ===== MODBUS REQUEST FRAME RS485 =====
const byte requestFrame[] = {0x01, 0x03, 0x00, 0x00, 0x00, 0x07, 0x04, 0x08};
byte responseFrame[19];

float humidity_dht = 0, temperature_dht = 0;
float soil_moisture = 0, soil_temperature = 0, soil_ph = 0;
int soil_ec = 0, nitrogen = 0, phosphorus = 0, potassium = 0;

void setup() {
  Serial.begin(9600);
  dht.begin();
  
  // Coba ganti ke 9600 jika 4800 tetap "Byte: 0"
  Serial2.begin(4800, SERIAL_8N1, RX_PIN, TX_PIN);
  
  pinMode(RE_DE_PIN, OUTPUT);
  digitalWrite(RE_DE_PIN, LOW);
  
  Serial.println("\n\n====================================");
  Serial.println("Inisialisasi ESP32 IoT Sensor");
  Serial.println("====================================");
  
  // Perbaikan cara panggil Blynk agar tidak error port
  Blynk.begin(BLYNK_AUTH_TOKEN, ssid, pass);
}

void loop() {
  if (Blynk.connected()) {
    Blynk.run();
  }
  
  readDHT22();
  readRS485();
  sendDataToBlynk();
  printSensorData();
  
  delay(3000);
}

void readDHT22() {
  humidity_dht = dht.readHumidity();
  temperature_dht = dht.readTemperature();
  if (isnan(humidity_dht) || isnan(temperature_dht)) {
    Serial.println("✗ Gagal membaca sensor DHT22!");
  }
}

void readRS485() {
  while (Serial2.available()) { Serial2.read(); }
  
  digitalWrite(RE_DE_PIN, HIGH);
  delay(10);
  Serial2.write(requestFrame, sizeof(requestFrame));
  Serial2.flush();
  digitalWrite(RE_DE_PIN, LOW);
  
  delay(500); // Ditambah sedikit biar sensor sempat mikir
  
  if (Serial2.available() >= 19) {
    for (int i = 0; i < 19; i++) {
      responseFrame[i] = Serial2.read();
    }
    
    if (responseFrame[0] == 0x01 && responseFrame[1] == 0x03) {
      soil_moisture = ((responseFrame[3] << 8) | responseFrame[4]) / 10.0;
      soil_temperature = ((responseFrame[5] << 8) | responseFrame[6]) / 10.0;
      soil_ec = (responseFrame[7] << 8) | responseFrame[8];
      soil_ph = ((responseFrame[9] << 8) | responseFrame[10]) / 10.0;
      nitrogen = (responseFrame[11] << 8) | responseFrame[12];
      phosphorus = (responseFrame[13] << 8) | responseFrame[14];
      potassium = (responseFrame[15] << 8) | responseFrame[16];
    }
  } else {
    Serial.print("⚠ RS485 tidak merespon. Byte diterima: ");
    Serial.println(Serial2.available());
  }
}

void sendDataToBlynk() {
  if (Blynk.connected()) {
    Blynk.virtualWrite(V0, humidity_dht);
    Blynk.virtualWrite(V1, temperature_dht);
    Blynk.virtualWrite(V2, soil_moisture);
    Blynk.virtualWrite(V3, soil_temperature);
    Blynk.virtualWrite(V4, soil_ec);
    Blynk.virtualWrite(V5, soil_ph);
    Blynk.virtualWrite(V6, nitrogen);
    Blynk.virtualWrite(V7, phosphorus);
    Blynk.virtualWrite(V8, potassium);
  }
}

void printSensorData() {
  Serial.println("\n--------- DATA SENSOR DHT22 ---------");
  Serial.print("Humidity  : "); Serial.print(humidity_dht); Serial.println(" %");
  Serial.print("Temperature : "); Serial.print(temperature_dht); Serial.println(" °C");
  
  Serial.println("\n--------- DATA SENSOR RS485 ---------");
  Serial.print("Soil Moisture : "); Serial.print(soil_moisture); Serial.println(" %");
  Serial.print("Soil Temperature : "); Serial.print(soil_temperature); Serial.println(" °C");
  Serial.print("Soil EC : "); Serial.print(soil_ec); Serial.println(" us/cm");
  Serial.print("Soil pH : "); Serial.println(soil_ph);
  Serial.print("Nitrogen (N) : "); Serial.print(nitrogen); Serial.println(" mg/kg");
  Serial.print("Phosphorus (P) : "); Serial.print(phosphorus); Serial.println(" mg/kg");
  Serial.print("Potassium (K) : "); Serial.print(potassium); Serial.println(" mg/kg");
  Serial.println("\n========================================\n");
}

BLYNK_CONNECTED() {
  Serial.println("✓ Connected to Blynk Server!");
}
```

Penjelasan ringkas alur kode:

- DHT22 dibaca lewat library DHT dan menghasilkan suhu serta kelembapan udara
- RS485 dibaca lewat Serial2 menggunakan frame Modbus RTU
- data sensor tanah dipetakan ke variabel moisture, temperature, EC, pH, N, P, dan K
- hasil pembacaan dikirim ke Blynk menggunakan virtual pin V0 sampai V8
- Serial Monitor dipakai untuk debugging dan melihat nilai sensor secara lokal

## Penjelasan singkat tiap sensor
### DHT22
DHT22 adalah sensor digital untuk membaca suhu dan kelembapan udara. Sensor ini mudah digunakan, cukup satu jalur data, dan sangat umum pada proyek IoT. Untuk penjelasan yang lebih lengkap tentang cara kerja, wiring, dan karakteristiknya, buka halaman [DHT22.md](DHT22.md).

### RS485 7-in-1 Soil Sensor
RS485 7-in-1 Soil Sensor adalah sensor tanah industri yang membaca parameter tanah secara lengkap melalui komunikasi RS485 Modbus RTU. Sensor ini lebih tahan terhadap gangguan dan cocok untuk instalasi jarak menengah hingga jauh. Untuk penjelasan detail mengenai parameter, protokol, wiring, dan catatan teknisnya, buka halaman [RS485_7in1soilsensor.md](RS485_7in1soilsensor.md).

## Ringkasan pembacaan data pada kode
Berdasarkan kode yang digunakan, pembacaan data dilakukan dengan cara berikut:

- DHT22 dibaca memakai library DHT dan hasilnya disimpan ke variabel humidity_dht dan temperature_dht
- sensor tanah dibaca melalui Serial2 dengan frame Modbus RTU yang dikirim ke alamat register sensor
- hasil balasan sensor tanah diproses menjadi nilai moisture, temperature, EC, pH, nitrogen, phosphorus, dan potassium
- semua data dikirim ke Blynk lewat virtual pin V0 sampai V8

## Struktur data yang dikirim ke Blynk
Data yang dikirim ke Blynk pada sistem ini adalah:

- V0: kelembapan udara dari DHT22
- V1: suhu udara dari DHT22
- V2: kelembapan tanah
- V3: suhu tanah
- V4: EC tanah
- V5: pH tanah
- V6: nitrogen
- V7: fosfor
- V8: kalium

Dengan struktur ini, pengguna bisa memantau kondisi udara dan tanah dalam satu dashboard.

## Kesimpulan
Sistem smart farming ini menggabungkan sensor udara dan sensor tanah agar pemantauan menjadi lebih lengkap. DHT22 memberi informasi tentang kondisi lingkungan sekitar tanaman, sedangkan RS485 7-in-1 Soil Sensor memberi gambaran yang lebih detail tentang kondisi media tanam. Jika ingin memahami masing-masing sensor lebih dalam, lanjutkan ke [DHT22.md](DHT22.md) dan [RS485_7in1soilsensor.md](RS485_7in1soilsensor.md).
