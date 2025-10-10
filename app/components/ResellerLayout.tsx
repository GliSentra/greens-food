// app/components/ResellerLayout.tsx
'use client';

import { useState } from 'react';
import Sidebar from './Sidebar';
import ResellerHeader from './ResellerHeader';

export default function ResellerLayout({ children }: { children: React.ReactNode }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="bg-gray-100 min-h-screen" >
            {/* Sidebar Component */}
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

            {/* Konten Utama (Header + Halaman) */}
            <div className="md:pl-64 flex flex-col flex-1 h-screen">
                {/* Header Khusus Reseller */}
                <ResellerHeader onMenuClick={() => setSidebarOpen(true)} />

                {/* Konten Halaman Sebenarnya */}
                <main className="flex-1 min-h-screen overflow-y-auto bg-gray-100">
                    <div className="py-6">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}