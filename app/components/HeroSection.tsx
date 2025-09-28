// app/components/HeroSection.tsx
import Image from 'next/image';
import Link from 'next/link';

export default function HeroSection() {
    return (
        <section className="relative h-[95vh] text-white">
            {/* Gambar Latar */}
            <Image
                src="/images/hero-background.webp" // Ganti dengan path gambar Anda
                alt="Ladang microgreens Glisentra yang segar dan hijau"
                layout="fill"
                objectFit="cover"
                priority // Memberitahu Next.js untuk memuat gambar ini terlebih dahulu
                className="brightness-50" // Membuat gambar sedikit gelap agar teks terbaca
            />

            {/* Konten Teks */}
            <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
                <h1 className="text-4xl md:text-6xl font-extrabold mb-4 leading-tight">
                    Kebaikan Gizi dalam Genggaman Anda
                </h1>
                <p className="text-lg md:text-xl max-w-2xl mb-8">
                    Jelajahi kesegaran microgreens organik dari kebun Glisentra, dipanen khusus untuk Anda.
                </p>
                <Link
                    href="/produk"
                    className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-full text-lg transition duration-300"
                >
                    Lihat Produk Kami
                </Link>
            </div>
        </section>
    );
}