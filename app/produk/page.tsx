// app/produk/page.tsx
import { Metadata } from 'next';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductList from '../components/ProductList';
import { getProducts } from '@/app/data/products';
import Image from 'next/image';

export const metadata: Metadata = {
    title: 'Produk Microgreens | Glisentra - Jelajahi Semua Varian Kami',
    description: 'Lihat katalog lengkap microgreens organik dari Glisentra. Tersedia Radish, Sunflower, Pea Shoots, Brokoli, dan lainnya. Pesan sekarang.',
};

export default async function ProdukPage() {
    const allProducts = await getProducts();
    return (
        <div className="bg-white text-gray-800">
            <Header />
            <main>
                <section className="relative flex flex-col justify-center items-center text-center px-6 
                           py-10 md:py-20">
                    <Image
                        src="https://images.pexels.com/photos/20280059/pexels-photo-20280059.jpeg"
                        alt="Berbagai macam microgreens segar"
                        layout="fill"
                        objectFit="cover"
                        priority
                        className="z-0 brightness-[.40]" // Efek gelap pada gambar
                    />
                    <div className="relative z-10 text-white">
                        <h1 className="text-4xl sm:text-5xl font-extrabold">Katalog Microgreens Kami</h1>
                        <p className="text-base sm:text-lg mt-4 max-w-2xl mx-auto">
                            Temukan rasa dan nutrisi yang sempurna untuk setiap hidangan Anda. Semua produk kami ditanam secara organik dan dipanen setiap hari.
                        </p>
                    </div>
                </section>

                <ProductList allProducts={allProducts} />
            </main>
            <Footer />
        </div>
    );
}