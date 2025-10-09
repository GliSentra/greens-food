# Glisentra - Website Microgreens 🌱

Sebuah website modern, dinamis, dan SEO-friendly yang dibangun dengan Next.js dan Supabase untuk mempromosikan dan mengelola bisnis microgreens Glisentra.



**[Lihat Live Demo](https://glisentra.gonemaul.web.id/)** 

---
## ✨ Fitur Utama (v1.0)
Versi 1.0 adalah rilis awal yang fungsional dan kaya fitur, mencakup:
* **Backend Penuh dengan Supabase:** Seluruh konten (Produk, Resep, Blog) dikelola secara dinamis melalui database PostgreSQL di Supabase.
* **Halaman yang Kaya Konten:** Halaman daftar dan detail yang dirancang dengan baik untuk Produk, Resep, dan Blog.
* **Fitur Interaktif:** Sistem *Like* & *View Count* yang fungsional dengan update menggunakan Supabase Edge Functions.
* **Revalidasi On-Demand:** Konten di website akan otomatis diperbarui saat ada interaksi (seperti *like*) tanpa perlu deploy ulang.
* **Formulir Kontak Fungsional:** Pengunjung dapat mengirim pesan yang akan langsung tersimpan di database Supabase.
* **Desain Responsif (Mobile-First):** Tampilan yang optimal di semua perangkat, dari desktop hingga mobile.
* **Optimasi SEO Lanjutan:**
    * Metadata dinamis untuk setiap halaman.
    * Schema Markup (JSON-LD) untuk Produk, Resep, Blog, dan FAQ.
    * `sitemap.xml` & `robots.ts` yang dibuat secara otomatis.
* **Pengalaman Pengguna (UX) yang Ditingkatkan:** Loading skeletons, breadcrumbs, tombol "Back to Top", dan komponen "Empty State" yang informatif.

---
## 🛠️ Teknologi yang Digunakan
* **Framework:** [Next.js](https://nextjs.org/) (App Router)
* **Bahasa:** [TypeScript](https://www.typescriptlang.org/)
* **Styling:** [Tailwind CSS](https://tailwindcss.com/)
* **Backend & Database:** [Supabase](https://supabase.com/) (PostgreSQL, Auth, Storage, Edge Functions)
* **Animasi:** [Framer Motion](https://www.framer.com/motion/) (untuk transisi halaman yang kita coba)
* **Deployment:** [Vercel](https://vercel.com/)


---
## 🗺️ Peta Jalan (Roadmap)

* **✅ v1.0 (Rilis Saat Ini)**
    * Peluncuran website dengan semua fitur inti yang disebutkan di atas.

* **⏳ v1.1 (Rencana Selanjutnya)**
    * [ ] Mengaktifkan fungsionalitas **Filter & Sortir** di halaman produk.
    * [ ] Menambahkan **Fungsi Pencarian** (Search Bar).
    * [ ] Menambahkan **Toast Notifications** untuk umpan balik (misalnya, setelah mengirim form).
    * [ ] Menambahkan **Dark Mode**.

* **🚀 v2.0 (Jangka Panjang)**
    * [ ] Mengimplementasikan **Sistem Reseller** (Login & Harga Khusus).
    * [ ] Mengembangkan fitur **E-commerce Penuh** (Keranjang Belanja & Pembayaran).
