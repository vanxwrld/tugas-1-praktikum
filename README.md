# Tugas 1 Praktikum - Pemrograman Mobile

## Struktur Proyek

Proyek ini mengikuti struktur yang diminta oleh dosen:

```
/Cara menjalankan backend dan frontend:

1. Backend (API-Pengeluaran):
   - Jalankan MySQL
   - Set .env (atau .env.example) di API-Pengeluaran
   - npm install
   - node src/api/server.js

2. Frontend (mobile-pengeluaran):
   - Set .env (atau .env.example) di root proyek
   - Sesuaikan EXPO_PUBLIC_API_URL dengan IP backend
   - npm install
   - npx expo start
   - Buka Expo Go dan pindai QR

## Kontrak API Backend (Express.js)

### GET /pengeluaran
- Mengambil daftar pengeluaran
- Respons: Array dari objek pengeluaran

### GET /pengeluaran/:id
- Mengambil pengeluaran berdasarkan ID
- Respons: Objek pengeluaran

### POST /pengeluaran
- Menambahkan pengeluaran baru
- Body: { judul, nominal, id_kategori }
- Respons: { id, judul, nominal }

### PUT /pengeluaran/:id
- Memperbarui pengeluaran
- Body: { judul, nominal }
- Respons: { id, judul, nominal }

### DELETE /pengeluaran/:id
- Menghapus pengeluaran
- Respons: 204 tanpa body

### GET /kategori
- Mengambil daftar kategori
- Respons: Array dari objek kategori

## Spesifikasi Frontend (React Native)

Aplikasi pencatatan pengeluaran dengan:
- Daftar pengeluaran (list)
- Tambah pengeluaran (form)
- Detail pengeluaran
- Ubah pengeluaran (form)
- Hapus dengan konfirmasi
- Pilihan kategori
- State loading/error/empty
- Design system dengan tokens
- Responsif untuk mobile

## Catatan

- Gunakan database MySQL dengan nama database "pengeluaran"
- Simpan kredensial database di .env (tidak dicommit)
- Gunakan IP LAN komputer backend untuk Expo Go di ponsel
- Backend harus Postman-testable
- Ikuti kontrak API dari Modul 2C