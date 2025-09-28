// app/components/ScrollToTop.tsx
'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function ScrollToTop() {
    const pathname = usePathname();

    useEffect(() => {
        // Scroll jendela ke posisi paling atas (0, 0)
        // setiap kali 'pathname' (URL) berubah.
        window.scrollTo(0, 0);
    }, [pathname]);

    return null; // Komponen ini tidak menampilkan apa-apa
}