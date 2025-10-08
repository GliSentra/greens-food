'use client';

import { useState } from 'react';
import Link from 'next/link';
import { HiOutlineMail, HiOutlinePhone, HiOutlineLocationMarker } from 'react-icons/hi';
import { supabase } from '@/app/lib/supabase';

export default function ContactView() {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [isLoading, setIsLoading] = useState(false);
    const [status, setStatus] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setStatus('Mengirim pesan...');

        try {
            const { error } = await supabase.functions.invoke('contact-form', {
                body: formData,
            });

            if (error) {
                console.error('Gagal mengirim pesan: ' + error);
                throw new Error('Gagal mengirim pesan. Coba lagi nanti.');
            }

            setStatus('Pesan Anda berhasil terkirim! Terima kasih.');
            setFormData({ name: '', email: '', message: '' }); // Kosongkan form
        } catch (error: any) {
            console.error(error);
            setStatus(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="container mx-auto px-6">
            <div className="text-center mb-16">
                <h1 className="text-4xl sm:text-5xl font-extrabold">Hubungi Kami</h1>
                <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">
                    Ada pertanyaan, saran, atau ingin memesan? Jangan ragu untuk menghubungi kami melalui detail di bawah atau kirimkan pesan melalui formulir.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Kolom Informasi Kontak */}
                <div className="space-y-6">
                    <div className="flex items-center">
                        <HiOutlineMail className="h-8 w-8 mr-4 text-green-600 flex-shrink-0" />
                        <div>
                            <h3 className="text-lg md:text-xl font-semibold">Email</h3>
                            <a href="mailto:glisentra@gmail.com" className="text-gray-600 hover:text-green-600">glisentra@gmail.com</a>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <HiOutlinePhone className="h-8 w-8 mr-4 text-green-600 flex-shrink-0" />
                        <div>
                            <h3 className="text-lg md:text-xl font-semibold">WhatsApp / Telepon</h3>
                            <Link href="https://wa.me/6285952732791" target="_blank" className="text-gray-600 hover:text-green-600">+62 859-5273-2791</Link>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <HiOutlineLocationMarker className="h-8 w-8 mr-4 text-green-600 flex-shrink-0" />
                        <div>
                            <h3 className="text-lg md:text-xl font-semibold">Lokasi Kebun</h3>
                            <p className="text-gray-600">Kediri, Jawa Timur</p>
                        </div>
                    </div>
                </div>

                {/* Kolom Formulir Kontak */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nama</label>
                        <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500" />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500" />
                    </div>
                    <div>
                        <label htmlFor="message" className="block text-sm font-medium text-gray-700">Pesan</label>
                        <textarea id="message" name="message" value={formData.message} onChange={handleChange} rows={5} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"></textarea>
                    </div>
                    <div>
                        <button type="submit" disabled={isLoading} className="w-full bg-green-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-green-700 transition duration-300">
                            {isLoading ? 'Mengirim...' : 'Kirim Pesan'}
                        </button>
                    </div>
                    {status && (
                        <p className={`text-center text-sm font-medium ${status.includes('berhasil') ? 'text-green-600' : 'text-red-600'}`}>
                            {status}
                        </p>
                    )}
                </form>
            </div>
        </div>
    )
}