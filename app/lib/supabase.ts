// app/lib/supabase.ts
import { createClient } from "@supabase/supabase-js";

// Menggunakan environment variables yang sudah kita atur
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Ini adalah 'konektor' yang akan kita gunakan di seluruh aplikasi
export const supabase = createClient(supabaseUrl, supabaseKey);
