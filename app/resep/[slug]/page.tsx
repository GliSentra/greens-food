import 'server-only'
import { notFound } from "next/navigation";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import { getRecipeBySlug, getRecipes } from "@/app/data/recipes";
import RecipeView from "@/app/components/RecipeView";
import { Metadata } from 'next';

export const revalidate = 180;
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    const recipe = await getRecipeBySlug(params.slug);

    if (!recipe) {
        return {
            title: 'Resep Tidak Ditemukan | Glisentra',
            description: 'Resep yang Anda cari tidak ditemukan. Silakan kembali ke halaman resep untuk menemukan inspirasi lainnya.',
        };
    }
    return {
        title: `${recipe.title} | Glisentra`,
        description: `Pelajari cara membuat ${recipe.title} dengan microgreens segar dari Glisentra.`,
    }
}

export default async function RecipeDetailPage({ params }: { params: { slug: string } }) {
    const recipe = await getRecipeBySlug(params.slug);
    const allRecipes = await getRecipes();
    if (!recipe) {
        notFound();
    }

    const recipeSchema = {
        '@context': 'https://schema.org/',
        '@type': 'Recipe',
        name: recipe.title,
        image: [recipe.image],
        author: {
            '@type': 'Person',
            name: recipe.author,
        },
        datePublished: new Date().toISOString(), // Idealnya ini dari data, kita gunakan tanggal hari ini
        description: `Pelajari cara membuat ${recipe.title} yang lezat dengan microgreens segar dari Glisentra.`,
        prepTime: `PT${recipe.prepTime.match(/\d+/)?.[0] || 0}M`, // Mengubah "15 Menit" menjadi format "PT15M"
        recipeIngredient: recipe.ingredients,
        recipeInstructions: recipe.instructions.map((step, index) => ({
            '@type': 'HowToStep',
            name: `Langkah ${index + 1}`,
            text: step,
        })),
    };

    const relatedByCategory = allRecipes.filter(
        r => r.category === recipe.category && r.slug !== recipe.slug
    );
    const otherRecipes = allRecipes.filter(
        r => r.category !== recipe.category && r.slug !== recipe.slug
    );
    const relatedRecipes = [...relatedByCategory, ...otherRecipes].slice(0, 3);

    return (
        <div className="bg-white text-gray-800">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(recipeSchema) }}
            />
            <Header />
            <RecipeView recipe={recipe} relatedRecipes={relatedRecipes} />
            <Footer />
        </div>
    );
}