// app/resep/[slug]/loading.tsx
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

export default function RecipeDetailLoading() {
    return (
        <div className="bg-white">
            <Header />
            <main className="pt-0">
                {/* Skeleton untuk Breadcrumbs */}
                <div className="container mx-auto px-6 py-4">
                    <div className="h-5 w-1/3 bg-gray-200 rounded-full animate-pulse"></div>
                </div>

                <div className="container mx-auto px-6 max-w-4xl pb-12 sm:pb-16">
                    {/* === SKELETON UNTUK HERO DUA KOLOM (DESKTOP) === */}
                    <header className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-12">
                        {/* Kolom Gambar */}
                        <div className="w-full min-h-[300px] lg:min-h-[400px] rounded-lg bg-gray-200 animate-pulse"></div>

                        {/* Kolom Teks */}
                        <div className="flex flex-col justify-center space-y-5">
                            <div className="h-5 w-1/4 bg-gray-200 rounded-full animate-pulse"></div>
                            <div className="h-10 w-full bg-gray-200 rounded animate-pulse"></div>
                            <div className="h-8 w-3/4 bg-gray-200 rounded animate-pulse"></div>
                            <div className="h-5 w-1/2 bg-gray-200 rounded-full animate-pulse"></div>
                            <div className="h-6 w-5/6 bg-gray-200 rounded-full animate-pulse"></div>
                            <div className="h-10 w-full bg-gray-200 rounded animate-pulse mt-4"></div>
                        </div>
                    </header>

                    {/* Skeleton untuk Bahan & Langkah */}
                    <div className="bg-gray-50 rounded-lg p-6 sm:p-10">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                            <div className="md:col-span-1">
                                <div className="h-8 w-3/4 bg-gray-200 rounded animate-pulse mb-6"></div>
                                <div className="flex flex-wrap gap-3">
                                    <div className="h-8 w-24 bg-gray-200 rounded-full animate-pulse"></div>
                                    <div className="h-8 w-32 bg-gray-200 rounded-full animate-pulse"></div>
                                    <div className="h-8 w-28 bg-gray-200 rounded-full animate-pulse"></div>
                                </div>
                            </div>
                            <div className="md:col-span-2">
                                <div className="h-8 w-3/4 bg-gray-200 rounded animate-pulse mb-6"></div>
                                <div className="space-y-6">
                                    <div className="h-16 w-full bg-gray-200 rounded-lg animate-pulse"></div>
                                    <div className="h-16 w-full bg-gray-200 rounded-lg animate-pulse"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Skeleton untuk Resep Terkait */}
                <section className="pt-16 bg-gray-50">
                    {/* ... (skeleton resep terkait sudah cukup baik, bisa dibiarkan) ... */}
                </section>

            </main>
            <Footer />
        </div>
    );
}