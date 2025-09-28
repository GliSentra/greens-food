'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import Breadcrumbs from '@/app/components/Breadcrumbs';
import { getProductBySlug, Product } from '@/app/data/products';
import { FaHeart, FaShareAlt, FaStar, FaCheckCircle, FaTag, FaBookOpen, FaWhatsapp } from 'react-icons/fa';

export default function ProductDetailPage({ params }: { params: { slug: string } }) {
    const [product, setProduct] = useState<Product | null>(null);
    const [activeTab, setActiveTab] = useState('profil');
    const [selectedSize, setSelectedSize] = useState<string | null>(null);

    useEffect(() => {
        const fetchProduct = async () => {
            const data = await getProductBySlug(params.slug);
            if (!data) {
                notFound();
            } else {
                setProduct(data);
                // Set ukuran default ke varian pertama saat data dimuat
                if (data.variants && data.variants.length > 0) {
                    setSelectedSize(data.variants[0].size);
                }
            }
        };
        fetchProduct();
    }, [params.slug]);

    if (!product) {
        return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    }

    const crumbs = [
        { label: 'Beranda', href: '/' },
        { label: 'Produk', href: '/produk' },
        { label: product.name, href: `/produk/${product.slug}` },
    ];

    const selectedVariant = product.variants.find(v => v.size === selectedSize);
    const displayPrice = selectedVariant ? selectedVariant.price : (product.variants[0]?.price || 0);

    const formattedDisplayPrice = new Intl.NumberFormat('id-ID', {
        style: 'currency', currency: 'IDR', minimumFractionDigits: 0,
    }).format(displayPrice);

    const whatsappMessage = encodeURIComponent(`Halo Glisentra, saya tertarik untuk memesan produk: ${product.name} (Ukuran: ${selectedSize}).`);
    const whatsappLink = `https://wa.me/6281234567890?text=${whatsappMessage}`; // Ganti dengan nomor WhatsApp Anda

    return (
        <div className="bg-white text-gray-800">
            <Header />
            <main className="pt-0">
                <Breadcrumbs crumbs={crumbs} />
                <div className="container mx-auto px-6 pb-12 sm:pb-16">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                        <div className="relative w-full aspect-square rounded-lg overflow-hidden shadow-lg">
                            <Image src={product.image} alt={product.alt} layout="fill" objectFit="cover" priority />
                        </div>
                        <div className="space-y-6">
                            <h1 className="text-3xl sm:text-4xl font-extrabold">{product.name}</h1>
                            <p className="text-2xl sm:text-3xl font-bold text-green-600">{formattedDisplayPrice}</p>

                            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-gray-500 border-b pb-6">
                                <div className="flex items-center gap-2" title={`${product.likes?.toLocaleString('id-ID')} Suka`}>
                                    <FaHeart className="" />
                                    <span className="text-sm font-medium">{product.likes?.toLocaleString('id-ID')} Suka</span>
                                </div>
                                <div className="flex items-center gap-2" title={`${product.shares?.toLocaleString('id-ID')} Kali Dibagikan`}>
                                    <FaShareAlt className="" />
                                    <span className="text-sm font-medium">{product.shares?.toLocaleString('id-ID')} Dibagikan</span>
                                </div>
                                <div className="flex items-center gap-2" title={`${product.sold?.toLocaleString('id-ID')} Terjual`}>
                                    <FaStar className="" />
                                    <span className="text-sm font-medium">{product.sold?.toLocaleString('id-ID')} Terjual</span>
                                </div>
                            </div>

                            <p className="text-lg text-gray-600">{product.longDescription}</p>

                            <div>
                                <h3 className="font-semibold text-lg mb-3">Pilih Ukuran:</h3>
                                <div className="flex flex-wrap gap-3">
                                    {product.variants.map(variant => (
                                        <button
                                            key={variant.size}
                                            onClick={() => setSelectedSize(variant.size)}
                                            className={`px-5 py-2 rounded-lg border-2 font-semibold transition-colors duration-200
                                 ${selectedSize === variant.size
                                                    ? 'bg-green-600 text-white border-green-600'
                                                    : 'bg-white text-gray-700 border-gray-300 hover:border-green-500'
                                                }`}
                                        >
                                            {variant.size}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="w-full mt-2 bg-green-600 text-white font-bold py-4 px-6 rounded-lg hover:bg-green-700 transition duration-300 flex items-center justify-center text-lg">
                                <FaWhatsapp size={22} className="mr-3" />
                                Pesan via WhatsApp
                            </a>
                        </div>
                    </div>

                    <div className="mt-16 sm:mt-20">
                        <div className="border-b border-gray-200">
                            <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                                <button onClick={() => setActiveTab('profil')} className={`${activeTab === 'profil' ? 'border-green-500 text-green-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-lg`}>
                                    Profil
                                </button>
                                <button onClick={() => setActiveTab('manfaat')} className={`${activeTab === 'manfaat' ? 'border-green-500 text-green-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-lg`}>
                                    Manfaat & Nutrisi
                                </button>
                                <button onClick={() => setActiveTab('penggunaan')} className={`${activeTab === 'penggunaan' ? 'border-green-500 text-green-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-lg`}>
                                    Cara Penggunaan
                                </button>
                            </nav>
                        </div>
                        <div className="pt-8">
                            {activeTab === 'profil' && (
                                <div>
                                    <h3 className="text-lg font-semibold mb-3 flex items-center"><FaTag className="mr-2 text-gray-400" /> Profil Rasa & Tekstur</h3>
                                    <div className="flex flex-wrap gap-3">
                                        {product.details.flavorProfile.map((tag, index) => (
                                            <span key={index} className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full font-medium">{tag}</span>
                                        ))}
                                    </div>
                                </div>
                            )}
                            {activeTab === 'manfaat' && (
                                <div>
                                    <h3 className="text-lg font-semibold mb-3 flex items-center"><FaCheckCircle className="mr-2 text-gray-400" /> Manfaat Utama</h3>
                                    <ul className="space-y-3 text-gray-700">
                                        {product.details.healthBenefits.map((item, index) => (
                                            <li key={index} className="flex items-start">
                                                <FaCheckCircle className="text-green-500 mr-3 mt-1 flex-shrink-0" />
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                            {activeTab === 'penggunaan' && (
                                <div>
                                    <h3 className="text-lg font-semibold mb-3 flex items-center"><FaBookOpen className="mr-2 text-gray-400" /> Ide Penyajian</h3>
                                    <ul className="space-y-3 text-gray-700">
                                        {product.details.servingSuggestion.map((item, index) => (
                                            <li key={index} className="flex items-start">
                                                <FaCheckCircle className="text-green-500 mr-3 mt-1 flex-shrink-0" />
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}