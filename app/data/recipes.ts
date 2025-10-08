// app/data/recipes.ts
import "server-only";
import { supabase } from "@/app/lib/supabase";

export type Recipe = {
  id: number;
  slug: string;
  title: string;
  category: string;
  prepTime: string;
  servings: string;
  author: string;
  image: string;
  alt: string;
  views: number;
  likes: number;
  shares: number;
  ingredients: string[];
  instructions: string[];
};

export async function getRecipes(): Promise<Recipe[]> {
  const { data, error } = await supabase.from("recipes").select("*");

  if (error) {
    console.error("Error fetching recipes:", error);
    return [];
  }

  return data || [];
}

export async function getRecipeBySlug(
  slug: string
): Promise<Recipe | undefined> {
  const { data, error } = await supabase
    .from("recipes")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) {
    console.error(`Error fetching recipe with slug ${slug}:`, error);
    return undefined;
  }

  return data || undefined;
}
