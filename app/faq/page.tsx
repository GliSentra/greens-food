// app/faq/page.tsx
'use client'; // Diperlukan untuk interaktivitas akordeon (useState)

import { useState } from 'react';
import { Metadata } from 'next';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { faqData } from '@/app/data/faq';
import Image from 'next/image';

// Metadata tidak bisa dinamis di client component, jadi kita definisikan secara statis
// export const metadata: Metadata = { 
//   title: 'FAQ - Pertanyaan Umum | Glisentra',
//   description: 'Temukan jawaban atas pertanyaan umum seputar microgreens, penyimpanan, manfaat, dan cara penggunaan produk Glisentra.',
// };
// Untuk SEO yang lebih baik, metadata idealnya diletakkan di server component.
// Tapi untuk saat ini, kita fokus pada fungsionalitas.

export default function FaqPage() {
    // State untuk melacak pertanyaan mana yang sedang terbuka
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const handleToggle = (index: number) => {
        // Jika pertanyaan yang diklik sudah terbuka, tutup. Jika tidak, buka.
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="bg-white text-gray-800">
            <Header />
            <main>
                <section className="relative flex flex-col justify-center items-center text-center px-6 
                           py-10 md:py-20">
                    <Image
                        src="https://images.pexels.com/photos/5428829/pexels-photo-5428829.jpeg"
                        alt="Berbagai wawasan seputar dunia microgreens"
                        layout="fill"
                        objectFit="cover"
                        priority
                        className="z-0 brightness-[.40]" // Efek gelap pada gambar
                    />
                    <div className="relative z-10 text-white">
                        <h1 className="text-4xl sm:text-5xl font-extrabold">Pertanyaan Umum (FAQ)</h1>
                        <p className="text-base sm:text-lg  mt-4 max-w-2xl mx-auto">
                            Menemukan jawaban yang Anda butuhkan tentang microgreens kami.
                        </p>
                    </div>
                </section>

                <section className="py-16 sm:py-20">
                    <div className="container mx-auto px-6 max-w-3xl">
                        <div className="space-y-6">
                            {faqData.map((item, index) => (
                                <div key={index} className="border-b border-gray-200 pb-4">
                                    <button
                                        onClick={() => handleToggle(index)}
                                        className="w-full flex justify-between items-center text-left text-lg font-semibold text-gray-800 py-2 focus:outline-none"
                                    >
                                        <span>{item.question}</span>
                                        {/* Ikon panah yang berputar */}
                                        <svg
                                            className={`w-5 h-5 transition-transform duration-300 ${openIndex === index ? 'transform rotate-180' : ''}`}
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                                        </svg>
                                    </button>
                                    {/* Konten jawaban yang muncul/hilang */}
                                    <div
                                        className={`overflow-hidden transition-all duration-500 ease-in-out ${openIndex === index ? 'max-h-screen pt-4' : 'max-h-0'}`}
                                    >
                                        <p className="text-gray-600 leading-relaxed">{item.answer}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}