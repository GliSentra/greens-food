// app/blog/page.tsx
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { blogData } from '@/app/data/blog';

export const metadata: Metadata = {
    title: 'Blog Glisentra | Tips, Manfaat, dan Inspirasi Microgreens',
    description: 'Baca artikel terbaru dari Glisentra tentang manfaat kesehatan, cara menanam, dan resep kreatif menggunakan microgreens.',
};

export default function BlogPage() {
    return (
        <div className="bg-white text-gray-800">
            <Header />
            <main>
                <section className="bg-gray-50 py-16">
                    <div className="container mx-auto px-6 text-center">
                        <h1 className="text-4xl sm:text-5xl font-extrabold">Blog Glisentra</h1>
                        <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">
                            Wawasan segar seputar dunia microgreens. Dari kebun kami, untuk Anda.
                        </p>
                    </div>
                </section>

                <section className="py-16 sm:py-20">
                    <div className="container mx-auto px-6 max-w-4xl">
                        <div className="space-y-16">
                            {blogData.map((post) => (
                                <article key={post.id} className="group">
                                    <Link href={`/blog/${post.slug}`}>
                                        <div className="relative w-full h-64 rounded-lg overflow-hidden mb-6 shadow-md">
                                            <Image
                                                src={post.image}
                                                alt={post.alt}
                                                layout="fill"
                                                objectFit="cover"
                                                className="transition-transform duration-500 group-hover:scale-105"
                                            />
                                        </div>
                                    </Link>
                                    <p className="text-sm text-gray-500 mb-2">{post.publishedDate} • {post.author}</p>
                                    <Link href={`/blog/${post.slug}`}>
                                        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 group-hover:text-green-600 transition-colors duration-300 mb-3">{post.title}</h2>
                                    </Link>
                                    <p className="text-gray-600 leading-relaxed mb-6">{post.excerpt}</p>
                                    {/* === PERUBAHAN: Tombol CTA Baru === */}
                                    <Link href={`/blog/${post.slug}`} className="inline-block bg-gray-200 text-gray-800 px-4 py-2 rounded-full font-semibold text-sm
                                  group-hover:bg-green-600 group-hover:text-white transition-colors duration-300">
                                        Baca Selengkapnya
                                    </Link>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}