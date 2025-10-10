// app/reseller/profile/page.tsx
'use client';

import { useState } from "react";
import ResellerLayout from "@/app/components/ResellerLayout";
import { HiOutlineUser, HiOutlineLockClosed } from "react-icons/hi";

// Data dummy untuk tampilan
const dummyProfile = {
    name: 'Toko Berkah',
    email: 'tokoberkah@example.com',
    phone_number: '081234567890',
    address: 'Jl. Merdeka No. 10, Kediri'
};

export default function ProfilePage() {
    const [profileData, setProfileData] = useState(dummyProfile);

    const handleProfileUpdate = (e: React.FormEvent) => {
        e.preventDefault();
        alert('Fungsi update profil belum diaktifkan.');
        console.log('Data profil baru:', profileData);
    };

    const handlePasswordChange = (e: React.FormEvent) => {
        e.preventDefault();
        alert('Fungsi ubah password belum diaktifkan.');
    };

    return (
        <ResellerLayout>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Profil Saya</h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Kolom Kiri: Form Edit Profil */}
                    <div className="lg:col-span-2">
                        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                                <HiOutlineUser /> Informasi Profil
                            </h2>
                            <form onSubmit={handleProfileUpdate} className="space-y-4">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nama Toko / Reseller</label>
                                    <input type="text" id="name" value={profileData.name} onChange={(e) => setProfileData({ ...profileData, name: e.target.value })} className="mt-1 block w-full p-1 text-gray-800 border-gray-300 rounded-md shadow-sm ..." />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-500">Email (tidak bisa diubah)</label>
                                    <input type="email" id="email" value={profileData.email} disabled className="mt-1 block w-full border-gray-300 rounded-md shadow-sm bg-gray-100 text-gray-800 p-1 cursor-not-allowed ..." />
                                </div>
                                <div>
                                    <label htmlFor="phone_number" className="block text-sm font-medium text-gray-700">Nomor Telepon</label>
                                    <input type="text" id="phone_number" value={profileData.phone_number} onChange={(e) => setProfileData({ ...profileData, phone_number: e.target.value })} className="mt-1 block w-full p-1 text-gray-800 border-gray-300 rounded-md shadow-sm ..." />
                                </div>
                                <div>
                                    <label htmlFor="address" className="block text-sm font-medium text-gray-700">Alamat</label>
                                    <textarea id="address" value={profileData.address} onChange={(e) => setProfileData({ ...profileData, address: e.target.value })} rows={3} className="mt-1 text-gray-800 p-1 block w-full border-gray-300 rounded-md shadow-sm ..."></textarea>
                                </div>
                                <div className="text-right">
                                    <button type="submit" className="bg-green-600 text-white font-bold py-2 px-5 rounded-lg hover:bg-green-700 transition">
                                        Simpan Perubahan
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* Kolom Kanan: Form Ubah Password */}
                    <div className="lg:col-span-1">
                        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                                <HiOutlineLockClosed /> Ubah Password
                            </h2>
                            <form onSubmit={handlePasswordChange} className="space-y-4">
                                <div>
                                    <label htmlFor="new_password" className="block text-sm font-medium text-gray-700">Password Baru</label>
                                    <input type="password" id="new_password" required className="mt-1 block w-full border-gray-300 text-gray-800 p-1 rounded-md shadow-sm ..." />
                                </div>
                                <div>
                                    <label htmlFor="confirm_password" className="block text-sm font-medium text-gray-700">Konfirmasi Password Baru</label>
                                    <input type="password" id="confirm_password" required className="mt-1 p-1 text-gray-800 block w-full border-gray-300 rounded-md shadow-sm ..." />
                                </div>
                                <button type="submit" className="w-full bg-gray-800 text-white font-bold py-2 px-5 rounded-lg hover:bg-gray-700 transition">
                                    Ubah Password
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </ResellerLayout>
    );
}