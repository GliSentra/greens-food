// app/components/Footer.tsx
import Link from 'next/link';
import Image from 'next/image';

import { FaInstagram, FaTiktok, FaWhatsapp } from 'react-icons/fa';

export default function Footer() {
    return (
        <footer className="bg-gray-800 text-white pt-16 pb-8">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

                    {/* Kolom 1: Branding */}
                    <div className="mb-6 lg:mb-0">
                        <Link href="/" className="flex items-center mb-4 space-x-2">
                            <Image
                                className="h-12 w-auto"
                                width={50}
                                height={50}
                                src="/images/icon.webp"
                                alt="Icon Glisentra"
                            />
                            <Image
                                className="h-6 w-auto"
                                width={50}
                                height={50}
                                src="/teks.svg"
                                alt="Icon Glisentra"
                            />
                            {/* <span className="text-2xl font-bold text-white">Glisentra</span> */}
                        </Link>
                        <p className="text-gray-400 text-sm">
                            Menghadirkan kebaikan gizi microgreens organik segar langsung ke meja Anda.
                        </p>
                    </div>

                    {/* Kolom 2: Jelajahi */}
                    <div>
                        <h3 className="font-bold text-lg mb-4">Jelajahi</h3>
                        <ul className="space-y-3">
                            <li><Link href="/produk" className="text-gray-400 hover:text-white transition-colors">Produk</Link></li>
                            <li><Link href="/resep" className="text-gray-400 hover:text-white transition-colors">Resep & Inspirasi</Link></li>
                            <li><Link href="/blog" className="text-gray-400 hover:text-white transition-colors">Blog</Link></li>
                        </ul>
                    </div>

                    {/* Kolom 3: Informasi */}
                    <div>
                        <h3 className="font-bold text-lg mb-4">Informasi</h3>
                        <ul className="space-y-3">
                            <li><Link href="/tentang" className="text-gray-400 hover:text-white transition-colors">Tentang Kami</Link></li>
                            <li><Link href="/kontak" className="text-gray-400 hover:text-white transition-colors">Kontak</Link></li>
                            <li><Link href="/faq" className="text-gray-400 hover:text-white transition-colors">FAQ</Link></li>
                            {/* Tambahkan link lain jika perlu, misal: FAQ */}
                        </ul>
                    </div>

                    {/* Kolom 4: Hubungi Kami & Media Sosial */}
                    <div>
                        <h3 className="font-bold text-lg mb-4">Hubungi Kami</h3>
                        <p className="text-gray-400 text-sm mb-4">
                            Jl. Pahlawan No. 123<br />
                            Kediri, Jawa Timur, Indonesia
                        </p>
                        <div className="flex space-x-4">
                            <Link href="https://www.instagram.com/glisentra/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors"><FaInstagram size={24} /></Link>
                            <Link href="https://www.tiktok.com/@glisentra" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors"><FaTiktok size={20} /></Link>
                            <Link href="https://wa.me/6285952732791 " target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors"><FaWhatsapp size={24} /></Link>
                        </div>
                    </div>

                </div>

                {/* Bagian Copyright Bawah */}
                <div className="mt-12 border-t border-gray-700 pt-8 text-center text-gray-500 text-sm">
                    <p>&copy; {new Date().getFullYear()} Glisentra. Semua Hak Cipta Dilindungi.</p>
                </div>
            </div>
        </footer>
    );
}