# 📝 Blog Management RESTful API

Sebuah RESTful API untuk sistem manajemen blog yang mendukung fitur autentikasi, CRUD post, kategori, tag, serta tracking aktivitas pengunjung dan logging admin secara lengkap.

## 🚀 Fitur Utama

### 1. Autentikasi & Otorisasi
- Login & Logout dengan JWT
- Middleware role-based (Admin vs Customer)
- Proteksi endpoint CRUD hanya untuk Admin

### 2. Manajemen Blog Post
- Buat, ubah, hapus (soft delete), dan lihat daftar post
- Role Admin: lihat semua (publish, draft, deleted)
- Role Customer: hanya lihat post yang published & aktif

### 3. Manajemen Kategori & Tag
- Tambah, ubah, dan hapus kategori/tag (soft delete)
- Endpoint admin dan publik dipisah
- Validasi `slug` unik

### 4. Relasi Post dan Tag (Pivot)
- Mendukung input daftar tag saat membuat / mengedit post
- Gunakan tabel `post_tag` sebagai pivot many-to-many

### 5. Tracking Aktivitas Post (Customer)
- Mencatat kunjungan berdasarkan IP, UserAgent, dan waktu
- Endpoint `GET /post-activities/:post_id` untuk admin melihat statistik kunjungan

### 6. Logging Aktivitas Admin
- Setiap aksi Create, Update, Delete oleh admin otomatis dicatat ke `log_activities`
- Termasuk info IP Address, UserAgent, URL yang diakses, dan status aksi

---

## 📦 Teknologi yang Digunakan

- Node.js + Express.js
- Sequelize ORM + SQLite (default) – mudah diganti ke PostgreSQL/MySQL
- JWT untuk autentikasi
- `express-validator` untuk validasi input
- `slugify` untuk membuat slug otomatis
- `ua-parser-js` untuk parsing User-Agent
- Soft delete dengan fitur `paranoid` dari Sequelize

---

## 🔐 Role & Akses

| Role      | Akses                                                                 |
|-----------|------------------------------------------------------------------------|
| Admin     | CRUD post, kategori, tag, akses semua post, melihat log & statistik   |
| Customer  | Melihat post yang published, dikunjungi, dan dicatat sebagai aktivitas |

---

## 🔧 Instalasi & Menjalankan

```bash
# Clone repositori
git clone https://github.com/rayhanzz772/blog_apps
cd blog_apps

# Install dependencies
npm install

# Jalankan server (dev)
npm run dev
