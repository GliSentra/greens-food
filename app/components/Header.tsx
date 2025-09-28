// app/components/Header.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { HiOutlineMenuAlt3, HiOutlineX } from 'react-icons/hi';

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const pathname = usePathname();

    const navLinks = [
        { href: '/', label: 'Beranda' },
        { href: '/produk', label: 'Produk' },
        { href: '/resep', label: 'Resep' },
        { href: '/blog', label: 'Blog' },
        { href: '/tentang', label: 'Tentang Kami' },
        { href: '/kontak', label: 'Kontak' },
        { href: '/faq', label: 'FAQ' },
    ];

    return (
        <header className="bg-white shadow-md sticky top-0 z-50">
            <nav className="container mx-auto px-6 py-3 flex justify-between items-center">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-x-2">
                    {/* Ukuran diatur oleh class `h-` (tinggi), lebar akan menyesuaikan otomatis */}
                    <Image
                        className="h-12 w-auto" // tinggi 9 (36px), lebar otomatis
                        width={50} // Prop ini untuk aspect ratio
                        height={50}
                        src="/images/icon.webp"
                        alt="Icon Glisentra"
                        priority
                    />
                    <Image
                        className="h-6 w-auto" // tinggi 7 (28px), lebar otomatis
                        width={120} // Prop ini untuk aspect ratio
                        height={40}
                        src="/teks.svg"
                        alt="Teks Glisentra"
                        priority
                    />
                </Link>

                {/* Menu Navigasi untuk Desktop */}
                <div className="hidden md:flex items-center space-x-8">
                    {navLinks.map((link) => {
                        // =======================================================
                        // PERUBAHAN LOGIKA UTAMA ADA DI SINI
                        // =======================================================
                        const isActive = link.href === '/'
                            ? pathname === link.href // Untuk Beranda, harus sama persis
                            : pathname.startsWith(link.href); // Untuk link lain, cek awalan path

                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`font-semibold transition-colors duration-300 
                           ${isActive
                                        ? 'text-green-600' // Gaya jika link aktif
                                        : 'text-gray-600 hover:text-green-600' // Gaya jika tidak aktif
                                    }`}
                            >
                                {link.label}
                            </Link>
                        );
                    })}
                </div>

                {/* Tombol Hamburger untuk Mobile */}
                <div className="md:hidden">
                    <button title='hamburger' onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        {isMenuOpen ? <HiOutlineX size={28} /> : <HiOutlineMenuAlt3 size={28} />}
                    </button>
                </div>
            </nav>

            {/* Menu Dropdown untuk Mobile (sekarang posisinya absolute) */}
            <div className={`${isMenuOpen ? 'block' : 'hidden'} 
                       md:hidden 
                       absolute top-full left-0 w-full bg-white shadow-lg`}>
                {navLinks.map((link) => {
                    // Logika yang sama diterapkan di sini juga
                    const isActive = link.href === '/'
                        ? pathname === link.href
                        : pathname.startsWith(link.href);

                    return (
                        <Link
                            key={link.href}
                            href={link.href}
                            onClick={() => setIsMenuOpen(false)}
                            className={`block py-4 px-6 font-medium transition-colors duration-300
                           ${isActive
                                    ? 'text-green-600 bg-green-50' // Gaya jika link aktif
                                    : 'text-gray-600 hover:bg-gray-50' // Gaya jika tidak aktif
                                }`}
                        >
                            {link.label}
                        </Link>
                    );
                })}
            </div>
        </header>
    );
}