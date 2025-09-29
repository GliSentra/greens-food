// app/produk/page.tsx
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { getProducts } from '@/app/data/products';

export const metadata: Metadata = {
    title: 'Produk Microgreens | Glisentra - Jelajahi Semua Varian Kami',
    description: 'Lihat katalog lengkap microgreens organik dari Glisentra. Tersedia Radish, Sunflower, Pea Shoots, Brokoli, dan lainnya. Pesan sekarang.',
};

export default async function ProdukPage() {
    const products = await getProducts();
    return (
        <div className="bg-white text-gray-800">
            <Header />
            <main>
                <section className="bg-gray-50 py-16">
                    <div className="container mx-auto px-6 text-center">
                        <h1 className="text-5xl font-extrabold">Katalog Microgreens Kami</h1>
                        <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">
                            Temukan rasa dan nutrisi yang sempurna untuk setiap hidangan Anda. Semua produk kami ditanam secara organik dan dipanen setiap hari.
                        </p>
                    </div>
                </section>

                <section className="py-20">
                    <div className="container mx-auto px-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                            {products.map((product) => {
                                // Cari harga terendah dari varian
                                const startingPrice = Math.min(...product.variants.map(v => v.price));
                                // Format harga ke Rupiah
                                const formattedPrice = new Intl.NumberFormat('id-ID', {
                                    style: 'currency',
                                    currency: 'IDR',
                                    minimumFractionDigits: 0,
                                }).format(startingPrice);

                                return (
                                    <Link key={product.id} href={`/produk/${product.slug}`} className="group block bg-white rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 hover:shadow-xl">
                                        <div className="relative w-full h-56">
                                            <Image
                                                src={product.image}
                                                alt={product.alt}
                                                layout="fill"
                                                objectFit="cover"
                                                className="transition-transform duration-300 group-hover:scale-110"
                                            />
                                        </div>
                                        <div className="p-6">
                                            <span className="text-xs font-semibold bg-green-100 text-green-600 px-2 py-1 rounded-full">{product.category}</span>
                                            <h3 className="text-xl font-bold mt-3 mb-2">{product.name}</h3>
                                            <p className="text-gray-600 text-sm mb-4">{product.shortDescription}</p>
                                            <p className="text-lg text-green-600 font-semibold">Mulai dari {formattedPrice}</p>
                                        </div>
                                    </Link>
                                )
                            })}
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}