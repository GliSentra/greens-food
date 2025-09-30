// app/faq/loading.tsx
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function FaqLoading() {
    return (
        <div className="bg-white">
            <Header />
            <main>
                <section className="bg-gray-50 py-16">
                    <div className="container mx-auto px-6 text-center">
                        <div className="h-12 w-1/2 bg-gray-200 rounded animate-pulse mx-auto"></div>
                        <div className="h-5 w-3/4 bg-gray-300 rounded animate-pulse mx-auto mt-4"></div>
                    </div>
                </section>

                <section className="py-16 sm:py-20">
                    <div className="container mx-auto px-6 max-w-3xl">
                        <div className="space-y-8">
                            {[...Array(5)].map((_, i) => (
                                <div key={i} className="border-b border-gray-200 pb-4">
                                    <div className="h-6 w-full bg-gray-200 rounded animate-pulse"></div>
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