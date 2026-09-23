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

- **Next.js**
- **React**
- **TypeScript**
- **Tailwind CSS**
- **Framer Motion**
- **Node.js**
- **REST API**
- **CSS**

---

## 📁 Struktur Project

```text
mapil-git/
│
├── crypto_legal_comunity/
│   ├── app/
│   │   ├── api/
│   │   │   └── market/
│   │   │       ├── chart/
│   │   │       │   └── route.ts
│   │   │       └── route.ts
│   │   │
│   │   ├── join/
│   │   │   ├── community/
│   │   │   │   └── page.tsx
│   │   │   │
│   │   │   └── member/
│   │   │       ├── confirmation/
│   │   │       │   ├── MemberConfirmation.tsx
│   │   │       │   └── page.tsx
│   │   │       ├── MemberForm.tsx
│   │   │       └── page.tsx
│   │   │
│   │   ├── layout.tsx
│   │   ├── opengraph-image.tsx
│   │   ├── page.tsx
│   │   └── template.tsx
│   │
│   ├── components/
│   │   ├── ui/
│   │   │   ├── AnimatedLine.tsx
│   │   │   ├── Button.tsx
│   │   │   ├── Container.tsx
│   │   │   ├── CountUp.tsx
│   │   │   ├── FadeImage.tsx
│   │   │   ├── Logo.tsx
│   │   │   ├── MotionProvider.tsx
│   │   │   ├── PriceChartCard.tsx
│   │   │   ├── Reveal.tsx
│   │   │   ├── ScrollProgress.tsx
│   │   │   ├── SectionMark.tsx
│   │   │   ├── SoundLink.tsx
│   │   │   ├── SoundToggle.tsx
│   │   │   ├── SplitText.tsx
│   │   │   └── WhatsAppButton.tsx
│   │   │
│   │   ├── About.tsx
│   │   ├── Community.tsx
│   │   ├── Contact.tsx
│   │   ├── Discussions.tsx
│   │   ├── Footer.tsx
│   │   ├── Hero.tsx
│   │   ├── Insights.tsx
│   │   ├── JoinDropdown.tsx
│   │   ├── LegalDigital.tsx
│   │   ├── Market.tsx
│   │   ├── Navbar.tsx
│   │   ├── OfficeLocation.tsx
│   │   ├── Programs.tsx
│   │   └── SplashScreen.tsx
│   │
│   ├── lib/
│   │   ├── config/
│   │   │   └── location.ts
│   │   ├── sound/
│   │   │   ├── sound-manager.ts
│   │   │   └── use-sound.ts
│   │   ├── storage/
│   │   │   └── member-storage.ts
│   │   ├── config.ts
│   │   ├── data.ts
│   │   ├── market.ts
│   │   ├── motion.ts
│   │   └── navigation.ts
│   │
│   ├── public/
│   │   └── image/
│   │
│   ├── styles/
│   │   └── globals.css
│   │
│   ├── package.json
│   ├── package-lock.json
│   ├── next.config.ts
│   └── tsconfig.json
│
├── src/
├── package.json
├── package-lock.json
└── README.md
```

---

# 🚀 Menjalankan Aplikasi

## 1. Clone Repository

```bash
git clone https://github.com/pingittt/mapil-git.git
```

## 2. Masuk ke Repository

```bash
cd mapil-git
```

## 3. Masuk ke Project

```bash
cd crypto_legal_comunity
```

## 4. Install Dependencies

```bash
npm install
```

## 5. Jalankan Development Server

```bash
npm run dev
```

## 6. Buka di Browser

```text
http://localhost:3000
```

---

# 🏗️ Build Production

Untuk membuat production build:

```bash
npm run build
```

Kemudian jalankan:

```bash
npm start
```

Aplikasi dapat diakses melalui:

```text
http://localhost:3000
```

---

# 🔌 API

Project memiliki API untuk data cryptocurrency.

### Market API

```text
/api/market
```

Digunakan untuk mengambil informasi market cryptocurrency.

### Market Chart API

```text
/api/market/chart
```

Digunakan untuk mengambil data grafik harga cryptocurrency.

---

# 👥 Join Member

Fitur Join Member memungkinkan pengguna melakukan pendaftaran sebagai member.

