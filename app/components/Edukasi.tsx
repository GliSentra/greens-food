// app/components/Edukasi.tsx
import Image from 'next/image';
import Link from 'next/link';

export default function Edukasi() {
    return (
        <section className="py-16 sm:py-20 bg-gray-50">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    {/* Kolom Gambar */}
                    <div className="w-full h-80 relative rounded-lg overflow-hidden">
                        <Image
                            src="/images/edukasi.webp" // Link dari Pexels
                            alt="Microgreens ditaburkan di atas hidangan gourmet"
                            layout="fill"
                            objectFit="cover"
                        />
                    </div>

                    {/* Kolom Teks */}
                    <div>
                        <h2 className="text-3xl sm:text-4xl font-bold mb-4">Apa Itu Microgreens?</h2>
                        <p className="text-gray-600 mb-6 leading-relaxed">
                            Microgreens adalah sayuran muda yang dipanen pada tahap awal pertumbuhannya. Meskipun ukurannya kecil, mereka memiliki kandungan nutrisi hingga 40 kali lebih padat dan rasa yang lebih intens dibandingkan sayuran dewasa. Mereka adalah cara termudah untuk menambahkan vitamin dan rasa pada setiap hidangan!
                        </p>
                        <Link href="/blog" className="text-green-600 font-semibold hover:underline">
                            Pelajari Lebih Lanjut &rarr;
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}