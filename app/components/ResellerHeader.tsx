// app/components/ResellerHeader.tsx
'use client';

import { HiOutlineMenuAlt2 } from 'react-icons/hi';

interface ResellerHeaderProps {
    onMenuClick: () => void;
}

export default function ResellerHeader({ onMenuClick }: ResellerHeaderProps) {
    return (
        <header className="sticky top-0 z-20 bg-gray-50 shadow-sm">
            <div className="px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Tombol Hamburger untuk Mobile */}
                    <button
                        type="button"
                        className="md:hidden text-gray-500 hover:text-gray-700"
                        onClick={onMenuClick}
                    >
                        <span className="sr-only">Buka sidebar</span>
                        <HiOutlineMenuAlt2 size={24} />
                    </button>

                    {/* Spacer untuk mendorong item ke kanan */}
                    <div className="flex-1"></div>

                    {/* Bagian Kanan Header, misal: Profil Pengguna */}
                    <div className="flex items-center">
                        {/* Nanti kita bisa tambahkan dropdown profil di sini */}
                        <p className="text-sm font-medium text-gray-700">Toko Berkah</p>
                    </div>
                </div>
            </div>
        </header>
    );
}