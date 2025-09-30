// app/robots.ts
import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*", // Berlaku untuk semua robot (Googlebot, Bingbot, dll.)
      allow: "/", // Izinkan semua robot untuk menjelajahi semua halaman
    },
    // Beritahu lokasi sitemap kita
    sitemap: "https://glisentra.gonemaul.web.id/sitemap.xml", // GANTI dengan domain Anda
  };
}
