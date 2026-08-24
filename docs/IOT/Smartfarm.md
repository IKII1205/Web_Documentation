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
#define BLYNK_AUTH_TOKEN "YOUR_BLYNK_AUTH_TOKEN" (Dari bagian "BLYNK_TEMPLATE_ID" sampai dengan "BLYNK_AUTH_TOKEN" itu bisa rekan rekan ambil dari website blynk langsung)

#define BLYNK_PRINT Serial

#include <WiFi.h>
#include <WiFiClient.h>
#include <BlynkSimpleEsp32.h>
#include <DHT.h>
#include <Wire.h>
#include <LiquidCrystal_I2C.h>

char auth[] = BLYNK_AUTH_TOKEN;
// ===== KONFIGURASI WIFI =====
char* ssid = "YOUR_WIFI_SSID";
char* pass = "YOUR_WIFI_PASSWORD";

#define DHTPIN 4  
#define DHTTYPE DHT22
DHT dht(DHTPIN, DHTTYPE);

#define RX_PIN 16    
#define TX_PIN 17  
#define RE_DE_PIN 5 

LiquidCrystal_I2C lcd(0x27, 20, 4);
BlynkTimer timer;

const byte requestFrame[] = {0x01, 0x03, 0x00, 0x00, 0x00, 0x07, 0x04, 0x08};
byte responseFrame[19];

void bacaSensor() {
  float hum = dht.readHumidity();
  float temp = dht.readTemperature();

  Serial.println("----- Pembacaan Sensor DHT22 -----");

  if (isnan(hum) || isnan(temp)) {
    Serial.println("Gagal membaca sensor DHT22! Cek kabel.");
  } else {
    Serial.print("Humidity: ");
    Serial.print(hum);
    Serial.println(" %");
    Serial.print("Temp: ");
    Serial.print(temp);
    Serial.println(" Celsius");
    
    Blynk.virtualWrite(V1, temp);
    Blynk.virtualWrite(V2, hum);
  }
  Serial.println();

  while (Serial2.available()) {
    Serial2.read();
  }

  digitalWrite(RE_DE_PIN, HIGH);
  delay(10); 

  Serial2.write(requestFrame, sizeof(requestFrame));
  Serial2.flush();

  digitalWrite(RE_DE_PIN, LOW);
  delay(200);

  Serial.println("----- Pembacaan Sensor RS485 -----");
  if (Serial2.available() >= 19) {
    for (int i = 0; i < 19; i++) {
      responseFrame[i] = Serial2.read();
    }
  
    if (responseFrame[0] == 0x01 && responseFrame[1] == 0x03 && responseFrame[2] == 0x0E) {
      
      int humidity = (responseFrame[3] << 8) | responseFrame[4];
      int temperature = (responseFrame[5] << 8) | responseFrame[6];
      int ec = (responseFrame[7] << 8) | responseFrame[8];
      int ph = (responseFrame[9] << 8) | responseFrame[10];
      int nitrogen = (responseFrame[11] << 8) | responseFrame[12];
      int phosphorus = (responseFrame[13] << 8) | responseFrame[14];
      int potassium = (responseFrame[15] << 8) | responseFrame[16];

      float soilHum = humidity / 10.0;
      float soilTemp = temperature / 10.0;
      float soilPh = ph / 10.0;

      Serial.print("Kelembaban (Moisture): "); Serial.print(soilHum); Serial.println(" %");
      Serial.print("Suhu (Temperature)   : "); Serial.print(soilTemp); Serial.println(" C");
      Serial.print("Konduktivitas (EC)   : "); Serial.print(ec); Serial.println(" us/cm");
      Serial.print("pH Tanah             : "); Serial.print(soilPh); Serial.println("");
      Serial.print("Nitrogen (N)         : "); Serial.print(nitrogen); Serial.println(" mg/kg");
      Serial.print("Fosfor (P)           : "); Serial.print(phosphorus); Serial.println(" mg/kg");
      Serial.print("Kalium (K)           : "); Serial.print(potassium); Serial.println(" mg/kg");

      Blynk.virtualWrite(V3, soilTemp);
      Blynk.virtualWrite(V4, soilHum);
      Blynk.virtualWrite(V5, soilPh);
      Blynk.virtualWrite(V6, ec);
      Blynk.virtualWrite(V7, nitrogen);
      Blynk.virtualWrite(V8, phosphorus);
      Blynk.virtualWrite(V9, potassium);

      lcd.clear();
      
      lcd.setCursor(0, 0);
      if (isnan(hum) || isnan(temp)) {
        lcd.print("Udara: Error");
      } else {
        lcd.print("Udara: ");
        lcd.print(temp, 1);
        lcd.print("C ");
        lcd.print(hum, 1);
        lcd.print("%");
      }

      lcd.setCursor(0, 1);
      lcd.print("Tanah: ");
      lcd.print(soilTemp, 1);
      lcd.print("C ");
      lcd.print(soilHum, 1);
      lcd.print("%");

      lcd.setCursor(0, 2);
      lcd.print("pH: ");
      lcd.print(soilPh, 1);
      lcd.print("  EC: ");
      lcd.print(ec);

      lcd.setCursor(0, 3);
      lcd.print("N:");
      lcd.print(nitrogen);
      lcd.print(" P:");
      lcd.print(phosphorus);
      lcd.print(" K:");
      lcd.print(potassium);

    } else {
      Serial.println("Data korup atau frame tidak sesuai.");
      lcd.clear();
      lcd.setCursor(0, 0);
      lcd.print("Error: Data Tanah");
    }
  } else {
    Serial.print("Sensor tidak merespon dengan benar. Byte diterima: ");
    Serial.println(Serial2.available());
    lcd.clear();
    lcd.setCursor(0, 0);
    lcd.print("Error: Sensor Mati");
  }
  
  Serial.println("\n=========================================\n");
}

void setup() {
  Serial.begin(9600); 
  
  dht.begin();
  Serial2.begin(4800, SERIAL_8N1, RX_PIN, TX_PIN);   
  
  pinMode(RE_DE_PIN, OUTPUT);
  digitalWrite(RE_DE_PIN, LOW); 
  
  lcd.init();
  lcd.backlight();
  lcd.setCursor(0, 0);
  lcd.print("Menghubungkan WiFi");
  lcd.setCursor(0, 1);
  lcd.print("Sistem Inisialisasi");

  Blynk.begin(auth, ssid, pass);

  lcd.clear();
  lcd.setCursor(0, 0);
  lcd.print("WiFi & Blynk OK");
  delay(1500);
  lcd.clear();

  timer.setInterval(3000L, bacaSensor);
}

void loop() {
  Blynk.run();
  timer.run();
}

```

Penjelasan ringkas alur kode:

- DHT22 dibaca lewat library DHT dan menghasilkan suhu serta kelembapan udara.
- RS485 dibaca lewat Serial2 menggunakan frame Modbus RTU.
- Data sensor tanah dipetakan ke variabel moisture, temperature, EC, pH, N, P, dan K.
- Hasil pembacaan dikirim ke Blynk menggunakan virtual pin (contoh: V1–V9).
- Serial Monitor dan LCD I2C digunakan untuk debugging dan menampilkan pembacaan secara lokal, berguna ketika WiFi atau Blynk tidak terhubung.

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
