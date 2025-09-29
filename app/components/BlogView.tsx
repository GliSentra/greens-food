// app/blog/[slug]/page.tsx
'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Breadcrumbs from '@/app/components/Breadcrumbs';
import { Post, ContentBlock } from '@/app/data/blog';
import { FaRegClock, FaRegEye, FaHeart, FaShareAlt, FaWhatsapp } from 'react-icons/fa';
import { HiOutlineLink, HiOutlineChevronRight } from 'react-icons/hi';

// Komponen RenderContentBlock tidak berubah
function RenderContentBlock({ block }: { block: ContentBlock }) {
    switch (block.type) {
        case 'paragraph': return <p>{block.text}</p>;
        case 'subheading': return <h2 className="text-2xl font-bold mt-8 mb-4">{block.text}</h2>;
        case 'blockquote': return <blockquote className="my-6 p-4 bg-gray-100 border-l-4 border-green-500 italic text-gray-700"><p>{block.text}</p></blockquote>;
        case 'list': return <ul className="list-disc list-inside space-y-2 my-4">{block.items.map((item, index) => <li key={index}>{item}</li>)}</ul>;
        default: return null;
    }
}

export default function BlogPostPage({ post, relatedPosts }: { post: Post, relatedPosts: Post[] }) {
    // const [post, setPost] = useState<Post | null>(null);
    const [copyStatus, setCopyStatus] = useState('Salin Link');

    const wordsPerMinute = 200;
    const wordCount = post.content.map(b => (b.type === 'paragraph' || b.type === 'blockquote') ? b.text.split(/\s+/).length : 0).reduce((a, b) => a + b, 0);
    const readingTime = Math.ceil(wordCount / wordsPerMinute);

    const crumbs = [
        { label: 'Beranda', href: '/' },
        { label: 'Blog', href: '/blog' },
        { label: post.title, href: `/blog/${post.slug}` },
    ];

    const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
    const shareText = encodeURIComponent(`Artikel menarik dari Glisentra: ${post.title}`);
    // const relatedPosts = blogData.filter(p => p.slug !== post.slug).slice(0, 3);

    const handleCopyLink = () => {
        navigator.clipboard.writeText(shareUrl);
        setCopyStatus('Tersalin!');
        setTimeout(() => setCopyStatus('Salin Link'), 2000);
    };

    return (
        <main className="pt-0">
            <Breadcrumbs crumbs={crumbs} />
            <div className="container mx-auto px-6 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

                    <article className="lg:col-span-2">
                        <header className="mb-8">
                            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4">{post.title}</h1>
                            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-gray-500 text-sm">
                                <span>Oleh {post.author} • {post.publishedDate}</span>
                                <span className="flex items-center gap-1.5"><FaRegClock /> {readingTime} menit baca</span>
                                {/* BARU: Tampilan Metrik (Views, Likes) */}
                                <div className="flex items-center gap-x-4">
                                    <span className="flex items-center gap-1.5" title={`${post.views?.toLocaleString('id-ID')} Dilihat`}><FaRegEye /> {post.views?.toLocaleString('id-ID')}</span>
                                    <span className="flex items-center gap-1.5" title={`${post.likes?.toLocaleString('id-ID')} Suka`}><FaHeart /> {post.likes?.toLocaleString('id-ID')}</span>
                                    <span className="flex items-center gap-1.5" title={`${post.shares?.toLocaleString('id-ID')} Kali Dibagikan`}><FaShareAlt /> {post.shares?.toLocaleString('id-ID')}</span>
                                </div>
                            </div>
                        </header>

                        <div className="relative w-full h-64 sm:h-80 md:h-96 rounded-lg overflow-hidden shadow-xl mb-8">
                            <Image src={post.image} alt={post.alt} layout="fill" objectFit="cover" priority />
                        </div>

                        <div className="prose prose-lg max-w-none">
                            {post.content.map((block, index) => (
                                <RenderContentBlock key={index} block={block} />
                            ))}
                        </div>
                    </article>

                    {/* SIDEBAR YANG DIDISAIN ULANG */}
                    <aside className="lg:col-span-1 space-y-8 lg:sticky lg:top-28">
                        {/* Widget Bagikan */}
                        <div className="p-6 bg-gray-50 rounded-lg">
                            <h3 className="text-xl font-bold mb-4 border-b pb-2">Bagikan Artikel</h3>
                            <div className="flex items-center justify-center gap-4">
                                <a href={`https://api.whatsapp.com/send?text=${shareText} ${shareUrl}`} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-green-600 transition-colors" title="Bagikan via WhatsApp">
                                    <FaWhatsapp size={32} />
                                </a>
                                <button onClick={handleCopyLink} className="flex flex-col items-center gap-1 text-gray-500 hover:text-green-600 transition-colors" title="Salin Link">
                                    <HiOutlineLink size={32} />
                                    <span className="text-xs font-medium">{copyStatus}</span>
                                </button>
                            </div>
                        </div>

                        {/* Widget Artikel Terkait */}
                        <div className="p-6 bg-gray-50 rounded-lg">
                            <h3 className="text-xl font-bold mb-4 border-b pb-2">Artikel Terkait</h3>
                            <ul className="space-y-3">
                                {relatedPosts.map(p => (
                                    <li key={p.id}>
                                        <Link href={`/blog/${p.slug}`} className="flex items-start group">
                                            <HiOutlineChevronRight className="w-5 h-5 mt-1 mr-2 text-green-500 flex-shrink-0" />
                                            <span className="group-hover:text-green-600 transition-colors text-sm">{p.title}</span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Widget CTA Produk */}
                        <div className="p-6 bg-green-600 text-white rounded-lg text-center">
                            <h3 className="text-xl font-bold mb-2">Jelajahi Produk Kami</h3>
                            <p className="text-green-100 mb-4 text-sm">Temukan microgreens segar untuk melengkapi gaya hidup sehat Anda.</p>
                            <Link href="/produk" className="inline-block bg-white text-green-700 font-bold py-2 px-5 rounded-full text-sm hover:bg-green-50 transition">
                                Lihat Produk
                            </Link>
                        </div>
                    </aside>

                </div>
            </div>
        </main>
    );
}