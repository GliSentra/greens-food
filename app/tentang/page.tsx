// app/tentang/page.tsx
import { Metadata } from 'next';
import Image from 'next/image';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { FaPagelines, FaSeedling, FaCheckCircle } from 'react-icons/fa';

// SEO Metadata untuk halaman Tentang Kami
export const metadata: Metadata = {
    title: 'Tentang Glisentra | Cerita di Balik Microgreens Segar Kami',
    description: 'Kenali lebih jauh tentang Glisentra, misi kami untuk menyediakan makanan sehat, dan proses kami menumbuhkan microgreens organik berkualitas tinggi.',
};

export default function TentangPage() {
    return (
        <div className="bg-white text-gray-800">
            <Header />
            <main>
                {/* Seksi Hero */}
                <section className="relative h-72">
                    <Image
                        src="/images/tentang.webp"
                        alt="Tangan memegang nampan microgreens segar"
                        layout="fill"
                        objectFit="cover"
                        className="brightness-50"
                    />
                    <div className="relative z-10 flex items-center justify-center h-full">
                        <h1 className="text-4xl sm:text-5xl font-extrabold text-white">Cerita Kami</h1>
                    </div>
                </section>

                {/* Seksi Misi dan Visi */}
                <section className="py-16 sm:py-20">
                    <div className="container mx-auto px-6 text-center max-w-3xl">
                        <h2 className="text-3xl sm:text-4xl font-bold mb-4">Misi Kami: Kebaikan di Setiap Gigitan</h2>
                        <p className="text-lg text-gray-600 leading-relaxed">
                            Di Glisentra, kami percaya bahwa makanan sehat harus mudah diakses dan penuh rasa. Kami memulai perjalanan ini dari kecintaan kami pada alam dan keinginan untuk membawa nutrisi terbaik dari kebun langsung ke meja makan Anda. Misi kami adalah menyediakan microgreens paling segar dan berkualitas untuk mendukung gaya hidup sehat komunitas kami.
                        </p>
                    </div>
                </section>

                {/* Seksi Proses Kami */}
                <section className="py-16 sm:py-20 bg-gray-50">
                    <div className="container mx-auto px-6 text-center">
                        <h2 className="text-3xl sm:text-4xl font-bold mb-12">Proses Kami yang Penuh Dedikasi</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                            <div className="flex flex-col items-center">
                                <FaPagelines size={40} className="text-green-600" />
                                <h3 className="text-xl font-semibold my-4">Benih Pilihan</h3>
                                <p className="text-gray-600">Kami hanya menggunakan benih non-GMO berkualitas terbaik untuk memulai perjalanan setiap tanaman.</p>
                            </div>
                            <div className="flex flex-col items-center">
                                <FaSeedling size={40} className="text-green-600" />
                                <h3 className="text-xl font-semibold my-4">Perawatan Organik</h3>
                                <p className="text-gray-600">Tanaman kami tumbuh dalam lingkungan yang bersih, hanya dengan air murni dan cahaya, tanpa pestisida.</p>
                            </div>
                            <div className="flex flex-col items-center">
                                <FaCheckCircle size={40} className="text-green-600" />
                                <h3 className="text-xl font-semibold my-4">Panen Segar</h3>
                                <p className="text-gray-600">Kami memanen setiap hari untuk memastikan produk yang sampai ke tangan Anda adalah yang paling segar.</p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}