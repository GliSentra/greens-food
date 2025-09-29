// app/produk/[slug]/page.tsx
import { notFound } from 'next/navigation';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import { getProductBySlug } from '@/app/data/products';
import ProductView from '@/app/components/ProductView';
import { Metadata } from 'next';

// (Metadata bisa tetap di sini karena ini adalah Server Component)
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    const product = await getProductBySlug(params.slug);

    if (!product) {
        return {
            title: 'Produk Tidak Ditemukan | Glisentra',
            description: 'Produk yang Anda cari tidak ditemukan. Silakan kembali ke halaman produk untuk menemukan varian lainnya.',
        };
    }
    return {
        title: `${product.name} | Glisentra`,
        description: `Produk microgreens dari gisentra`
    }
}

export default async function ProductDetailPage({ params }: { params: { slug: string } }) {
    // 1. Ambil data di server
    const product = await getProductBySlug(params.slug);

    if (!product) {
        notFound();
    }

    // 2. Tampilkan UI di dalam komponen client, lewatkan data sebagai prop
    return (
        <div className="bg-white text-gray-800">
            <Header />
            <ProductView product={product} />
            <Footer />
        </div>
    );
}