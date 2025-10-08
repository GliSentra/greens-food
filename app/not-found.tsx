// app/not-found.tsx
import Link from 'next/link';
import Header from './components/Header';
import Footer from './components/Footer';
import { HiOutlineArrowNarrowRight } from 'react-icons/hi';

export default function NotFound() {
    return (
        <div className="bg-white">
            <Header />
            <main className="flex flex-col items-center justify-center text-center py-20 sm:py-32 px-6">
                <h1 className="text-6xl md:text-8xl font-extrabold text-green-600">404</h1>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mt-4">Halaman Tidak Ditemukan</h2>
                <p className="mt-4 text-gray-600 max-w-md">
                    Mohon maaf, halaman yang Anda cari tidak ada atau telah dipindahkan.
                </p>
                <div className="mt-10 flex flex-col sm:flex-row items-center gap-4">
                    <Link
                        href="/"
                        className="w-full sm:w-auto inline-block bg-green-600 text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-green-700 transition duration-300"
                    >
                        Kembali ke Beranda
                    </Link>
                    <Link
                        href="/produk"
                        className="w-full sm:w-auto inline-flex items-center justify-center font-semibold text-green-600 hover:text-green-800 transition-colors"
                    >
                        Lihat Semua Produk <HiOutlineArrowNarrowRight className="ml-2" />
                    </Link>
                </div>
            </main>
            <Footer />
        </div>
    );
}