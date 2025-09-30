// app/tentang/loading.tsx
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function AboutLoading() {
    return (
        <div className="bg-white">
            <Header />
            <main>
                {/* Skeleton untuk Hero Section */}
                <section className="h-72 w-full bg-gray-200 animate-pulse"></section>

                {/* Skeleton untuk Misi dan Visi */}
                <section className="py-20">
                    <div className="container mx-auto px-6 text-center max-w-3xl">
                        <div className="h-10 w-3/4 bg-gray-200 rounded animate-pulse mx-auto mb-6"></div>
                        <div className="space-y-3">
                            <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
                            <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
                            <div className="h-4 w-5/6 bg-gray-200 rounded animate-pulse mx-auto"></div>
                        </div>
                    </div>
                </section>

                {/* Skeleton untuk Proses Kami */}
                <section className="py-20 bg-gray-50">
                    <div className="container mx-auto px-6 text-center">
                        <div className="h-10 w-1/2 bg-gray-200 rounded animate-pulse mx-auto mb-12"></div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                            {[...Array(3)].map((_, i) => (
                                <div key={i} className="flex flex-col items-center">
                                    <div className="h-10 w-10 bg-gray-200 rounded-full animate-pulse"></div>
                                    <div className="h-6 w-3/4 bg-gray-200 rounded animate-pulse my-4"></div>
                                    <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}