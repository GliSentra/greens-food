// app/reseller/promo/page.tsx
'use client'
import ResellerLayout from "@/app/components/ResellerLayout";
import Image from "next/image";
import { HiOutlineDownload } from "react-icons/hi";

// Data dummy untuk aset promosi
const dummyAssets = [
    {
        id: 1,
        type: "Foto Produk",
        title: "Red Radish (High-Res)",
        previewImage: "https://plus.unsplash.com/premium_photo-1677819152836-f9fe8d81938c?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        downloadLink: "https://plus.unsplash.com/premium_photo-1677819152836-f9fe8d81938c?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        id: 2,
        type: "Foto Produk",
        title: "Sunflower Shoots (High-Res)",
        previewImage: "https://images.unsplash.com/photo-1559613671-dfe2fb6a7680?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        downloadLink: "https://images.unsplash.com/photo-1559613671-dfe2fb6a7680?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        id: 3,
        type: "Logo & Branding",
        title: "Logo Glisentra (Transparent)",
        previewImage: "/images/icon.webp", // Menggunakan logo dari folder public
        downloadLink: "/images/icon.webp",
    },
    {
        id: 4,
        type: "Teks Promosi",
        title: "Copywriting untuk Instagram Post",
        description: "'Segarkan harimu dengan kebaikan microgreens dari Glisentra! Kaya nutrisi, dipanen segar setiap hari. 🌿 #glisentra #microgreens #hidupsehat'",
        downloadLink: "#", // Link untuk menyalin teks
    },
];

export default function PromoPage() {
    return (
        <ResellerLayout>
            <div className="container min-h-screen mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Materi Promosi</h1>
                <p className="text-gray-600 mb-8">
                    Gunakan aset di bawah ini untuk membantu promosi penjualan Anda.
                </p>

                <div className="space-y-10">
                    {/* Seksi Foto Produk */}
                    <div>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Foto Produk</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {dummyAssets.filter(a => a.type === 'Foto Produk').map(asset => (
                                <div key={asset.id} className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
                                    <div className="relative w-full h-48 bg-gray-100">
                                        <Image src={asset.previewImage ?? ""} alt={asset.title} layout="fill" objectFit="cover" />
                                    </div>
                                    <div className="p-4">
                                        <p className="font-semibold text-gray-800 truncate">{asset.title}</p>
                                        <a href={asset.downloadLink} download target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex items-center gap-2 text-sm text-green-600 font-semibold hover:text-green-800">
                                            <HiOutlineDownload /> Unduh
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Seksi Logo & Branding */}
                    <div>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Logo & Branding</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {dummyAssets.filter(a => a.type === 'Logo & Branding').map(asset => (
                                <div key={asset.id} className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
                                    <div className="relative w-full h-48 bg-gray-100 flex items-center justify-center p-4">
                                        <Image src={asset.previewImage ?? ""} alt={asset.title} width={120} height={120} objectFit="contain" />
                                    </div>
                                    <div className="p-4">
                                        <p className="font-semibold truncate text-gray-800">{asset.title}</p>
                                        <a href={asset.downloadLink} download target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex items-center gap-2 text-sm text-green-600 font-semibold hover:text-green-800">
                                            <HiOutlineDownload /> Unduh
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Seksi Teks Promosi */}
                    <div>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Teks Promosi (Copywriting)</h2>
                        <div className="space-y-4">
                            {dummyAssets.filter(a => a.type === 'Teks Promosi').map(asset => (
                                <div key={asset.id} className="bg-white border border-gray-200 rounded-lg shadow-sm p-4">
                                    <p className="font-semibold text-gray-800 mb-2">{asset.title}</p>
                                    <p className="text-gray-600 bg-gray-50 p-3 rounded-md italic">"{asset.description}"</p>
                                    <button onClick={() => {
                                        navigator.clipboard.writeText(asset.description || '');
                                        alert('Teks berhasil disalin!');
                                    }}
                                        className="mt-3 text-sm text-green-600 font-semibold hover:text-green-800">
                                        Salin Teks
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </ResellerLayout>
    );
}