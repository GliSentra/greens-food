// supabase/functions/increment-like/index.ts

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { corsHeaders } from "../_shared/cors.ts";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { slug, tableName } = await req.json();
    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    // Panggil fungsi SQL 'increment_likes'
    const { error } = await supabaseAdmin.rpc("increment_likes", {
      item_slug: slug,
      table_name: tableName,
    });
    if (error) throw error;

    // === BAGIAN BARU: PANGGIL API REVALIDATE ===
    try {
      const revalidatePaths = [`/${tableName}`, `/${tableName}/${slug}`];

      for (const path of revalidatePaths) {
        // Panggil API Route di Next.js untuk refresh cache
        await fetch(
          `${Deno.env.get("SITE_URL")}/api/revalidate?secret=${Deno.env.get(
            "REVALIDATE_SECRET_TOKEN"
          )}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ path: path }),
          }
        );
      }
    } catch (err) {
      console.error("Error revalidating:", err);
    }
    // ==========================================

    return new Response(
      JSON.stringify({ message: "Like incremented and revalidated" }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (err) {
    return new Response(String(err?.message ?? err), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
