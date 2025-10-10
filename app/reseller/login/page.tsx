// app/reseller/login/page.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function ResellerLoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log({ email, password });
        alert('Login belum berfungsi. Ini hanya tampilan.');
    };

    return (
        <div className="min-h-screen bg-white grid grid-cols-1 lg:grid-cols-2">
            {/* Kolom Kiri: Sisi Gambar */}
            <div className="relative hidden lg:block">
                <Image
                    src="https://images.pexels.com/photos/4551537/pexels-photo-4551537.jpeg"
                    alt="Fresh microgreens close up"
                    layout="fill"
                    objectFit="cover"
                />
                <div className="absolute inset-0 bg-green-900 bg-opacity-40"></div>
            </div>

            {/* Kolom Kanan: Sisi Formulir */}
            <div className="flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="mx-auto w-full max-w-md">
                    <div>
                        <Link href="/" className="flex items-center justify-center mb-6">
                            <Image
                                className="h-16 w-auto"
                                width={50}
                                height={50}
                                src="/images/icon.webp"
                                alt="Icon Glisentra"
                            />
                        </Link>
                        <h2 className="text-center text-3xl font-extrabold text-gray-900">
                            Portal Reseller Glisentra
                        </h2>
                        <p className="mt-2 text-center text-sm text-gray-600">
                            Silakan masuk ke akun Anda
                        </p>
                    </div>

                    <div className="mt-8">
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                    Alamat Email
                                </label>
                                <div className="mt-1">
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                    Password
                                </label>
                                <div className="mt-1">
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        autoComplete="current-password"
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                                    />
                                </div>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    className="flex w-full justify-center rounded-md border border-transparent bg-green-600 py-3 px-4 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                                >
                                    Masuk
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}