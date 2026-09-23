# Crypto Legal Community

Crypto Legal Community adalah website komunitas yang menyediakan informasi dan layanan seputar cryptocurrency, komunitas, program, diskusi, legal digital, serta perkembangan pasar crypto.

Website ini dibuat menggunakan **Next.js, React, TypeScript**, dan teknologi web modern dengan desain responsive serta interaktif.

---

## ✨ Fitur

- 🏠 Landing Page
- 👥 Join Member
- 🤝 Join Community
- 📍 Office Location
- 💰 Real-time Cryptocurrency Market
- 📊 Cryptocurrency Price Chart
- 💬 Discussions
- 📚 Insights
- 📋 Programs
- 📞 Contact
- 🎨 Interactive Animation
- 🔊 Sound Interaction
- 📱 Responsive Design
- ⚡ Market API
- 💾 Member Data Storage

---

## 🛠️ Teknologi yang Digunakan

Project ini menggunakan beberapa teknologi berikut:

- **Next.js**
- **React**
- **TypeScript**
- **Tailwind CSS**
- **Framer Motion**
- **Node.js**
- **REST API**
- **CSS**
- **JavaScript**

---

## 📁 Struktur Project

```text
crypto_legal_comunity/
│
├── app/
│   ├── api/
│   │   └── market/
│   │       ├── chart/
│   │       │   └── route.ts
│   │       └── route.ts
│   │
│   ├── join/
│   │   ├── community/
│   │   │   └── page.tsx
│   │   │
│   │   └── member/
│   │       ├── confirmation/
│   │       │   ├── MemberConfirmation.tsx
│   │       │   └── page.tsx
│   │       │
│   │       ├── MemberForm.tsx
│   │       └── page.tsx
│   │
│   ├── favicon.ico
│   ├── layout.tsx
│   ├── opengraph-image.tsx
│   ├── page.tsx
│   └── template.tsx
│
├── components/
│   ├── ui/
│   │   ├── AnimatedLine.tsx
│   │   ├── Button.tsx
│   │   ├── Container.tsx
│   │   ├── CountUp.tsx
│   │   ├── FadeImage.tsx
│   │   ├── Logo.tsx
│   │   ├── MotionProvider.tsx
│   │   ├── PriceChartCard.tsx
│   │   ├── Reveal.tsx
│   │   ├── ScrollProgress.tsx
│   │   ├── SectionMark.tsx
│   │   ├── SoundLink.tsx
│   │   ├── SoundToggle.tsx
│   │   ├── SplitText.tsx
│   │   └── WhatsAppButton.tsx
│   │
│   ├── About.tsx
│   ├── Community.tsx
│   ├── Contact.tsx
│   ├── Discussions.tsx
│   ├── Footer.tsx
│   ├── Hero.tsx
│   ├── Insights.tsx
│   ├── JoinDropdown.tsx
│   ├── LegalDigital.tsx
│   ├── Market.tsx
│   ├── Navbar.tsx
│   ├── OfficeLocation.tsx
│   ├── Programs.tsx
│   └── SplashScreen.tsx
│
├── lib/
│   ├── config/
│   │   └── location.ts
│   │
│   ├── sound/
│   │   ├── sound-manager.ts
│   │   └── use-sound.ts
│   │
│   ├── storage/
│   │   └── member-storage.ts
│   │
│   ├── config.ts
│   ├── data.ts
│   ├── market.ts
│   ├── motion.ts
│   └── navigation.ts
│
├── public/
│   └── image/
│       ├── gallery-1.jpeg
│       ├── gallery-2.jpeg
│       ├── gallery-3.jpeg
│       ├── gallery-4.jpeg
│       ├── gallery-5.jpeg
│       ├── gallery-6.jpeg
│       ├── imge1.jpeg
│       ├── logo.jpeg
│       └── logo2.png
│
├── styles/
│   └── globals.css
│
├── .gitignore
├── eslint.config.mjs
├── next.config.ts
├── package.json
├── package-lock.json
├── postcss.config.mjs
├── tsconfig.json
└── README.md
```

---

# 🚀 Menjalankan Aplikasi

Ikuti langkah berikut untuk menjalankan project di komputer lokal.

## 1. Clone Repository

Clone repository menggunakan Git:

```bash
git clone https://github.com/pingittt/mapil-git.git
```

---

## 2. Masuk ke Folder Project

Setelah repository berhasil di-clone:

```bash
cd mapil-git
```

Kemudian masuk ke folder aplikasi:

```bash
cd crypto_legal_comunity
```

---

## 3. Install Dependencies

Install semua dependencies yang dibutuhkan:

```bash
npm install
```

Perintah tersebut akan membaca file `package.json` dan menginstall seluruh package yang diperlukan oleh project.

