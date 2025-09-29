// app/components/FeaturedProducts.tsx
import Image from 'next/image';
import Link from 'next/link';
import { getProducts } from '@/app/data/products';

export default async function FeaturedProducts() {
    const allProducts = await getProducts();
    const featuredProducts = [...allProducts] // Buat salinan array agar data asli tidak berubah
        .sort((a, b) => (b.sold || 0) - (a.sold || 0)) // Urutkan berdasarkan 'sold' dari terbesar ke terkecil
        .slice(0, 3); // Ambil 3 produk teratas
    return (
        <section className="py-16 sm:py-20 bg-gray-50">
            <div className="container mx-auto px-6">
                <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">
                    Produk Unggulan Kami
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {featuredProducts.map((product) => (
                        // Kita tambahkan 'group' di sini untuk efek hover pada tombol
                        <Link
                            key={product.id}
                            href={`/produk/${product.slug}`}
                            className="group bg-white rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300"
                        >
                            <div className="relative w-full h-56">
                                <Image
                                    src={product.image}
                                    alt={product.alt}
                                    layout="fill"
                                    objectFit="cover"
                                />
                            </div>
                            <div className="p-6 flex flex-col items-start">
                                {/* 1. Label Kategori Ditambahkan */}
                                <span className="text-xs font-semibold bg-green-100 text-green-800 px-2.5 py-1 rounded-full mb-3">
                                    {product.category}
                                </span>

                                <h3 className="text-xl font-bold mb-2 text-gray-900">
                                    {product.name}
                                </h3>

                                <p className="text-gray-600 text-sm mb-4 flex-grow">
                                    {product.shortDescription}
                                </p>

                                {/* 2. Tombol CTA Pengganti Harga */}
                                <div className="mt-auto inline-block bg-gray-200 text-gray-800 px-4 py-2 rounded-full font-semibold text-sm
                                group-hover:bg-green-600 group-hover:text-white transition-colors duration-300">
                                    Lihat Detail & Harga
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}