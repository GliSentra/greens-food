// app/resep/[slug]/page.tsx
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Breadcrumbs from '@/app/components/Breadcrumbs';
import { Recipe } from '@/app/data/recipes';
import { FaLeaf, FaShareAlt, FaWhatsapp, FaRegEye, FaHeart } from 'react-icons/fa';
import { HiOutlineLink } from 'react-icons/hi';
import { supabase } from '@/app/lib/supabase';
import { formatCompactNumber } from '@/app/lib/utils';

export default function RecipeDetailPage({ recipe, relatedRecipes }: { recipe: Recipe, relatedRecipes: Recipe[] }) {
    const [copyStatus, setCopyStatus] = useState('Salin Link');
    const [currentViews, setCurrentViews] = useState(recipe.views);
    const [isLiked, setIsLiked] = useState(false);
    const [currentLikes, setCurrentLikes] = useState(recipe.likes || 0);
    // const recipes = await getRecipes();

    const crumbs = [
        { label: 'Beranda', href: '/' },
        { label: 'Resep', href: '/resep' },
        { label: recipe.title, href: `/resep/${recipe.slug}` },
    ];

    const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
    const shareText = encodeURIComponent(`Coba resep lezat ini: ${recipe.title}`);

    // const relatedRecipes = recipes.filter(r => r.slug !== recipe.slug).slice(0, 3);

    const handleCopyLink = () => {
        navigator.clipboard.writeText(shareUrl);
        setCopyStatus('Tersalin!');
        setTimeout(() => {
            setCopyStatus('Salin Link');
        }, 2000);
    };

    useEffect(() => {
        // Fungsi ini akan berjalan sekali saat komponen dimuat di browser
        const incrementViewCount = async () => {
            const storageKey = `viewed-recipe-${recipe.slug}`;
            const hasViewed = localStorage.getItem(storageKey);

            // Jika belum pernah dilihat (tidak ada di localStorage)
            if (!hasViewed) {
                try {
                    // Panggil Edge Function kita
                    const { error } = await supabase.functions.invoke('increment-view', {
                        body: {
                            slug: recipe.slug,
                            tableName: 'recipes'
                        },
                    });

                    if (error) throw error;

                    setCurrentViews(prevViews => (prevViews || 0) + 1);
                    localStorage.setItem(storageKey, 'true');
                } catch (error) {
                    console.error('Failed to increment view count:', error);
                }
            }
        };

        incrementViewCount();
    }, [recipe.slug]);

    useEffect(() => {
        const storageKey = `liked-recipe-${recipe.slug}`;
        const hasLiked = localStorage.getItem(storageKey);
        if (hasLiked) {
            setIsLiked(true);
        }
    }, [recipe.slug]);

    const handleLike = async () => {
        if (isLiked) return;

        const storageKey = `liked-recipe-${recipe.slug}`;

        setIsLiked(true);
        setCurrentLikes(prevLikes => prevLikes + 1);
        localStorage.setItem(storageKey, 'true');

        // 2. Kirim permintaan ke server
        try {
            const { error } = await supabase.functions.invoke('increment-like', {
                body: { slug: recipe.slug, tableName: 'recipes' },
            });
            if (error) throw error;
        } catch (error) {
            // 3. Jika gagal, kembalikan tampilan seperti semula (rollback)
            console.error('Failed to like product:', error);
            setIsLiked(false);
            setCurrentLikes(prevLikes => prevLikes - 1);
            localStorage.removeItem(storageKey);
        }
    };
    return (
        <main className="pt-0">
            <div className="no-print"><Breadcrumbs crumbs={crumbs} /></div>

            <article className="container mx-auto px-6 pb-12 sm:pb-16">
                {/* === BAGIAN ATAS (HERO) YANG DIDISAIN ULANG === */}
                <header className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-12">
                    <div className="relative w-full min-h-[300px] lg:min-h-[400px] rounded-lg overflow-hidden shadow-xl">
                        <Image src={recipe.image} alt={recipe.alt} layout="fill" objectFit="cover" priority />
                    </div>
                    <div className="flex flex-col justify-center">
                        <span className="text-green-600 font-semibold">{recipe.category}</span>
                        <h1 className="text-3xl sm:text-4xl font-extrabold mt-2 mb-4">{recipe.title}</h1>
                        <p className="text-gray-500 mb-6">Oleh {recipe.author} | Waktu: {recipe.prepTime} | Porsi: {recipe.servings}</p>

                        <div className="mt-8 flex flex-wrap justify-center sm:justify-between items-center gap-x-6 gap-y-4 border-t-2 border-gray-500 py-4">

                            {/* Grup Metrik (Kiri) */}
                            <div className="flex items-center gap-x-6 gap-y-2 flex-wrap justify-center text-gray-500">
                                <div className="flex items-center gap-2" title={`${currentViews?.toLocaleString('id-ID')} Dilihat`}>
                                    <FaRegEye />
                                    <span className="text-sm font-medium">{formatCompactNumber(currentViews)}</span>
                                </div>
                                <button
                                    onClick={handleLike}
                                    disabled={isLiked}
                                    className={`flex items-center gap-2 transition-colors duration-200 ${isLiked ? 'text-red-500 cursor-not-allowed' : 'text-gray-500 hover:text-red-500'}`}
                                    title={isLiked ? "Anda sudah menyukai ini" : "Sukai produk ini"}
                                >
                                    <FaHeart />
                                    <span className="text-sm font-medium">{formatCompactNumber(currentLikes)}</span>
                                </button>
                                <div className="flex items-center gap-2" title={`${recipe.shares?.toLocaleString('id-ID')} Kali Dibagikan`}>
                                    <FaShareAlt />
                                    <span className="text-sm font-medium">{recipe.shares?.toLocaleString('id-ID')}</span>
                                </div>
                            </div>

                            {/* Grup Aksi (Kanan) */}
                            <div className="flex items-center gap-3">
                                <span className="font-semibold text-gray-700 hidden sm:inline">Bagikan:</span>
                                <a href={`https://api.whatsapp.com/send?text=${shareText} ${shareUrl}`} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-green-600 transition-colors" title="Bagikan via WhatsApp">
                                    <FaWhatsapp size={26} />
                                </a>
                                <button onClick={handleCopyLink} className="flex items-center gap-2 text-gray-500 hover:text-green-600 transition-colors" title="Salin Link">
                                    <HiOutlineLink size={26} />
                                    <span className="text-sm font-medium hidden sm:inline">{copyStatus}</span>
                                </button>
                            </div>

                        </div>
                    </div>
                </header>

                {/* === AREA RESEP DENGAN LATAR BELAKANG === */}
                <div className="bg-gray-50 rounded-lg p-6 sm:p-10">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        <div className="md:col-span-1">
                            <h2 className="text-2xl font-bold border-b-2 border-green-500 pb-2 mb-6">Bahan-Bahan</h2>
                            <div className="flex flex-wrap gap-3">
                                {recipe.ingredients.map((ingredient, index) => (
                                    <div key={index} className="flex items-center bg-white border border-gray-200 rounded-full px-3 py-1.5 text-sm text-gray-700 shadow-sm">
                                        <FaLeaf className="text-green-500 mr-2 flex-shrink-0" /><span>{ingredient}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="md:col-span-2">
                            <h2 className="text-2xl font-bold border-b-2 border-green-500 pb-2 mb-6">Langkah-Langkah</h2>
                            <ol className="space-y-6">
                                {recipe.instructions.map((step, index) => (
                                    <li key={index} className="flex items-start bg-white p-4 rounded-lg border-l-4 border-green-500 shadow-sm">
                                        <span className="flex-shrink-0 bg-green-500 text-white font-bold rounded-full h-8 w-8 flex items-center justify-center mr-4">{index + 1}</span>
                                        <span className="text-gray-800 leading-relaxed">{step}</span>
                                    </li>
                                ))}
                            </ol>
                        </div>
                    </div>
                </div>
            </article>

            {/* === RESEP TERKAIT DENGAN KARTU YANG LEBIH BAIK === */}
            {/* <section className="no-print py-16 sm:py-20">
                <div className="container mx-auto px-6 max-w-5xl">
                    <h2 className="text-3xl font-bold text-center mb-10">Anda Mungkin Juga Suka</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                        {relatedRecipes.map(related => (
                            <Link key={related.id} href={`/resep/${related.slug}`} className="group block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
                                <div className="relative w-full h-40">
                                    <Image src={related.image} alt={related.alt} layout="fill" objectFit="cover" className="transition-transform duration-300 group-hover:scale-110" />
                                </div>
                                <div className="p-4">
                                    <span className="text-xs font-semibold bg-green-100 text-green-800 px-2 py-1 rounded-full">{related.category}</span>
                                    <h3 className="text-lg font-bold mt-2 group-hover:text-green-600 transition-colors">{related.title}</h3>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section> */}
            {relatedRecipes.length > 0 ? (
                <section className="no-print pt-16 bg-gray-50 mb-16">
                    <div className="container mx-auto px-6 max-w-5xl">
                        <h2 className="text-3xl font-bold text-center mb-10">Anda Mungkin Juga Suka</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                            {/* Menggunakan 'relatedRecipes' dari props */}
                            {relatedRecipes.map(related => (
                                <Link key={related.id} href={`/resep/${related.slug}`} className="group block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
                                    <div className="relative w-full h-40">
                                        <Image src={related.image} alt={related.alt} layout="fill" objectFit="cover" className="transition-transform duration-300 group-hover:scale-110" />
                                    </div>
                                    <div className="p-4">
                                        <span className="text-xs font-semibold bg-green-100 text-green-800 px-2 py-1 rounded-full">{related.category}</span>
                                        <h3 className="text-lg font-bold mt-2 group-hover:text-green-600 transition-colors">{related.title}</h3>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>) : null}
        </main>
    );
}