---

## 4. Jalankan Development Server

Jalankan aplikasi menggunakan:

```bash
npm run dev
```

Jika berhasil, Next.js akan menjalankan development server.

---

## 5. Buka Aplikasi

Buka browser dan akses:

```text
http://localhost:3000
```

Aplikasi akan tampil pada browser.

---

# 💻 Development

Untuk menjalankan project dalam mode development:

```bash
npm run dev
```

Development server menggunakan fitur **Hot Reload**, sehingga perubahan pada source code dapat langsung terlihat pada browser.

---

# 🏗️ Build Production

Untuk membuat production build:

```bash
npm run build
```

Jika proses build berhasil, jalankan aplikasi production menggunakan:

```bash
npm start
```

Kemudian buka:

```text
http://localhost:3000
```

---

# 📦 Dependencies

Dependencies utama yang digunakan dalam project antara lain:

- Next.js
- React
- React DOM
- TypeScript
- Framer Motion
- Tailwind CSS

Untuk melihat seluruh dependencies yang digunakan, buka file:

```text
package.json
```

---

# 🔌 API

Project menyediakan API untuk mengambil data cryptocurrency.

## Market API

Endpoint:

```text
/api/market
```

API ini digunakan untuk mendapatkan informasi market cryptocurrency.

---

## Market Chart API

Endpoint:

```text
/api/market/chart
```

API ini digunakan untuk mendapatkan data yang digunakan dalam grafik harga cryptocurrency.

---

# 💰 Cryptocurrency Market

Fitur **Market** digunakan untuk menampilkan informasi harga cryptocurrency.

Data market ditampilkan secara real-time dan digunakan pada bagian:

```text
Market
```

Komponen yang digunakan untuk menampilkan grafik harga:

```text
PriceChartCard
```

---

# 👥 Join Member

Website menyediakan fitur untuk pengguna yang ingin mendaftarkan diri sebagai member.

Alur pendaftaran:

```text
Join Member
     ↓
Member Form
     ↓
Input Data
     ↓
Confirmation
     ↓
Member Terdaftar
```

Halaman member:

```text
/join/member
```

Komponen yang digunakan:

```text
MemberForm.tsx
```

dan:

```text
MemberConfirmation.tsx
```

---

# 🤝 Join Community

Website menyediakan halaman untuk pengguna yang ingin bergabung dengan komunitas.

Halaman:

```text
/join/community
```

Fitur ini digunakan untuk memberikan informasi mengenai komunitas dan proses bergabung ke dalam komunitas.

---

# 📍 Office Location

Fitur **Office Location** digunakan untuk menampilkan informasi lokasi kantor.

Komponen:

```text
OfficeLocation.tsx
```

Informasi lokasi dapat digunakan oleh pengguna untuk mengetahui lokasi komunitas.

---

# 💬 Discussions

Fitur **Discussions** digunakan untuk menampilkan pembahasan dan informasi yang berkaitan dengan cryptocurrency, komunitas, dan legal digital.

Komponen:

```text
Discussions.tsx
```

---

# 📚 Insights

Fitur **Insights** digunakan untuk menampilkan informasi dan wawasan mengenai cryptocurrency serta perkembangan industri digital.

Komponen:

```text
Insights.tsx
```

---

# 📋 Programs

Fitur **Programs** digunakan untuk menampilkan berbagai program atau kegiatan yang tersedia dalam Crypto Legal Community.

Komponen:

```text
Programs.tsx
```

---

# 📞 Contact

Bagian **Contact** digunakan untuk memberikan informasi kontak yang dapat digunakan pengguna untuk menghubungi komunitas.

Komponen:

```text
Contact.tsx
```

---

# 🎨 UI dan Animasi

Project menggunakan berbagai komponen UI dan animasi untuk memberikan pengalaman pengguna yang lebih interaktif.

Beberapa komponen UI yang digunakan:

```text
AnimatedLine
Button
Container
CountUp
FadeImage
Reveal
ScrollProgress
SectionMark
SplitText
```

Komponen animasi digunakan pada berbagai bagian website seperti:

- Hero
- Navigation
- Market
- Community
- Programs
- Insights
- Page Transition

---

# 🔊 Sound Interaction

Project memiliki fitur interaksi suara yang dikelola melalui folder:

```text
lib/sound/
```

File utama:

```text
sound-manager.ts
use-sound.ts
```

Fitur sound digunakan untuk memberikan feedback audio pada interaksi tertentu di website.

---

# 📱 Responsive Design

Website dirancang agar dapat digunakan pada berbagai ukuran layar.

Website mendukung:

- 💻 Desktop
- 💻 Laptop
- 📱 Tablet
- 📱 Mobile

