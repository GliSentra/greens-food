// app/resep/loading.tsx
import Header from "../components/Header";
import Footer from "../components/Footer";
import RecipeCardSkeleton from "../components/RecipeCardSkeleton"; // Kita gunakan lagi skeleton kartu resep

function FeaturedRecipeSkeleton() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="relative w-full h-80 rounded-lg bg-gray-200 animate-pulse"></div>
            <div>
                <div className="h-5 w-1/4 bg-gray-200 rounded-full animate-pulse mb-4"></div>
                <div className="h-4 w-1/2 bg-gray-200 rounded-full animate-pulse mb-3"></div>
                <div className="h-8 w-3/4 bg-gray-200 rounded animate-pulse mb-4"></div>
                <div className="h-10 w-40 bg-gray-200 rounded-full animate-pulse"></div>
            </div>
        </div>
    );
}

export default function RecipesLoading() {
    return (
        <div className="bg-white">
            <Header />
            <main>
                {/* Skeleton untuk header halaman */}
                <section className="bg-gray-50 py-16">
                    <div className="container mx-auto px-6 text-center">
                        <div className="h-12 w-1/2 bg-gray-200 rounded animate-pulse mx-auto"></div>
                        <div className="h-5 w-3/4 bg-gray-300 rounded animate-pulse mx-auto mt-4"></div>
                    </div>
                </section>

                {/* Skeleton untuk daftar resep */}
                <section className="py-16 sm:py-20">
                    <div className="container mx-auto px-6 max-w-5xl">
                        <div className="mb-16">
                            <FeaturedRecipeSkeleton />
                        </div>

                        <div className="border-b mb-16"></div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                            <RecipeCardSkeleton />
                            <RecipeCardSkeleton />
                            <RecipeCardSkeleton />
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}