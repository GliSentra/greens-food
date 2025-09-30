// app/resep/page.tsx
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { getRecipes } from '@/app/data/recipes';
import { FaRegClock, FaUsers } from 'react-icons/fa';

// Metadata tidak berubah
export const metadata: Metadata = {
    title: 'Resep & Inspirasi Microgreens | Glisentra',
    description: 'Temukan resep sehat dan lezat menggunakan microgreens. Mulai dari salad, smoothie, hingga garnish untuk hidangan utama Anda.',
};

export default async function ResepPage() {
    const allRecipes = await getRecipes();

    const featuredRecipe = allRecipes[0];
    const otherRecipes = allRecipes.slice(1);
    return (
        <div className="bg-white text-gray-800">
            <Header />
            <main>
                <section className="relative flex flex-col justify-center items-center text-center px-6 
                           py-10 md:py-20">
                    <Image
                        src="https://images.pexels.com/photos/9986228/pexels-photo-9986228.jpeg"
                        alt="Berbagai macam resep & inspirasi"
                        layout="fill"
                        objectFit="cover"
                        priority
                        className="z-0 brightness-[.40]" // Efek gelap pada gambar
                    />
                    <div className="relative z-10 text-white">
                        <h1 className="text-4xl sm:text-5xl font-extrabold">Resep & Inspirasi Segar</h1>
                        <p className="text-base sm:text-lg mt-4 max-w-2xl mx-auto">
                            Bawa hidangan Anda ke level berikutnya. Temukan cara mudah dan lezat untuk menikmati kebaikan microgreens setiap hari.
                        </p>
                    </div>
                </section>

                <section className="py-16 sm:py-20">
                    <div className="container mx-auto px-6 max-w-5xl">
                        {/* Resep Unggulan */}
                        {featuredRecipe && (
                            <article className="group mb-16 bg-white p-6 sm:p-8 rounded-xl border border-gray-200 shadow-md hover:shadow-lg transition-shadow duration-300">
                                <Link href={`/resep/${featuredRecipe.slug}`}>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                                        <div className="relative w-full h-80 rounded-lg overflow-hidden">
                                            <Image
                                                src={featuredRecipe.image}
                                                alt={featuredRecipe.alt}
                                                layout="fill"
                                                objectFit="cover"
                                                className="transition-transform duration-500 group-hover:scale-105"
                                            />
                                        </div>
                                        <div>
                                            <span className="inline-block bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-1 rounded-full mb-3">{featuredRecipe.category}</span>
                                            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 group-hover:text-green-600 transition-colors duration-300 mb-4">{featuredRecipe.title}</h2>
                                            <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                                                <span className="flex items-center gap-1.5"><FaRegClock /> {featuredRecipe.prepTime}</span>
                                                <span className="flex items-center gap-1.5"><FaUsers /> {featuredRecipe.servings}</span>
                                            </div>
                                            <div className="inline-block bg-gray-200 text-gray-800 px-4 py-2 rounded-full font-semibold text-sm group-hover:bg-green-600 group-hover:text-white transition-colors duration-300">
                                                Lihat Resep
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </article>
                        )}

                        {/* Garis Pemisah */}
                        {otherRecipes.length > 0 && <div className="border-b-2 rounded-full border-gray-500 mb-16"></div>}

                        {/* Grid Resep Lainnya */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                            {otherRecipes.map((recipe) => (
                                <Link key={recipe.id} href={`/resep/${recipe.slug}`} className="group flex flex-col bg-white rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 hover:shadow-xl">
                                    <div className="relative w-full h-56">
                                        <Image
                                            src={recipe.image}
                                            alt={recipe.alt}
                                            layout="fill"
                                            objectFit="cover"
                                            className="transition-transform duration-300 group-hover:scale-110"
                                        />
                                    </div>
                                    <div className="p-6 flex flex-col flex-grow">
                                        <span className="inline-block bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-1 rounded-full mb-3 self-start">{recipe.category}</span>
                                        <h3 className="text-xl font-bold mb-3 text-gray-900 flex-grow">{recipe.title}</h3>

                                        {/* === METRIK BARU DITAMBAHKAN DI SINI === */}
                                        <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                                            <span className="flex items-center gap-1.5"><FaRegClock /> {recipe.prepTime}</span>
                                            <span className="flex items-center gap-1.5"><FaUsers /> {recipe.servings}</span>
                                        </div>

                                        <div className="mt-auto inline-block bg-gray-200 text-gray-800 px-4 py-2 rounded-full font-semibold text-sm self-start
                                    group-hover:bg-green-600 group-hover:text-white transition-colors duration-300">
                                            Lihat Resep
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}