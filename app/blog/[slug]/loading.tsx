// app/blog/[slug]/loading.tsx
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

export default function BlogPostLoading() {
    return (
        <div className="bg-white">
            <Header />
            <main className="pt-0">
                {/* Skeleton untuk Breadcrumbs */}
                <div className="container mx-auto px-6 py-4">
                    <div className="h-5 w-1/3 bg-gray-200 rounded-full animate-pulse"></div>
                </div>

                <div className="container mx-auto px-6 py-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

                        {/* Skeleton untuk Konten Utama */}
                        <div className="lg:col-span-2 space-y-8">
                            <div className="space-y-4">
                                <div className="h-12 w-3/4 bg-gray-200 rounded animate-pulse"></div>
                                <div className="h-5 w-1/2 bg-gray-200 rounded-full animate-pulse"></div>
                            </div>
                            <div className="w-full h-96 bg-gray-200 rounded-lg animate-pulse"></div>
                            <div className="space-y-4">
                                <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
                                <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
                                <div className="h-4 w-5/6 bg-gray-200 rounded animate-pulse"></div>
                                <div className="h-8 w-1/2 bg-gray-200 rounded animate-pulse mt-8"></div>
                                <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
                                <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse"></div>
                            </div>
                        </div>

                        {/* Skeleton untuk Sidebar */}
                        <aside className="lg:col-span-1 space-y-8">
                            <div className="p-6 bg-gray-100 rounded-lg animate-pulse">
                                <div className="h-6 w-1/2 bg-gray-200 rounded animate-pulse mb-4"></div>
                                <div className="h-10 w-full bg-gray-200 rounded animate-pulse"></div>
                            </div>
                            <div className="p-6 bg-gray-100 rounded-lg animate-pulse">
                                <div className="h-6 w-3/4 bg-gray-200 rounded animate-pulse mb-4"></div>
                                <div className="space-y-3">
                                    <div className="h-4 w-full bg-gray-200 rounded-full animate-pulse"></div>
                                    <div className="h-4 w-5/6 bg-gray-200 rounded-full animate-pulse"></div>
                                    <div className="h-4 w-full bg-gray-200 rounded-full animate-pulse"></div>
                                </div>
                            </div>
                            <div className="p-6 bg-gray-100 rounded-lg animate-pulse">
                                <div className="h-6 w-1/2 bg-gray-200 rounded animate-pulse mb-4"></div>
                                <div className="h-4 w-3/4 bg-gray-200 rounded-full animate-pulse mb-4"></div>
                                <div className="h-10 w-2/3 bg-gray-200 rounded-full animate-pulse"></div>
                            </div>
                        </aside>

                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}