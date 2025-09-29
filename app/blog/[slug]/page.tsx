// app/blog/[slug]/page.tsx
import 'server-only';
import { notFound } from 'next/navigation';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import { getPostBySlug, getBlogPosts } from '@/app/data/blog';
import BlogView from '@/app/components/BlogView';
import { Metadata } from 'next';

// generateMetadata tidak berubah
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    const post = await getPostBySlug(params.slug);
    if (!post) return { title: 'Postingan Tidak Ditemukan' };
    return {
        title: `${post.title} | Blog Glisentra`,
        description: post.excerpt,
    };
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
    // Ambil data post utama dan semua post lain
    const post = await getPostBySlug(params.slug);
    const allPosts = await getBlogPosts();

    if (!post) {
        notFound();
    }

    // Logika pintar untuk artikel terkait, sama seperti di resep
    const relatedByCategory = allPosts.filter(
        p => p.category === post.category && p.slug !== post.slug
    );
    const otherPosts = allPosts.filter(
        p => p.category !== post.category && p.slug !== post.slug
    );
    const relatedPosts = [...relatedByCategory, ...otherPosts].slice(0, 3); // Ambil 3

    return (
        <div className="bg-white text-gray-800">
            <Header />
            {/* Kirim 'post' dan 'relatedPosts' sebagai props ke komponen client */}
            <BlogView post={post} relatedPosts={relatedPosts} />
            <Footer />
        </div>
    );
}