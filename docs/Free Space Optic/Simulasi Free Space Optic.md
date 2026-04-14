--- 
title: Simulasi FSO menggunakan modul IR
parent: Free Space Optic
author: Muhammad Rizki Akbar 
nav_order: 1
---

# Simulasi Free Space Optic (FSO) dengan ESP32 & IR

Ringkasan singkat  
Dokumentasi ini menjelaskan simulasi komunikasi Free Space Optic (FSO) sederhana menggunakan dua ESP32: satu sebagai transmitter (IR LED) dan satu sebagai receiver (TSOP / modul IR receiver). Sebelum melanjutkan baca penjelasan dasar FSO di halaman [FSO]({{ '/Hardware/FSO/' | relative_url }}).

## Tujuan
- Menunjukkan langkah praktis membangun link FSO sederhana.
- Menguji pengiriman karakter antara transmitter dan receiver menggunakan modul IR.
- Mencatat wiring, kode contoh, dan cara pengujian.

## Peralatan dan bahan
1. 2 × ESP32 (satu TX, satu RX)  
2. Modul IR transmitter (LED IR + driver / resistor)  
3. Modul IR receiver (TSOP / demodulator)  
4. Kabel jumper dan breadboard  
5. Sumber daya 5V / USB untuk ESP32  
6. (Opsional) LCD I2C 16x2 untuk menampilkan data pada receiver

## Diagram wiring
- Rangkaian transmitter:  
  ![Rangkaian_Transmitter]({{ site.baseurl }}/assets/images/Transmitter.png)

- Rangkaian receiver:  
  ![Rangkaian_Receiver]({{ site.baseurl }}/assets/images/Receiver.png)

Catatan: Pastikan pin yang dipakai pada diagram cocok dengan pin di kode.

## Cara kerja singkat
1. Serial input dikirim ke ESP32 transmitter.  
2. Transmitter mengubah data menjadi rangkaian bit (start, data LSB-first, stop) dan menyalakan/mematikan carrier IR sesuai bit.  
3. Receiver membaca sinyal, mengumpulkan bit menjadi karakter, lalu menampilkan/menulisnya ke LCD dan serial.

## Petunjuk pengujian
1. Upload kode transmitter ke ESP32 yang berperan sebagai pemancar.  
2. Upload kode receiver ke ESP32 penerima.  
3. Arahkan kedua modul supaya line-of-sight (tidak terhalang).  
4. Buka Serial Monitor pada transmitter, ketik karakter, cek apakah receiver menampilkan karakter tersebut.

## Catatan penting
- Kode di bawah adalah contoh implementasi sederhana untuk demonstrasi. Perangkat IR dan receiver nyata mungkin membutuhkan penyesuaian timing atau filtering.  
- Pastikan modul receiver yang dipakai kompatibel dengan carrier 38 kHz (banyak TSOP memang untuk 38 kHz).  
- Jarak maksimum tergantung power LED, fokus lensa, dan kondisi lingkungan (ambient light).

## Coding (contoh)
Catatan: kode berikut hanya contoh yang ditampilkan pada dokumentasi — jangan lupa menguji dan menyesuaikan jika ingin dipakai secara nyata.

untuk transmiter 
```bash
#define IR_LED_PIN 4
#define CARRIER_FREQ 38000   // 38 kHz
#define BIT_PERIOD 70

void setup() {
Serial.begin(115200);

// Attach PWM ke pin (API baru ESP32 core 3.x)
ledcAttach(IR_LED_PIN, CARRIER_FREQ, 8); // freq 38kHz, resolusi 8 bit

// Pastikan OFF dulu
ledcWrite(IR_LED_PIN, 0);

Serial.println("IR TRANSMITTER 38kHz READY (ESP32 Core 3.x)");
}

void kirimBit(int bit) {
if (bit == 1) {
    ledcWrite(IR_LED_PIN, 200);  // IR ON
} else {
    ledcWrite(IR_LED_PIN, 0);    // IR OFF
}
delay(BIT_PERIOD);
}

void kirimChar(char c) {
// Start bit
kirimBit(1);

// Data bit (LSB first)
for (int i = 0; i < 8; i++) {
    kirimBit((c >> i) & 1);
}

// Stop bit
kirimBit(0);
delay(BIT_PERIOD);
}

void loop() {
if (Serial.available()) {
    char d = Serial.read();
    if (d != '\n' && d != '\r') {
    Serial.print("TX: ");
    Serial.println(d);
    kirimChar(d);
    }
}
}
```

untuk receiver 

```bash
#include <Wire.h>
#include <LiquidCrystal_I2C.h>

#define IR_RECV_PIN 34
#define BIT_PERIOD 70

LiquidCrystal_I2C lcd(0x27, 16, 2);

int cursorPos = 0;
int row = 0;

void setup() {
  Serial.begin(115200);
  pinMode(IR_RECV_PIN, INPUT);

  lcd.init();
  lcd.backlight();
  lcd.setCursor(0,0);
  lcd.print("IR RECEIVER");
  lcd.setCursor(0,1);
  lcd.print("Ready...");
  delay(1000);
  lcd.clear();

  Serial.println("TSOP IR RECEIVER READY");
}

void loop() {

  // START BIT = IR ON = LOW
  if (digitalRead(IR_RECV_PIN) == LOW) {
    bacaKarakter();
  }
}

void bacaKarakter() {
  char c = 0;

  delay(BIT_PERIOD * 1.5);

  for (int i = 0; i < 8; i++) {
    int bit = (digitalRead(IR_RECV_PIN) == LOW) ? 1 : 0;
    c |= (bit << i);
    delay(BIT_PERIOD);
  }

  tampilkanLCD(c);
  Serial.print(c);
}

void tampilkanLCD(char c) {
  if (c == '\n' || cursorPos >= 16) {
    cursorPos = 0;
    row++;
    if (row > 1) { row = 0; lcd.clear(); }
    lcd.setCursor(cursorPos, row);
    return;
  }

  lcd.setCursor(cursorPos, row);
  lcd.print(c);
  cursorPos++;
}
```

## Saran pengembangan
- Tambahkan framing checks (mis. checksum) untuk deteksi error.  
- Coba fokuskan IR dengan lensa kecil untuk jangkauan lebih jauh.  
- Gunakan modul yang lebih sensitif atau amplifier jika jarak pendek.