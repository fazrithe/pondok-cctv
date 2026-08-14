# Pondok CCTV

Website e-commerce untuk penjualan CCTV dan perangkat keamanan, dibangun dengan Next.js (App Router), TypeScript, Tailwind CSS v4, dan Framer Motion untuk animasi halus di seluruh halaman.

## Menjalankan Proyek

```bash
npm install
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser.

Untuk build produksi:

```bash
npm run build
npm run start
```

## Struktur Utama

- `src/app` — halaman (Beranda, Produk, Detail Produk, Keranjang, Checkout, Promo, Tentang, Kontak)
- `src/components` — komponen UI, layout, dan komponen per-halaman
- `src/data` — data dummy dalam format JSON (produk, kategori, testimoni, tim, milestone, konfigurasi situs)
- `src/store/cart.ts` — state keranjang belanja (Zustand + localStorage)
- `public/images` — gambar produk & kategori (SVG ilustrasi dummy, dibuat oleh `scripts/gen-images.mjs`)

## Data Dummy

Semua produk, kategori, testimoni, dan gambar bersifat dummy/contoh dan dapat diganti dengan data asli. Edit file JSON di `src/data/` untuk mengubah konten. Untuk membuat ulang gambar ilustrasi produk, jalankan:

```bash
node scripts/gen-images.mjs
```

## Alur Transaksi (Simulasi)

Checkout pada situs ini adalah simulasi (tanpa payment gateway sungguhan): pesanan disimpan sementara di browser (localStorage) dan pelanggan diarahkan untuk konfirmasi manual via WhatsApp. Untuk transaksi produksi sungguhan, integrasikan dengan payment gateway (mis. Midtrans, Xendit) pada `src/components/checkout/CheckoutForm.tsx`.
