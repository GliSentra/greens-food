// app/components/BackToTopButton.tsx
'use client';

import { useState, useEffect } from 'react';
import { HiOutlineArrowUp } from 'react-icons/hi';

export default function BackToTopButton() {
    const [isVisible, setIsVisible] = useState(false);

    // Fungsi untuk mengecek posisi scroll
    const toggleVisibility = () => {
        if (window.pageYOffset > 300) { // Tombol muncul setelah scroll 300px
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    // Fungsi untuk scroll ke atas
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth', // Animasi scroll yang mulus
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', toggleVisibility);

        // Cleanup function untuk menghapus event listener
        return () => {
            window.removeEventListener('scroll', toggleVisibility);
        };
    }, []);

    return (
        <button
            onClick={scrollToTop}
            className={`fixed bottom-8 right-8 bg-green-600 text-white rounded-full p-3 shadow-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition-opacity duration-300
                 ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
            aria-label="Kembali ke atas"
        >
            <HiOutlineArrowUp size={24} />
        </button>
    );
}