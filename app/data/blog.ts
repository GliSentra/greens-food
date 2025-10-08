// app/data/blog.ts
import "server-only";
import { supabase } from "@/app/lib/supabase";

export type ContentBlock =
  | { type: "paragraph"; text: string }
  | { type: "subheading"; text: string }
  | { type: "blockquote"; text: string }
  | { type: "list"; items: string[] };

export type Post = {
  id: number;
  slug: string;
  title: string;
  category: string;
  author: string;
  publishedDate: string;
  image: string;
  alt: string;
  excerpt: string;
  views: number;
  likes: number;
  shares: number;
  content: ContentBlock[];
};

export async function getBlogPosts(): Promise<Post[]> {
  const { data, error } = await supabase
    .from("blogs")
    .select("*")
    .order("publishedDate", { ascending: false }); // Urutkan dari yang terbaru

  if (error) {
    console.error("Error fetching blog posts:", error);
    return [];
  }

  return data || [];
}

export async function getPostBySlug(slug: string): Promise<Post | undefined> {
  const { data, error } = await supabase
    .from("blogs")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) {
    console.error(`Error fetching post with slug ${slug}:`, error);
    return undefined;
  }

  return data || undefined;
}
