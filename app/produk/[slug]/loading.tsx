// app/produk/[slug]/loading.tsx
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

export default function ProductDetailLoading() {
    return (
        <div className="bg-white">
            <Header />
            <main className="pt-0">
                {/* Skeleton untuk Breadcrumbs */}
                <div className="container mx-auto px-6 py-4">
                    <div className="h-5 w-1/3 bg-gray-200 rounded-full animate-pulse"></div>
                </div>

                <div className="container mx-auto px-6 pb-12 sm:pb-16">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                        {/* Skeleton untuk Gambar */}
                        <div className="w-full aspect-square rounded-lg bg-gray-200 animate-pulse"></div>

                        {/* Skeleton untuk Info Produk */}
                        <div className="space-y-6">
                            <div className="h-10 w-3/4 bg-gray-200 rounded animate-pulse"></div>
                            <div className="h-8 w-1/2 bg-gray-200 rounded animate-pulse"></div>
                            <div className="h-5 w-full bg-gray-200 rounded-full animate-pulse border-b pb-6"></div>
                            <div className="space-y-2">
                                <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
                                <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
                                <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse"></div>
                            </div>
                            <div className="h-16 w-full bg-gray-200 rounded-lg animate-pulse"></div>
                            <div className="h-14 w-full bg-gray-200 rounded-lg animate-pulse"></div>
                        </div>
                    </div>

                    {/* Skeleton untuk Tab */}
                    <div className="mt-16 sm:mt-20">
                        <div className="border-b border-gray-200">
                            <div className="flex space-x-8">
                                <div className="h-8 w-20 bg-gray-200 rounded-t-md animate-pulse"></div>
                                <div className="h-8 w-32 bg-gray-200 rounded-t-md animate-pulse"></div>
                                <div className="h-8 w-28 bg-gray-200 rounded-t-md animate-pulse"></div>
                            </div>
                        </div>
                        <div className="pt-8 space-y-3">
                            <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
                            <div className="h-4 w-5/6 bg-gray-200 rounded animate-pulse"></div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}