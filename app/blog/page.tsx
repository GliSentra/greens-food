// app/blog/page.tsx
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { getBlogPosts } from '@/app/data/blog';

export const metadata: Metadata = {
    title: 'Blog Glisentra | Tips, Manfaat, dan Inspirasi Microgreens',
    description: 'Baca artikel terbaru dari Glisentra tentang manfaat kesehatan, cara menanam, dan resep kreatif menggunakan microgreens.',
};

function SimpleBlogCard({ post }: { post: any }) {
    return (
        <article className="group">
            <Link href={`/blog/${post.slug}`}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                    <div className="relative w-full h-56 md:h-full rounded-lg overflow-hidden shadow-md">
                        <Image
                            src={post.image}
                            alt={post.alt}
                            layout="fill"
                            objectFit="cover"
                            className="transition-transform duration-500 group-hover:scale-105"
                        />
                    </div>
                    <div className="md:col-span-2">
                        <span className="inline-block bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-1 rounded-full mb-3">{post.category}</span>
                        <p className="text-sm text-gray-500 mb-2">{post.publishedDate} • {post.author}</p>
                        <h2 className="text-2xl font-bold text-gray-900 group-hover:text-green-600 transition-colors duration-300 mb-3">{post.title}</h2>
                        <p className="text-gray-600 leading-relaxed text-sm mb-4">{post.excerpt}</p>
                    </div>
                </div>
            </Link>
        </article>
    );
}

export default async function BlogPage() {
    const allPosts = await getBlogPosts();
    const totalPosts = allPosts.length;

    const featuredPost = allPosts[0];
    const otherPosts = allPosts.slice(1);
    return (
        <div className="bg-white text-gray-800">
            <Header />
            <main>
                <section className="relative flex flex-col justify-center items-center text-center px-6 
                           py-10 md:py-20">
                    <Image
                        src="https://images.pexels.com/photos/34084889/pexels-photo-34084889.jpeg"
                        alt="Berbagai wawasan seputar dunia microgreens"
                        layout="fill"
                        objectFit="cover"
                        priority
                        className="z-0 brightness-[.40]" // Efek gelap pada gambar
                    />
                    <div className="relative z-10 text-white">
                        <h1 className="text-4xl sm:text-5xl font-extrabold">Blog Glisentra</h1>
                        <p className="text-base sm:text-lg  mt-4 max-w-2xl mx-auto">
                            Wawasan segar seputar dunia microgreens. Dari kebun kami, untuk Anda.
                        </p>
                    </div>
                </section>

                <section className="py-16 sm:py-20">
                    <div className="container mx-auto px-6 max-w-5xl">
                        {totalPosts < 4 ? (
                            // Tampilan Daftar Sederhana jika post sedikit
                            <div className="space-y-12">
                                {allPosts.map((post) => (
                                    <SimpleBlogCard key={post.id} post={post} />
                                ))}
                            </div>
                        ) : (
                            // Tampilan Featured + Grid jika post sudah banyak
                            <>
                                {featuredPost && (
                                    <article className="group mb-16">
                                        <Link href={`/blog/${featuredPost.slug}`}>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                                                <div className="relative w-full h-80 rounded-lg overflow-hidden shadow-md">
                                                    <Image
                                                        src={featuredPost.image}
                                                        alt={featuredPost.alt}
                                                        layout="fill"
                                                        objectFit="cover"
                                                        className="transition-transform duration-500 group-hover:scale-105"
                                                    />
                                                </div>
                                                <div>
                                                    <span className="inline-block bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-1 rounded-full mb-3">{featuredPost.category}</span>
                                                    <p className="text-sm text-gray-500 mb-2">{featuredPost.publishedDate} • {featuredPost.author}</p>
                                                    <h2 className="text-3xl font-bold text-gray-900 group-hover:text-green-600 transition-colors duration-300 mb-3">{featuredPost.title}</h2>
                                                    <p className="text-gray-600 leading-relaxed mb-6">{featuredPost.excerpt}</p>
                                                    <div className="inline-block bg-gray-200 text-gray-800 px-4 py-2 rounded-full font-semibold text-sm group-hover:bg-green-600 group-hover:text-white transition-colors duration-300">
                                                        Baca Selengkapnya
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    </article>
                                )}
                                <div className="border-b mb-16"></div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                    {otherPosts.map((post) => (
                                        <article key={post.id} className="group">
                                            <Link href={`/blog/${post.slug}`}>
                                                <div className="relative w-full h-56 rounded-lg overflow-hidden mb-6 shadow-md">
                                                    <Image
                                                        src={post.image}
                                                        alt={post.alt}
                                                        layout="fill"
                                                        objectFit="cover"
                                                        className="transition-transform duration-500 group-hover:scale-105"
                                                    />
                                                </div>
                                            </Link>
                                            <span className="inline-block bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-1 rounded-full mb-3">{post.category}</span>
                                            <p className="text-sm text-gray-500 mb-2">{post.publishedDate} • {post.author}</p>
                                            <Link href={`/blog/${post.slug}`}>
                                                <h2 className="text-2xl font-bold text-gray-900 group-hover:text-green-600 transition-colors duration-300 mb-3">{post.title}</h2>
                                            </Link>
                                            <p className="text-gray-600 leading-relaxed text-sm">{post.excerpt}</p>
                                        </article>
                                    ))}
                                </div>
                            </>
                        )}
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}