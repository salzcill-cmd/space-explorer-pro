# Space Explorer Pro 🚀

Aplikasi web multi-halaman interaktif untuk menjelajahi keajaiban luar angkasa menggunakan NASA API. Dibangun dengan pendekatan modular menggunakan HTML5, Tailwind CSS, dan Vanilla JavaScript ES6+.

## 🌟 Demo

**Live Demo:** [https://your-demo-link.netlify.app](https://your-demo-link.netlify.app) *(placeholder - deploy sendiri untuk demo live)*

## ✨ Fitur Utama

- **🏠 Homepage** - Hero section dengan animasi partikel, preview APOD, dan overview fitur
- **🌌 APOD** - Astronomy Picture of the Day dengan date picker, sistem favorit, dan fullscreen viewer
- **🪐 Planets** - Kartu planet interaktif dengan search/filter dan modal detail
- **📊 Dashboard** - Visualisasi data dengan Chart.js, counter animasi, dan widget fakta acak
- **🖼️ Gallery** - Grid galeri dengan filter kategori dan lightbox (GLightbox)
- **ℹ️ About** - Informasi proyek, NASA API, dan profil developer

## 🛠️ Tech Stack

- **HTML5** - Semantik, aksesibel, SEO-friendly
- **Tailwind CSS** - Via CDN, dark mode default, glassmorphism
- **JavaScript ES6+** - Modular (import/export), async/await, localStorage
- **NASA API** - APOD (Astronomy Picture of the Day)
- **AOS** - Animate On Scroll
- **Chart.js** - Visualisasi data
- **Particles.js** - Background animasi
- **GLightbox** - Lightbox modal untuk galeri

## 📦 Struktur Folder

```
/space-explorer-pro
│── index.html              # Homepage
│── apod.html               # Astronomy Picture of the Day
│── planets.html            # Planet explorer
│── dashboard.html          # Dashboard & analytics
│── gallery.html            # Image gallery
│── about.html              # About page
│── /js
│    ├── main.js            # Entry point, inisialisasi global
│    ├── api.js             # NASA API manager & data
│    ├── ui.js              # UI helpers, modal, toast, dll
│    ├── apod.js            # Logic halaman APOD
│    ├── planets.js         # Logic halaman Planets
│    ├── dashboard.js       # Logic halaman Dashboard
│    ├── gallery.js         # Logic halaman Gallery
│── /assets
│    ├── /images            # Gambar assets
│    ├── /icons             # Icon assets
│── README.md
```

## 🚀 Instalasi & Penggunaan

1. **Clone atau download** proyek ini
2. Buka folder proyek di code editor
3. Gunakan **Live Server** (VS Code extension) atau buka `index.html` langsung di browser
4. Tidak perlu build tools atau instalasi dependencies!

### Menjalankan dengan Live Server (VS Code):
```bash
# Install Live Server extension di VS Code
# Klik kanan index.html -> "Open with Live Server"
```

Atau jalankan dengan Python:
```bash
# Python 3
python -m http.server 8000

# Lalu buka http://localhost:8000 di browser
```

## 🔑 NASA API Key

Aplikasi ini menggunakan `DEMO_KEY` untuk NASA API. Untuk penggunaan lebih intensif:

1. Daftar di [https://api.nasa.gov](https://api.nasa.gov)
2. Dapatkan API key gratis
3. Ganti `DEMO_KEY` di `js/api.js` dengan API key Anda

## 🎨 Fitur UI/UX

- ✅ Dark mode default dengan toggle (tersimpan di localStorage)
- ✅ Responsif (mobile-first)
- ✅ Animasi halus (AOS, CSS transitions)
- ✅ Scroll progress bar
- ✅ Back to top button
- ✅ Toast notifications
- ✅ Skeleton loading states
- ✅ Error handling dengan UI feedback
- ✅ Glassmorphism design
- ✅ Gradient neon (purple, blue, cyan)
- ✅ Navigasi responsif dengan hamburger menu
- ✅ Aksesibilitas (ARIA roles, keyboard navigation)

## 📡 API Endpoints

### NASA APOD
```
GET https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY
GET https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&date=YYYY-MM-DD
```

Response:
```json
{
  "date": "2026-01-01",
  "explanation": "...",
  "title": "...",
  "url": "https://...",
  "media_type": "image",
  "copyright": "..."
}
```

## 🎯 Rencana Pengembangan

- [ ] Menambahkan Mars Rover Photos API
- [ ] Implementasi Near Earth Objects (NEO) tracker
- [ ] Peta interaktif tata surya (Three.js)
- [ ] Sistem user account (favorit tersimpan di cloud)
- [ ] PWA support (offline mode)
- [ ] Multi-bahasa (i18n)
- [ ] Mode VR untuk eksplorasi planet

## 📸 Screenshots

*(Tambahkan screenshot aplikasi di sini setelah deploy)*

## 👨‍💻 Developer

**Space Explorer Team**
- Senior Front-End Engineer
- UI/UX Designer  
- Software Architect

## 📄 Lisensi

MIT License - bebas digunakan untuk pembelajaran dan pengembangan.

## 🙏 Kredit

- Data disediakan oleh [NASA Open API](https://api.nasa.gov)
- Gambar dari [Unsplash](https://unsplash.com)
- Icons dari Heroicons
- Font dari Google Fonts (Inter, Orbitron)

---

**Dibangun dengan ❤️ dan banyak ☕**
