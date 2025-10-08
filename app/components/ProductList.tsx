// app/components/ProductList.tsx
'use client';

import { useState, useMemo, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/app/data/products';
import { FaHeart, FaShareAlt, FaRegEye, FaStar } from 'react-icons/fa';
import { formatCompactNumber } from '@/app/lib/utils';
import { supabase } from '@/app/lib/supabase';

export default function ProductList({ allProducts }: { allProducts: Product[] }) {
    const [sortOrder, setSortOrder] = useState('default');
    const [activeCategory, setActiveCategory] = useState('Semua');
    const [likedSlugs, setLikedSlugs] = useState<Set<string>>(new Set());
    const [products, setProducts] = useState(allProducts);


    const categories = ['Semua', ...new Set(allProducts.map(p => p.category))];

    useEffect(() => {
        const initialLikedSlugs = new Set<string>();
        allProducts.forEach(product => {
            const storageKey = `liked-product-${product.slug}`;
            if (localStorage.getItem(storageKey)) {
                initialLikedSlugs.add(product.slug);
            }
        });
        setLikedSlugs(initialLikedSlugs);
    }, [allProducts]);

    const handleLike = async (slug: string, currentLikes: number) => {
        const storageKey = `liked-product-${slug}`;
        if (likedSlugs.has(slug)) return; // Sudah di-like, jangan lakukan apa-apa

        // Optimistic UI Update
        const newLikedSlugs = new Set(likedSlugs);
        newLikedSlugs.add(slug);
        setLikedSlugs(newLikedSlugs);

        const updatedProducts = products.map(p =>
            p.slug === slug ? { ...p, likes: (p.likes || 0) + 1 } : p
        );
        setProducts(updatedProducts);

        localStorage.setItem(storageKey, 'true');

        // Panggil Edge Function
        try {
            const { error } = await supabase.functions.invoke('increment-like', {
                body: { slug: slug, tableName: 'products' },
            });
            if (error) throw error;
        } catch (error) {
            console.error('Failed to like product:', error);
            // Rollback jika gagal
            const revertedLikedSlugs = new Set(likedSlugs);
            revertedLikedSlugs.delete(slug);
            setLikedSlugs(revertedLikedSlugs);
            setProducts(allProducts); // Kembalikan ke data asli
            localStorage.removeItem(storageKey);
        }
    };

    const sortedAndFilteredProducts = useMemo(() => {
        let filtered = [...products];
        if (activeCategory !== 'Semua') {
            filtered = filtered.filter(p => p.category === activeCategory);
        }
        if (sortOrder === 'price-asc') {
            filtered.sort((a, b) => Math.min(...a.variants.map(v => v.price)) - Math.min(...b.variants.map(v => v.price)));
        } else if (sortOrder === 'price-desc') {
            filtered.sort((a, b) => Math.min(...b.variants.map(v => v.price)) - Math.min(...a.variants.map(v => v.price)));
        }
        return filtered;
    }, [products, activeCategory, sortOrder]);

    return (
        <>
            <section className="border-b shadow-md border-gray-200 py-4">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                        {/* Filter Kategori (Kiri) */}
                        <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-semibold mr-2 text-sm text-gray-600">Kategori:</span>
                            {categories.map(category => (
                                <button key={category} onClick={() => setActiveCategory(category)} className={`px-3 py-1 text-sm rounded-full transition-colors ${activeCategory === category ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>
                                    {category}
                                </button>
                            ))}
                        </div>
                        {/* Dropdown Sortir (Kanan) */}
                        <div className="flex items-center gap-2 flex-shrink-0">
                            <span className="font-semibold text-sm text-gray-600">Urutkan:</span>
                            <select title='sort' value={sortOrder} onChange={e => setSortOrder(e.target.value)} className="border border-gray-300 rounded-md px-2 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-green-500">
                                <option value="default">Default</option>
                                <option value="price-asc">Harga Terendah</option>
                                <option value="price-desc">Harga Tertinggi</option>
                            </select>
                        </div>
                    </div>
                </div>
            </section>

            {/* ======================================================= */}
            {/* TATA LETAK ZIG-ZAG DIMULAI DI SINI */}
            {/* ======================================================= */}
            <section className="py-12">
                <div className="container mx-auto px-6">
                    <div className="space-y-16">
                        {sortedAndFilteredProducts.map((product, index) => {
                            const startingPrice = Math.min(...product.variants.map(v => v.price));
                            const formattedPrice = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(startingPrice);
                            const isEven = index % 2 === 0;
                            const isLiked = likedSlugs.has(product.slug);

                            return (
                                <article key={product.id} className="group bg-white p-3 sm:p-8 rounded-xl border border-gray-200 shadow-sm hover:shadow-lg transition-shadow duration-300">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
                                        {/* Div untuk Gambar */}
                                        <div className={`relative w-full h-80 rounded-lg overflow-hidden shasdow-lg 
                                       transition-transform duration-500 group-hover:scale-105 
                                       ${!isEven ? 'md:order-last' : ''}`}>
                                            <Link href={`/produk/${product.slug}`}>
                                                <Image
                                                    src={product.image}
                                                    alt={product.alt}
                                                    layout="fill"
                                                    objectFit="cover"
                                                />
                                            </Link>
                                        </div>

                                        {/* Div untuk Teks */}
                                        <div className="flex flex-col items-start">
                                            <span className="inline-block bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-1 rounded-full mb-3">{product.category}</span>
                                            <Link href={`/produk/${product.slug}`}>
                                                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 group-hover:text-green-600 transition-colors duration-300 mb-3">{product.name}</h2>
                                            </Link>
                                            <p className="text-gray-600 leading-relaxed mb-4">{product.shortDescription}</p>
                                            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-500 mb-6">
                                                <div className="flex items-center gap-1.5" title={`${product.views?.toLocaleString('id-ID')} Dilihat`}>
                                                    <FaRegEye className="" />
                                                    <span>{formatCompactNumber(product.views)}</span>
                                                </div>
                                                <button
                                                    onClick={(e) => { e.preventDefault(); handleLike(product.slug, product.likes || 0); }}
                                                    disabled={isLiked}
                                                    className={`flex items-center gap-1.5 transition-colors ${isLiked ? 'text-red-500 cursor-not-allowed' : 'hover:text-red-500'}`}
                                                >
                                                    <FaHeart className="className={isLiked ? 'text-red-500' : 'text-gray-400'}" />
                                                    <span>{formatCompactNumber(product.likes)}</span>
                                                </button>
                                                <div className="flex items-center gap-1.5" title={`${product.shares?.toLocaleString('id-ID')} Kali Dibagikan`}>
                                                    <FaShareAlt className="" />
                                                    <span>{formatCompactNumber(product.shares)}</span>
                                                </div>
                                                <div className="flex items-center gap-1.5" title={`${product.sold?.toLocaleString('id-ID')} Terjual`}>
                                                    <FaStar className="" />
                                                    <span>{formatCompactNumber(product.sold)}</span>
                                                </div>
                                            </div>
                                            <p className="text-xl text-green-600 font-semibold mb-6">Mulai dari {formattedPrice}</p>
                                            <Link href={`/produk/${product.slug}`} className="inline-block bg-green-600 text-white px-6 py-3 rounded-full font-semibold text-sm hover:bg-green-700 transition-colors duration-300">
                                                Lihat Detail & Varian
                                            </Link>
                                        </div>
                                    </div>
                                </article>
                            )
                        })}
                    </div>

                    {sortedAndFilteredProducts.length === 0 && (
                        <div className="text-center col-span-full py-20">
                            <p className="text-xl text-gray-500">Tidak ada produk yang cocok dengan filter ini.</p>
                        </div>
                    )}
                </div>
            </section>
        </>
    );
}