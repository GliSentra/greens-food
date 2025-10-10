// app/reseller/help/page.tsx
'use client';

import { useState } from 'react';
import ResellerLayout from "@/app/components/ResellerLayout";
import { helpData } from '@/app/data/help';

export default function HelpPage() {
    const [openIndex, setOpenIndex] = useState<number | null>(0); // Buka item pertama secara default

    const handleToggle = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <ResellerLayout>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Pusat Bantuan</h1>
                <p className="text-gray-600 mb-8">
                    Temukan jawaban atas pertanyaan umum tentang penggunaan Portal Reseller.
                </p>

                <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                    <div className="divide-y divide-gray-200">
                        {helpData.map((item, index) => (
                            <div key={index} className="py-4">
                                <button
                                    onClick={() => handleToggle(index)}
                                    className="w-full flex justify-between items-center text-left text-lg font-semibold text-gray-800 focus:outline-none"
                                >
                                    <span>{item.question}</span>
                                    <svg
                                        className={`w-5 h-5 transition-transform duration-300 text-gray-500 ${openIndex === index ? 'transform rotate-180' : ''}`}
                                        fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                                    </svg>
                                </button>
                                <div
                                    className={`overflow-hidden transition-all duration-500 ease-in-out ${openIndex === index ? 'max-h-screen mt-4' : 'max-h-0'}`}
                                >
                                    <p className="text-gray-600 leading-relaxed pr-4">{item.answer}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </ResellerLayout>
    );
}