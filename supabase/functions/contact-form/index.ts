// supabase/functions/contact-form/index.ts

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { corsHeaders } from "../_shared/cors.ts";

Deno.serve(async (req) => {
  // Tangani preflight request (penting untuk CORS)
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    // Ambil data dari body request
    const { name, email, message } = await req.json();

    // Buat Supabase client dengan akses admin (aman karena ini di server)
    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    // Masukkan data ke dalam tabel 'messages'
    const { error } = await supabaseAdmin.from("messages").insert({
      name,
      email,
      message,
      is_read: false,
    });

    if (error) {
      throw error;
    }

    return new Response(
      JSON.stringify({ message: "Pesan berhasil terkirim!" }),
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
