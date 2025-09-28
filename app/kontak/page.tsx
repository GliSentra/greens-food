// app/kontak/page.tsx
import { Metadata } from 'next';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Link from 'next/link';
import { HiOutlineMail, HiOutlinePhone, HiOutlineLocationMarker } from 'react-icons/hi';

// SEO Metadata untuk halaman Kontak
export const metadata: Metadata = {
    title: 'Hubungi Glisentra | Pesan Microgreens atau Ajukan Pertanyaan',
    description: 'Hubungi kami untuk pemesanan, pertanyaan tentang produk microgreens, atau peluang kerjasama. Kami siap membantu Anda.',
};

export default function KontakPage() {
    return (
        <div className="bg-white text-gray-800">
            <Header />
            <main className="py-16 sm:py-20">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h1 className="text-4xl sm:text-5xl font-extrabold">Hubungi Kami</h1>
                        <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">
                            Ada pertanyaan, saran, atau ingin memesan? Jangan ragu untuk menghubungi kami melalui detail di bawah atau kirimkan pesan melalui formulir.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        {/* Kolom Informasi Kontak */}
                        <div className="space-y-6">
                            <div className="flex items-center">
                                <HiOutlineMail className="h-8 w-8 mr-4 text-green-600 flex-shrink-0" />
                                <div>
                                    <h3 className="text-lg md:text-xl font-semibold">Email</h3>
                                    <a href="mailto:glisentra@gmail.com" className="text-gray-600 hover:text-green-600">glisentra@gmail.com</a>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <HiOutlinePhone className="h-8 w-8 mr-4 text-green-600 flex-shrink-0" />
                                <div>
                                    <h3 className="text-lg md:text-xl font-semibold">WhatsApp / Telepon</h3>
                                    <Link href="https://wa.me/6285952732791" target="_blank" className="text-gray-600 hover:text-green-600">+62 859-5273-2791</Link>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <HiOutlineLocationMarker className="h-8 w-8 mr-4 text-green-600 flex-shrink-0" />
                                <div>
                                    <h3 className="text-lg md:text-xl font-semibold">Lokasi Kebun</h3>
                                    <p className="text-gray-600">Kediri, Jawa Timur</p>
                                </div>
                            </div>
                        </div>

                        {/* Kolom Formulir Kontak */}
                        <form className="space-y-4">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nama</label>
                                <input type="text" id="name" name="name" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500" />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                                <input type="email" id="email" name="email" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500" />
                            </div>
                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-700">Pesan</label>
                                <textarea id="message" name="message" rows={5} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"></textarea>
                            </div>
                            <div>
                                <button type="submit" className="w-full bg-green-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-green-700 transition duration-300">
                                    Kirim Pesan
                                </button>
                            </div>
                            <p className="text-xs text-center text-gray-500">
                                <strong>Catatan:</strong> Formulir ini adalah tampilan. Untuk membuatnya berfungsi, perlu dihubungkan dengan layanan backend atau email.
                            </p>
                        </form>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}