Alur:

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

Halaman:

```text
/join/member
```

---

# 🤝 Join Community

Fitur Join Community digunakan untuk pengguna yang ingin bergabung dengan Crypto Legal Community.

Halaman:

```text
/join/community
```

---

# 📍 Office Location

Fitur Office Location digunakan untuk menampilkan informasi lokasi kantor komunitas.

Komponen:

```text
OfficeLocation.tsx
```

---

# 💰 Cryptocurrency Market

Fitur Market menampilkan informasi harga cryptocurrency.

Data market digunakan pada komponen:

```text
Market.tsx
```

dan:

```text
PriceChartCard.tsx
```

---

# 💬 Discussions

Fitur Discussions digunakan untuk menampilkan pembahasan dan informasi seputar cryptocurrency, komunitas, dan legal digital.

---

# 📚 Insights

Insights digunakan untuk menampilkan wawasan dan informasi terkait perkembangan cryptocurrency dan industri digital.

---

# 📋 Programs

Programs digunakan untuk menampilkan berbagai program dan kegiatan yang tersedia dalam Crypto Legal Community.

---

# 🎨 UI & Animation

Project menggunakan berbagai komponen animasi dan UI:

- AnimatedLine
- CountUp
- FadeImage
- Reveal
- ScrollProgress
- SectionMark
- SplitText
- MotionProvider

Animasi digunakan pada:

- Hero
- Navigation
- Market
- Community
- Programs
- Insights
- Page Transition

---

# 🔊 Sound Interaction

Project memiliki fitur interaksi suara yang berada pada:

```text
lib/sound/
```

File utama:

```text
sound-manager.ts
use-sound.ts
```

---

# 📱 Responsive Design

Website dirancang agar dapat digunakan pada:

- 💻 Desktop
- 💻 Laptop
- 📱 Tablet
- 📱 Mobile

---

# 🌿 Git Branch

Branch yang digunakan:

```text
main
devlop
future/web_community_crypto_legal
kaysan_pronend
recovery
```

### Main

Branch utama project:

```text
main
```

### Devlop

Branch untuk pengembangan:

```text
devlop
```

### Future Web Community

Branch pengembangan fitur community:

```text
future/web_community_crypto_legal
```

### Kaysan Pronend

Branch pengembangan tertentu:

```text
kaysan_pronend
```

### Recovery

Branch cadangan untuk menyimpan versi project yang telah dipulihkan:

```text
recovery
```

---

# 🔄 Git Workflow

Workflow pengembangan:

```text
Edit Code
   ↓
git add .
   ↓
git commit
   ↓
git push
   ↓
Development Branch
   ↓
Review
   ↓
Merge
   ↓
Main
```

Contoh:

```bash
git add .
```

```bash
git commit -m "update feature"
```

```bash
git push origin devlop
```

Setelah perubahan siap:

```bash
git checkout main
```

```bash
git merge devlop
```

```bash
git push origin main
```

---

# 🧪 Testing

Untuk menjalankan project:

```bash
npm run dev
```

Untuk memastikan production build berhasil:

```bash
npm run build
```

---

# 🧹 Git Ignore

Beberapa file/folder tidak perlu dimasukkan ke repository:

```text
node_modules/
.next/
.env
.env.local
```

Dependencies dapat diinstall kembali menggunakan:

```bash
npm install
```

---

# ⚠️ Catatan

Jangan memasukkan informasi sensitif ke repository seperti:

- API Key
- Password
- Secret Key
- Access Token
- Database Credentials
- Environment Variables

Gunakan:

```text
.env.local
```

dan pastikan file tersebut terdapat di `.gitignore`.

---

# 📌 Project Information

**Project Name**

Crypto Legal Community

**Framework**

Next.js

**Language**

TypeScript

**Frontend**

React + Next.js

**Styling**

CSS / Tailwind CSS

**Animation**

Framer Motion

**API**

Next.js API Routes

---

# 🔗 Repository

GitHub Repository:

https://github.com/pingittt/mapil-git

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

Project dikembangkan menggunakan teknologi web modern dengan fokus pada tampilan yang **responsive, interaktif, dan mudah digunakan**.
