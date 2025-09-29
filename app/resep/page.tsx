// app/resep/page.tsx
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { getRecipes } from '@/app/data/recipes';
import { HiOutlineClock } from 'react-icons/hi';

// Metadata tidak berubah
export const metadata: Metadata = {
    title: 'Resep & Inspirasi Microgreens | Glisentra',
    description: 'Temukan resep sehat dan lezat menggunakan microgreens. Mulai dari salad, smoothie, hingga garnish untuk hidangan utama Anda.',
};

export default async function ResepPage() {
    const recipes = await getRecipes();
    return (
        <div className="bg-white text-gray-800">
            <Header />
            <main>
                {/* Seksi Judul Halaman */}
                <section className="bg-gray-50 py-16 sm:py-20">
                    <div className="container mx-auto px-6 text-center">
                        <h1 className="text-4xl sm:text-5xl font-extrabold">Resep & Inspirasi Segar</h1>
                        <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">
                            Bawa hidangan Anda ke level berikutnya. Temukan cara mudah dan lezat untuk menikmati kebaikan microgreens setiap hari.
                        </p>
                    </div>
                </section>

                {/* Galeri Resep */}
                <section className="py-16 sm:py-20">
                    <div className="container mx-auto px-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                            {recipes.map((recipe) => (
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
                                        <h3 className="text-xl font-bold mb-2 text-gray-900 flex-grow">{recipe.title}</h3>
                                        {/* Tombol CTA Baru */}
                                        <div className="mt-4 inline-block bg-gray-200 text-gray-800 px-4 py-2 rounded-full font-semibold text-sm self-start
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