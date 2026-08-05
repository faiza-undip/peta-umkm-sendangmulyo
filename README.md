# Peta UMKM Sendangmulyo

Aplikasi **Pemetaan Digital & Direktori UMKM Kuliner** — Multidisiplin 2, Faiza Tanjia (Teknik Komputer),
KKNT IDBU 58, RW 09 Kelurahan Sendangmulyo.

Mengakomodasi luaran program kerja:
1. Pendataan profil & lokasi UMKM (form input hasil observasi/wawancara)
2. Titik koordinat lokasi usaha
3. Peta digital UMKM (peta interaktif, alternatif Google My Maps — tidak butuh API key)
4. Analisis sederhana persebaran & potensi UMKM (dashboard ringkasan)
5. Direktori digital UMKM + QR Code per UMKM

## Stack

- **Next.js 14** (App Router) + **TypeScript**
- **Prisma** ORM → **Supabase Postgres**
- **Tailwind CSS**
- **Server Actions** untuk semua tulis-data (tanpa route API terpisah)
- **react-leaflet** (OpenStreetMap) untuk peta — gratis, tanpa API key
- **qrcode** untuk membuat QR Code tiap halaman UMKM

## 1. Siapkan Supabase

1. Buat project baru di [supabase.com](https://supabase.com).
2. Buka **Project Settings → Database**, salin **Connection string**:
   - mode *Transaction/pooled* (port 6543) → `DATABASE_URL`
   - mode *Session/direct* (port 5432) → `DIRECT_URL`
3. Salin juga **Project URL** dan **anon public key** dari **Project Settings → API** (opsional, dipakai bila nanti menambah Supabase Storage/Auth).

## 2. Konfigurasi environment

```bash
cp .env.example .env
# lalu isi DATABASE_URL, DIRECT_URL, dan NEXT_PUBLIC_SITE_URL
```

## 3. Install & migrasi

```bash
npm install
npm run db:push      # membuat tabel peta_umkm di Supabase sesuai prisma/schema.prisma
npm run db:seed      # (opsional) isi 4 contoh data UMKM
```

## 4. Jalankan

```bash
npm run dev
# buka http://localhost:3000
```

## Struktur halaman

| Rute | Fungsi |
|---|---|
| `/` | Ringkasan & analisis sederhana (total UMKM, persebaran jenis usaha, kondisi usaha) |
| `/peta` | Peta interaktif titik lokasi seluruh UMKM |
| `/direktori` | Direktori publik, bisa difilter per jenis usaha |
| `/direktori/[slug]` | Halaman publik 1 UMKM lengkap dengan QR Code |
| `/admin/umkm` | Tabel kelola data (tambah/ubah/hapus) |
| `/admin/umkm/baru` | Form tambah UMKM baru |
| `/admin/umkm/[id]/edit` | Form ubah data UMKM |

## Catatan pemakaian di lapangan

- **Koordinat**: saat survei, buka Google Maps di titik lokasi UMKM → *Bagikan* → salin *Latitude, Longitude* → tempel ke form di `/admin/umkm/baru`.
- **QR Code**: setiap halaman `/direktori/[slug]` otomatis punya QR Code yang bisa dicetak/ditempel di lokasi usaha — cukup screenshot dari halaman tersebut.
- **`/admin/umkm`** belum diberi proteksi login (supaya cepat dipakai tim saat pendataan bersama). Sebelum dipublikasikan ke internet umum, sebaiknya tambahkan Supabase Auth (helper sudah disiapkan di `src/lib/supabase.ts`) atau lindungi lewat middleware sederhana.
- Titik tengah peta (`DEFAULT_CENTER` di `src/components/MapView.tsx`) memakai perkiraan koordinat Bundaran Tulus Harapan — sesuaikan dengan titik pasti begitu ada data pertama.

## Deploy

Bisa dideploy ke Vercel:
```bash
vercel
```
Pastikan environment variables (`DATABASE_URL`, `DIRECT_URL`, `NEXT_PUBLIC_SITE_URL`) diisi di dashboard Vercel juga, dan `NEXT_PUBLIC_SITE_URL` diganti ke domain produksi (dipakai untuk membuat link QR Code yang benar).
