// app/sitemap.ts
import { MetadataRoute } from "next";
import { getProducts } from "@/app/data/products";
import { getRecipes } from "@/app/data/recipes";
import { getBlogPosts } from "@/app/data/blog";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // PENTING: Ganti dengan URL domain Anda saat sudah live
  const baseUrl = "https://glisentra.gonemaul.web.id";

  // 1. Ambil semua data dinamis
  const products = await getProducts();
  const recipes = await getRecipes();
  const posts = await getBlogPosts();

  // 2. Buat URL untuk setiap item dinamis
  const productUrls = products.map((product) => ({
    url: `${baseUrl}/produk/${product.slug}`,
    lastModified: new Date(),
    priority: 0.8,
  }));

  const recipeUrls = recipes.map((recipe) => ({
    url: `${baseUrl}/resep/${recipe.slug}`,
    lastModified: new Date(),
    priority: 0.7,
  }));

  const postUrls = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(),
    priority: 0.6,
  }));

  // 3. Definisikan URL untuk halaman statis
  const staticUrls = [
    { url: baseUrl, lastModified: new Date(), priority: 1.0 },
    { url: `${baseUrl}/produk`, lastModified: new Date(), priority: 0.9 },
    { url: `${baseUrl}/resep`, lastModified: new Date(), priority: 0.8 },
    { url: `${baseUrl}/blog`, lastModified: new Date(), priority: 0.7 },
    { url: `${baseUrl}/tentang`, lastModified: new Date(), priority: 0.5 },
    { url: `${baseUrl}/kontak`, lastModified: new Date(), priority: 0.5 },
    { url: `${baseUrl}/faq`, lastModified: new Date(), priority: 0.5 },
  ];

  // 4. Gabungkan semuanya
  return [...staticUrls, ...productUrls, ...recipeUrls, ...postUrls];
}
