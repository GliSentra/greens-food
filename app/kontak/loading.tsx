// app/kontak/loading.tsx
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function ContactLoading() {
    return (
        <div className="bg-white">
            <Header />
            <main className="py-20">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <div className="h-12 w-1/2 bg-gray-200 rounded animate-pulse mx-auto"></div>
                        <div className="h-5 w-3/4 bg-gray-300 rounded animate-pulse mx-auto mt-4"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        {/* Skeleton untuk Info Kontak */}
                        <div className="space-y-8">
                            <div className="flex items-center">
                                <div className="h-8 w-8 bg-gray-200 rounded-full animate-pulse mr-4"></div>
                                <div className="space-y-2 w-full">
                                    <div className="h-5 w-1/4 bg-gray-200 rounded animate-pulse"></div>
                                    <div className="h-4 w-1/2 bg-gray-200 rounded animate-pulse"></div>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <div className="h-8 w-8 bg-gray-200 rounded-full animate-pulse mr-4"></div>
                                <div className="space-y-2 w-full">
                                    <div className="h-5 w-1/4 bg-gray-200 rounded animate-pulse"></div>
                                    <div className="h-4 w-1/2 bg-gray-200 rounded animate-pulse"></div>
                                </div>
                            </div>
                        </div>

                        {/* Skeleton untuk Formulir */}
                        <div className="space-y-6">
                            <div className="h-14 w-full bg-gray-200 rounded-md animate-pulse"></div>
                            <div className="h-14 w-full bg-gray-200 rounded-md animate-pulse"></div>
                            <div className="h-32 w-full bg-gray-200 rounded-md animate-pulse"></div>
                            <div className="h-12 w-full bg-gray-200 rounded-lg animate-pulse"></div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}