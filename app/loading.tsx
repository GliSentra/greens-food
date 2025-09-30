// app/loading.tsx
import Header from './components/Header';
import Footer from './components/Footer';

// Komponen skeleton untuk kartu produk
function ProductCardSkeleton() {
    return (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="w-full h-56 bg-gray-200 animate-pulse"></div>
            <div className="p-6">
                <div className="h-4 w-1/4 bg-gray-200 rounded-full animate-pulse mb-4"></div>
                <div className="h-6 w-3/4 bg-gray-200 rounded animate-pulse mb-6"></div>
                <div className="h-8 w-1/2 bg-gray-200 rounded-full animate-pulse"></div>
            </div>
        </div>
    );
}

export default function Loading() {
    // Ini adalah tampilan yang akan muncul saat page.tsx sedang memuat data
    return (
        <div className="bg-white text-gray-800">
            <Header />
            <main>
                {/* Skeleton untuk Hero Section */}
                <section className="h-screen bg-gray-200 animate-pulse"></section>

                {/* Skeleton untuk Keunggulan */}
                <section className="py-16 sm:py-20 bg-white">
                    <div className="container mx-auto px-6 text-center">
                        <div className="h-10 w-1/2 bg-gray-200 rounded animate-pulse mx-auto mb-12"></div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                            {[...Array(3)].map((_, i) => (
                                <div key={i} className="flex flex-col items-center">
                                    <div className="h-12 w-12 bg-gray-200 rounded-full animate-pulse"></div>
                                    <div className="h-6 w-3/4 bg-gray-200 rounded animate-pulse my-4"></div>
                                    <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
                                    <div className="h-4 w-5/6 bg-gray-200 rounded animate-pulse mt-2"></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Skeleton untuk Produk Terlaris */}
                <section className="py-16 sm:py-20 bg-gray-50">
                    <div className="container mx-auto px-6">
                        <div className="h-10 w-1/2 bg-gray-200 rounded animate-pulse mx-auto mb-12"></div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <ProductCardSkeleton />
                            <ProductCardSkeleton />
                            <ProductCardSkeleton />
                        </div>
                    </div>
                </section>

                {/* Skeleton untuk CTA */}
                <section className="bg-gray-200 animate-pulse">
                    <div className="container mx-auto px-6 py-16 text-center">
                        <div className="h-10 w-3/4 bg-gray-300 rounded animate-pulse mx-auto"></div>
                        <div className="h-4 w-1/2 bg-gray-300 rounded animate-pulse mx-auto mt-6 mb-8"></div>
                        <div className="h-12 w-48 bg-gray-300 rounded-full animate-pulse mx-auto"></div>
                    </div>
                </section>

            </main>
            <Footer />
        </div>
    );
}