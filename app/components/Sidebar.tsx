// app/components/Sidebar.tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { FaRegQuestionCircle, FaRegStar } from "react-icons/fa";
import { HiOutlineHome, HiOutlineViewGridAdd, HiOutlinePlay, HiOutlineUserCircle, HiOutlinePhotograph, HiOutlineClipboardList, HiOutlineLogout } from 'react-icons/hi';

// Tentukan tipe untuk props
interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
    onStartTour: () => void;
}

export default function Sidebar({ isOpen, onClose, onStartTour }: SidebarProps) {
    const pathname = usePathname();

    const navLinks = [
        { href: '/reseller/dashboard', label: 'Dashboard', icon: <HiOutlineHome size={22} /> },
        { href: '/reseller/order', label: 'Pesan Stok (PO)', icon: <HiOutlineViewGridAdd size={22} /> },
        { href: '/reseller/history', label: 'Riwayat Pesanan', icon: <HiOutlineClipboardList size={22} /> },
        { href: '/reseller/points', label: 'Poin & Hadiah', icon: <FaRegStar size={22} /> },
        { href: '/reseller/promo', label: 'Materi Promosi', icon: <HiOutlinePhotograph size={22} /> },
        { href: '/reseller/help', label: 'Bantuan', icon: <FaRegQuestionCircle size={22} /> }
    ];

    return (
        <>
            {/* Overlay untuk mobile, diklik akan menutup sidebar */}
            <div
                className={`fixed inset-0 bg-black bg-opacity-50 z-30 transition-opacity md:hidden ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={onClose}
            ></div>

            <aside
                id="reseller-sidebar"
                className={`fixed top-0 left-0 z-40 w-64 h-screen bg-slate-800 text-slate-300 hover:text-white flex flex-col transition-transform duration-300 ease-in-out 
                   ${isOpen ? 'transform translate-x-0' : 'transform -translate-x-full'} 
                   md:translate-x-0`}
            >
                {/* Logo Section */}
                <div className="flex items-center justify-center h-20 border-b border-gray-700">
                    <Link href="/" className="flex items-center gap-x-3">
                        <Image
                            className="h-12 w-auto"
                            width={50}
                            height={50}
                            src="/images/icon.webp"
                            alt="Icon Glisentra"
                        />
                        <span className="text-xl font-bold text-white">Glisentra</span>
                    </Link>
                </div>

                {/* Navigation Links */}
                <nav className="flex-grow px-4 py-6">
                    <ul className="space-y-2">
                        {navLinks.map((link) => {
                            const isActive = pathname.startsWith(link.href);
                            return (
                                <li key={link.href}>
                                    <Link
                                        id={link.href === '/reseller/order' ? 'reseller-sidebar-order' : undefined}
                                        href={link.href}
                                        onClick={onClose} // Menutup sidebar saat link diklik di mobile
                                        className={`flex items-center gap-x-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors
                               ${isActive
                                                ? 'bg-green-700  text-white'
                                                : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                                            }`}
                                    >
                                        {link.icon}
                                        <span>{link.label}</span>
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>

                {/* Logout Section */}
                <div className="px-4 py-4 border-t border-gray-700">
                    <Link href="/reseller/profile" onClick={onClose} className="flex w-full items-center gap-x-3 px-3 py-2.5 rounded-md text-sm font-medium text-slate-300 hover:bg-slate-700 hover:text-white transition-colors">
                        <HiOutlineUserCircle size={22} />
                        <span>Profil Saya</span>
                    </Link>
                    <button
                        onClick={() => {
                            onStartTour(); // Panggil fungsi dari layout
                            onClose(); // Tutup sidebar jika di mobile
                        }}
                        className="flex w-full items-center gap-x-3 px-3 py-2.5 rounded-md text-sm font-medium text-slate-300 hover:bg-slate-700 hover:text-white transition-colors">
                        <HiOutlinePlay size={22} />
                        <span>Ulangi Tur Panduan</span>
                    </button>
                    <button className="flex w-full items-center gap-x-3 px-3 py-2.5 rounded-md text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white transition-colors">
                        <HiOutlineLogout size={22} />
                        <span>Logout</span>
                    </button>
                </div>
            </aside>
        </>
    );
}