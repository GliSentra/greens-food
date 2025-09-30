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
        title: `${product.name} | Beli Microgreens Segar di Glisentra`,
        description: `Jual ${product.name} segar, microgreens organik kategori ${product.category}. ${product.shortDescription} Pesan sekarang dari Glisentra di Kediri.`,
        keywords: ['microgreens', product.name, product.category, 'sayuran organik', 'Glisentra', 'Kediri'],
    }
}

export default async function ProductDetailPage({ params }: { params: { slug: string } }) {
    // 1. Ambil data di server
    const product = await getProductBySlug(params.slug);

    if (!product) {
        notFound();
    }

    const productSchema = {
        '@context': 'https://schema.org/',
        '@type': 'Product',
        name: product.name,
        description: product.longDescription,
        image: product.image,
        sku: product.slug, // Menggunakan slug sebagai ID unik produk
        brand: {
            '@type': 'Brand',
            name: 'Glisentra',
        },
        // Karena ada varian harga, kita gunakan AggregateOffer
        offers: {
            '@type': 'AggregateOffer',
            priceCurrency: 'IDR',
            lowPrice: Math.min(...product.variants.map(v => v.price)),
            highPrice: Math.max(...product.variants.map(v => v.price)),
            offerCount: product.variants.length,
            url: `https://glisentra.gonemaul.web.id/produk/${product.slug}`, // Ganti dengan domain Anda nanti
            availability: 'https://schema.org/InStock',
        },
    };

    // 2. Tampilkan UI di dalam komponen client, lewatkan data sebagai prop
    return (
        <div className="bg-white text-gray-800">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
            />
            <Header />
            <ProductView product={product} />
            <Footer />
        </div>
    );
}