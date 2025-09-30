// app/produk/loading.tsx
import Header from "../components/Header";
import Footer from "../components/Footer";

// Komponen skeleton untuk satu baris item zig-zag
function ZigZagSkeleton() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="relative w-full h-80 rounded-lg bg-gray-200 animate-pulse"></div>
            <div className="flex flex-col items-start">
                <div className="h-5 w-1/4 bg-gray-200 rounded-full animate-pulse mb-4"></div>
                <div className="h-8 w-3/4 bg-gray-200 rounded animate-pulse mb-4"></div>
                <div className="h-4 w-full bg-gray-200 rounded animate-pulse mb-2"></div>
                <div className="h-4 w-5/6 bg-gray-200 rounded animate-pulse mb-5"></div>
                <div className="h-6 w-1/2 bg-gray-200 rounded animate-pulse mb-6"></div>
                <div className="h-12 w-48 bg-gray-200 rounded-full animate-pulse"></div>
            </div>
        </div>
    );
}

export default function ProductsLoading() {
    return (
        <div className="bg-white">
            <Header />
            <main>
                {/* Skeleton untuk header halaman */}
                <section className="bg-gray-50 border-b border-gray-200">
                    <div className="container mx-auto px-6 py-10 text-center">
                        <div className="h-10 w-1/3 bg-gray-200 mx-auto rounded animate-pulse mb-6"></div>
                        <div className="h-5 w-3/4 bg-gray-200 mx-auto rounded-full animate-pulse"></div>
                    </div>
                </section>

                {/* Skeleton untuk daftar produk */}
                <section className="py-16">
                    <div className="container mx-auto px-6">
                        <div className="space-y-16">
                            <ZigZagSkeleton />
                            <ZigZagSkeleton />
                            <ZigZagSkeleton />
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}