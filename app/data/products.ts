// app/data/products.ts
import "server-only";
import { supabase } from "@/app/lib/supabase"; // Impor konektor Supabase

// Tipe data 'Product' tidak perlu diubah, karena strukturnya sama
export type Product = {
  id: number;
  name: string;
  slug: string;
  category: string;
  image: string;
  alt: string;
  shortDescription: string;
  longDescription: string;
  views: number;
  likes: number;
  shares: number;
  sold: number;
  details: {
    flavorProfile: string[];
    servingSuggestion: string[];
    healthBenefits: string[];
  };
  variants: {
    size: string;
    price: number;
  }[];
};

// Fungsi untuk mengambil SEMUA produk dari Supabase
export async function getProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from("products") // Dari tabel 'products'
    .select("*"); // Ambil semua kolom

  if (error) {
    console.error("Error fetching products:", error);
    return [];
  }

  return data || [];
}

// Fungsi untuk mengambil SATU produk berdasarkan slug dari Supabase
export async function getProductBySlug(
  slug: string
): Promise<Product | undefined> {
  const { data, error } = await supabase
    .from("products") // Dari tabel 'products'
    .select("*") // Ambil semua kolom
    .eq("slug", slug) // Di mana kolom 'slug' sama dengan slug yang diberikan
    .single(); // Kita hanya mengharapkan satu hasil

  if (error) {
    console.error(`Error fetching product with slug ${slug}:`, error);
    return undefined;
  }

  return data || undefined;
}
