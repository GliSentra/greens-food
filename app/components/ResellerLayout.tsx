// app/components/ResellerLayout.tsx
'use client';

import { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import ResellerHeader from './ResellerHeader';
import ResellerTour from './ResellerTour';

export default function ResellerLayout({ children }: { children: React.ReactNode }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [runTour, setRunTour] = useState(false);

    useEffect(() => {
        const tourCompleted = localStorage.getItem('glisentra_reseller_tour_completed');
        if (!tourCompleted) {
            setTimeout(() => setRunTour(true), 1000);
        }
    }, []);

    const handleStartTour = () => {
        // Hapus catatan lama & mulai tur
        localStorage.removeItem('glisentra_reseller_tour_completed');
        setRunTour(true);
    };

    const handleJoyrideCallback = (data: any) => {
        const { status } = data;
        const finishedStatuses: string[] = ['finished', 'skipped'];
        if (finishedStatuses.includes(status)) {
            localStorage.setItem('glisentra_reseller_tour_completed', 'true');
            setRunTour(false);
        }
    };
    return (
        <div className="bg-gray-100 min-h-screen" >
            {/* Sidebar Component */}
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} onStartTour={handleStartTour} />

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
            <ResellerTour
                run={runTour}
                callback={handleJoyrideCallback}
            />
        </div>
    );
}