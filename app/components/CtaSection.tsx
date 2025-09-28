// app/components/CtaSection.tsx
import Link from 'next/link';

export default function CtaSection() {
    return (
        <section className="bg-green-600">
            <div className="container mx-auto px-6 py-16 text-center">
                <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
                    Siap Meningkatkan Kualitas Gizi Anda?
                </h2>
                <p className="text-lg text-green-100 mt-4 mb-8 max-w-2xl mx-auto">
                    Jelajahi seluruh koleksi microgreens kami dan temukan tambahan yang sempurna untuk setiap hidangan Anda.
                </p>
                <Link
                    href="/produk"
                    className="bg-white text-green-700 font-bold py-3 px-8 rounded-full text-lg hover:bg-green-50 transition duration-300 inline-block"
                >
                    Lihat Semua Produk
                </Link>
            </div>
        </section>
    );
}