// app/data/blog.ts
import "server-only";
import { sheets } from "@/app/lib/sheets";

const SPREADSHEET_ID = "1x6oER4RhuytrZYmVxKsa5UBurQhORc-vV1eB02Zgm5s";

// Tipe baru untuk blok konten yang lebih dinamis
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
  views: number; // <-- TAMBAHKAN
  likes: number; // <-- TAMBAHKAN
  shares: number;
  excerpt: string;
  content: ContentBlock[]; // Menggunakan tipe ContentBlock baru
};

export async function getBlogPosts(): Promise<Post[]> {
  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: "blog!A3:M", // Mengambil data dari sheet 'blog'
    });

    const rows = response.data.values || [];

    return rows.map((row): Post => {
      let content: ContentBlock[] = [];
      try {
        // Kolom konten (L atau indeks 11) berisi JSON
        content = JSON.parse(row[12] || "[]");
      } catch (e) {
        console.error(`Gagal parsing JSON untuk blog post ID ${row[0]}:`, e);
      }

      return {
        id: parseInt(row[0] || "0"),
        slug: row[1] || "",
        title: row[2] || "",
        category: row[3] || "GliSentra",
        author: row[4] || "",
        publishedDate: row[5] || "",
        image: row[6] || "",
        alt: row[7] || "",
        excerpt: row[8] || "",
        views: parseInt(row[9] || "0"),
        likes: parseInt(row[10] || "0"),
        shares: parseInt(row[11] || "0"),
        content: content,
      };
    });
  } catch (error) {
    console.error("Gagal mengambil data blog:", error);
    return [];
  }
}

// Fungsi getPostBySlug sekarang menggunakan getBlogPosts
export async function getPostBySlug(slug: string): Promise<Post | undefined> {
  const posts = await getBlogPosts();
  return posts.find((post) => post.slug === slug);
}

// export const blogData: Post[] = [
//   {
//     id: 1,
//     slug: "5-manfaat-mengejutkan-microgreens",
//     title: "5 Manfaat Mengejutkan Microgreens untuk Kesehatan Anda",
//     author: "Tim Glisentra",
//     publishedDate: "25 September 2025",
//     image: "https://images.pexels.com/photos/4052332/pexels-photo-4052332.jpeg",
//     alt: "Seseorang memegang nampan berisi microgreens segar yang baru dipanen",
//     views: 25100, // <-- TAMBAHKAN
//     likes: 1200, // <-- TAMBAHKAN
//     shares: 750,
//     excerpt:
//       "Lebih dari sekadar hiasan cantik, microgreens menyimpan segudang manfaat kesehatan yang mungkin belum Anda ketahui. Mari kita bongkar lima di antaranya.",
// content: [
//   {
//     type: "paragraph",
//     text: "Sering dianggap sebagai hiasan mahal di restoran mewah, microgreens sebenarnya adalah pembangkit tenaga nutrisi yang bisa dengan mudah Anda tambahkan ke dalam diet harian. Ukurannya yang kecil ternyata berbanding terbalik dengan kandungan gizinya yang luar biasa padat.",
//   },
//   { type: "subheading", text: "Nutrisi Super Terkonsentrasi" },
//   {
//     type: "paragraph",
//     text: "Penelitian menunjukkan bahwa microgreens bisa mengandung vitamin dan mineral 4 hingga 40 kali lebih banyak daripada versi dewasanya. Ini berarti sedikit taburan saja sudah memberikan dorongan gizi yang signifikan.",
//   },
//   {
//     type: "blockquote",
//     text: "Sedikit taburan microgreens di atas makanan Anda bukan hanya mempercantik hidangan, tetapi juga merupakan investasi cerdas untuk kesehatan jangka panjang.",
//   },
//   { type: "subheading", text: "Manfaat Lainnya" },
//   {
//     type: "list",
//     items: [
//       "Kaya akan Antioksidan: Membantu tubuh melawan kerusakan akibat radikal bebas.",
//       "Baik untuk Jantung: Beberapa jenis microgreens terbukti dapat membantu menurunkan kadar kolesterol.",
//       "Mudah Dicerna: Tubuh lebih mudah menyerap nutrisi dari sayuran muda ini.",
//     ],
//   },
// ]
//   },
//   {
//     id: 2,
//     slug: "cara-mudah-memulai-menanam-microgreens",
//     title: "Cara Mudah Memulai Menanam Microgreens di Rumah",
//     author: "Tim Glisentra",
//     publishedDate: "20 September 2025",
//     image: "https://images.pexels.com/photos/7663988/pexels-photo-7663988.jpeg",
//     alt: "Sebuah nampan tanam microgreens diletakkan di dekat jendela yang cerah",
//     views: 25100, // <-- TAMBAHKAN
//     likes: 1200, // <-- TAMBAHKAN
//     shares: 750,
//     excerpt:
//       "Anda tidak perlu lahan luas untuk menjadi petani. Pelajari cara menanam microgreens yang segar dan bergizi langsung dari dapur atau balkon Anda sendiri.",
// content: [
//   {
//     type: "paragraph",
//     text: "Menanam microgreens di rumah adalah kegiatan yang sangat memuaskan, mudah, dan cepat. Anda bisa memanen sayuran segar Anda sendiri hanya dalam 7-14 hari. Yang Anda butuhkan hanyalah beberapa peralatan dasar: nampan tanam, media tanam (seperti cocopeat), benih, dan botol semprot.",
//   },
//   { type: "subheading", text: "Langkah-langkah Awal" },
//   {
//     type: "list",
//     items: [
//       "Siapkan media tanam: Basahi cocopeat hingga lembab, lalu ratakan di atas nampan.",
//       "Tabur benih: Taburkan benih secara merata di seluruh permukaan media tanam.",
//       "Masa Gelap (Germinasi): Semprot dengan air, lalu tutup nampan selama 2-3 hari. Jaga agar tetap lembab.",
//       "Masa Terang: Setelah tunas tumbuh, buka penutup dan letakkan di tempat bercahaya (tidak langsung). Lanjutkan menyiram setiap hari hingga siap panen.",
//     ],
//   },
//   {
//     type: "blockquote",
//     text: "Kunci keberhasilan menanam microgreens adalah menjaga kelembaban media tanam, bukan membuatnya becek atau tergenang air.",
//   },
// ],
//   },
// ];