Layout dan komponen akan menyesuaikan ukuran layar pengguna.

---

# 💾 Member Storage

Data member dikelola menggunakan:

```text
lib/storage/member-storage.ts
```

File tersebut digunakan untuk menangani penyimpanan data member pada aplikasi.

---

# 🧭 Navigation

Navigasi website dikelola melalui:

```text
lib/navigation.ts
```

Navigasi digunakan untuk mengatur perpindahan halaman dan section pada website.

---

# 🌐 Configuration

Konfigurasi aplikasi terdapat pada:

```text
lib/config.ts
```

Sedangkan konfigurasi lokasi terdapat pada:

```text
lib/config/location.ts
```

---

# 🎞️ Motion System

Sistem animasi pada project dikelola melalui:

```text
lib/motion.ts
```

Motion system digunakan untuk mengatur animasi dan transisi pada berbagai komponen website.

---

# 🌿 Git Branch

Project menggunakan Git untuk mengelola versi dan perubahan kode.

Branch yang digunakan:

```text
main
devlop
future/web_community_crypto_legal
kaysan_pronend
recovery
```

## Main

Branch `main` digunakan sebagai branch utama project.

```text
main
```

---

## Devlop

Branch `devlop` digunakan untuk proses pengembangan sebelum perubahan diterapkan ke branch utama.

```text
devlop
```

---

## Future Web Community

Branch:

```text
future/web_community_crypto_legal
```

digunakan untuk pengembangan fitur website Crypto Legal Community.

---

## Kaysan Pronend

Branch:

```text
kaysan_pronend
```

digunakan untuk perubahan dan pengembangan tertentu dalam project.

---

## Recovery

Branch:

```text
recovery
```

digunakan sebagai branch cadangan untuk menyimpan versi project yang telah dipulihkan.

---

# 🔄 Git Workflow

Alur pengembangan project menggunakan Git:

```text
Membuat / Mengubah Kode
          ↓
      git add
          ↓
     git commit
          ↓
      git push
          ↓
   Branch Development
          ↓
      Review
          ↓
    Merge ke Main
```

---

## Menambahkan Perubahan

Setelah melakukan perubahan kode:

```bash
git status
```

Untuk menambahkan seluruh perubahan:

```bash
git add .
```

---

## Commit

Buat commit dengan pesan yang menjelaskan perubahan:

```bash
git commit -m "update feature"
```

Contoh:

```bash
git commit -m "add member registration feature"
```

---

## Push ke Devlop

Untuk mengirim perubahan ke branch `devlop`:

```bash
git push origin devlop
```

---

## Merge ke Main

Jika perubahan sudah selesai dan siap diterapkan ke branch utama:

```bash
git checkout main
```

Kemudian:

```bash
git merge devlop
```

Setelah merge berhasil:

```bash
git push origin main
```

---

# 🧪 Testing dan Code Quality

Sebelum melakukan push, pastikan project dapat berjalan dengan baik.

Jalankan:

```bash
npm run dev
```

Untuk memastikan project dapat melakukan production build:

```bash
npm run build
```

Jika build berhasil tanpa error, project siap untuk digunakan atau di-deploy.

---

# 🧹 Git Ignore

Folder dan file yang tidak perlu dimasukkan ke repository harus berada di dalam `.gitignore`.

Contohnya:

```text
node_modules/
.next/
.env
.env.local
```

Folder `node_modules` tidak perlu di-push ke GitHub karena dapat dibuat kembali dengan:

```bash
npm install
```

---

# ⚠️ Catatan Penting

Jangan memasukkan informasi sensitif ke dalam repository, seperti:

```text
API Keys
Password
Secret Keys
Token
Database Credentials
Environment Variables
```

Gunakan file environment seperti:

```text
.env.local
```

dan pastikan file tersebut sudah masuk ke `.gitignore`.

---

# 📌 Project Information

**Nama Project:**

Crypto Legal Community

**Framework:**

Next.js

**Bahasa Pemrograman:**

TypeScript

**Frontend:**

React + Next.js

**Styling:**

CSS / Tailwind CSS

**Animation:**

Framer Motion

**API:**

Next.js API Routes

---

# 👨‍💻 Repository

Repository project:

```text
https://github.com/pingittt/mapil-git
```

---

# 📄 License

Project ini dibuat untuk keperluan pengembangan dan pembelajaran **Crypto Legal Community**.

---

# 🚀 Crypto Legal Community

Crypto Legal Community merupakan platform berbasis web yang berfokus pada:

- Cryptocurrency
- Legal Digital
- Community
- Market Information
- Discussions
- Insights
- Programs
- Member Registration

Project dikembangkan menggunakan teknologi web modern dengan fokus pada tampilan yang responsive, interaktif, dan mudah digunakan.