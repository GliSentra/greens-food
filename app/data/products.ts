import "server-only";
import { sheets } from "@/app/lib/sheets";

// GANTI DENGAN SPREADSHEET ID ANDA
const SPREADSHEET_ID = "1x6oER4RhuytrZYmVxKsa5UBurQhORc-vV1eB02Zgm5s";

// Tipe data Product tidak berubah
export type Product = {
  id: number;
  slug: string;
  name: string;
  category: string;
  shortDescription: string;
  longDescription: string;
  image: string;
  alt: string;
  sold: number; // <-- TAMBAH
  likes: number; // <-- TAMBAH
  shares: number;
  variants: {
    size: string;
    price: number;
  }[];
  details: {
    flavorProfile: string[];
    servingSuggestion: string[];
    healthBenefits: string[];
  };
};

// Fungsi baru untuk mengambil semua produk
export async function getProducts(): Promise<Product[]> {
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: SPREADSHEET_ID,
    range: "products!A3:O", // Mengambil data dari sheet 'products' mulai dari baris 2
  });

  const rows = response.data.values || [];

  // Ubah data dari array menjadi objek
  return rows.map(
    (row): Product => ({
      id: parseInt(row[0]),
      name: row[1],
      slug: row[2],
      category: row[3],
      image: row[4],
      alt: row[5],
      shortDescription: row[6],
      longDescription: row[7],
      likes: parseInt(row[8]),
      shares: parseInt(row[9]),
      sold: parseInt(row[10]),
      // Ubah string JSON menjadi objek
      variants: JSON.parse(row[14] || "[]"),
      details: {
        flavorProfile: String(row[11] || "")
          .split(";")
          .map((item) => item.trim())
          .filter(Boolean),
        servingSuggestion: String(row[12] || "")
          .split(";")
          .map((item) => item.trim())
          .filter(Boolean),
        healthBenefits: String(row[13] || "")
          .split(";")
          .map((item) => item.trim())
          .filter(Boolean),
      },
    })
  );
}

// Fungsi baru untuk mengambil satu produk berdasarkan slug
export async function getProductBySlug(
  slug: string
): Promise<Product | undefined> {
  const products = await getProducts();
  return products.find((product) => product.slug === slug);
}

// export const productsData = [
//   {
//     id: 1,
//     name: "Red Radish Microgreens",
//     slug: "red-radish-microgreens",
//     image: "https://images.pexels.com/photos/7657967/pexels-photo-7657967.jpeg",
//     alt: "Microgreens Red Radish dengan batang kemerahan yang segar",
//     category: "Radish",
//     shortDescription: "Rasa pedas menyegarkan dengan warna merah yang memikat.",
//     likes: 1500,
//     shares: 820,
//     sold: 2300,
//     longDescription:
//       "Microgreens Red Radish adalah salah satu varian paling populer karena warnanya yang cerah dan rasanya yang khas. Ia tumbuh dengan cepat dan memberikan tendangan rasa pedas yang mirip dengan lobak dewasa, menjadikannya tambahan yang sempurna untuk membangkitkan selera makan.",
//     variants: [
//       { size: "50gr", price: 15000 },
//       { size: "100gr", price: 25000 },
//       { size: "250gr", price: 55000 },
//     ],
//     details: {
//       flavorProfile: ["Pedas", "Renyah", "Segar", "Sedikit Getir"],
//       servingSuggestion: [
//         "Garnish di atas taco, sup, dan steak.",
//         "Campuran dalam salad untuk tendangan rasa pedas.",
//         "Topping untuk roti panggang alpukat.",
//         "Penambah warna dan rasa pada hidangan telur.",
//       ],
//       healthBenefits: [
//         "Kaya akan Vitamin C & E.",
//         "Sumber antioksidan yang baik untuk imunitas.",
//         "Membantu proses detoksifikasi tubuh.",
//         "Mendukung kesehatan pencernaan.",
//       ],
//     },
//   },
//   {
//     id: 2,
//     name: "Sunflower Shoots",
//     slug: "sunflower-shoots",
//     image: "https://images.pexels.com/photos/262847/pexels-photo-262847.jpeg",
//     alt: "Sunflower shoots yang tebal dan hijau segar",
//     category: "Radish",
//     likes: 1500,
//     shares: 820,
//     sold: 2300,
//     shortDescription:
//       "Tekstur renyah dengan rasa gurih seperti biji bunga matahari.",
//     longDescription:
//       "Sunflower Shoots, atau kecambah bunga matahari, adalah microgreens yang unik dengan batang tebal dan daun yang renyah. Rasanya yang gurih dan sedikit manis menjadikannya favorit banyak orang, bahkan untuk dimakan langsung sebagai camilan sehat.",
//     variants: [
//       { size: "50gr", price: 18000 },
//       { size: "100gr", price: 30000 },
//     ],
//     details: {
//       flavorProfile: ["Gurih (Nutty)", "Manis", "Renyah", "Juicy"],
//       servingSuggestion: [
//         "Dimakan langsung sebagai camilan sehat.",
//         "Sebagai dasar utama untuk salad.",
//         "Isian sandwich atau wrap untuk tekstur renyah.",
//         "Dicampurkan ke dalam adonan telur dadar.",
//       ],
//       healthBenefits: [
//         "Sumber protein nabati yang sangat baik.",
//         "Mengandung lesitin yang baik untuk fungsi otak.",
//         "Kaya akan Vitamin D, E, dan seng (zinc).",
//         "Mendukung kesehatan tulang dan kulit.",
//       ],
//     },
//   },
//   {
//     id: 3,
//     name: "Pea Shoots",
//     slug: "pea-shoots",
//     image: "https://images.pexels.com/photos/8951499/pexels-photo-8951499.jpeg",
//     alt: "Pea shoots dengan sulur melengkung yang khas",
//     category: "Radish",
//     likes: 1500,
//     shares: 820,
//     sold: 2300,
//     shortDescription: "Rasa manis dan renyah seperti kacang polong segar.",
//     longDescription:
//       "Pea Shoots adalah salah satu microgreens yang paling disukai karena rasanya yang manis dan teksturnya yang renyah. Dengan sulur-sulur kecilnya yang unik, ia tidak hanya lezat tetapi juga sangat indah sebagai hiasan hidangan.",
//     variants: [
//       { size: "50gr", price: 17000 },
//       { size: "100gr", price: 28000 },
//     ],
//     details: {
//       flavorProfile: ["Gurih (Nutty)", "Manis", "Renyah", "Juicy"],
//       servingSuggestion: [
//         "Dimakan langsung sebagai camilan sehat.",
//         "Sebagai dasar utama untuk salad.",
//         "Isian sandwich atau wrap untuk tekstur renyah.",
//         "Dicampurkan ke dalam adonan telur dadar.",
//       ],
//       healthBenefits: [
//         "Sumber protein nabati yang sangat baik.",
//         "Mengandung lesitin yang baik untuk fungsi otak.",
//         "Kaya akan Vitamin D, E, dan seng (zinc).",
//         "Mendukung kesehatan tulang dan kulit.",
//       ],
//     },
//   },
//   {
//     id: 4,
//     name: "Broccoli Sprouts",
//     slug: "broccoli-sprouts",
//     image: "https://images.pexels.com/photos/262847/pexels-photo-262847.jpeg",
//     alt: "Kecambah brokoli yang rimbun dan sehat",
//     category: "Radish",
//     likes: 1500,
//     shares: 820,
//     sold: 2300,
//     shortDescription:
//       "Sang superfood, padat dengan nutrisi peningkat imunitas.",
//     longDescription:
//       "Dikenal luas sebagai salah satu makanan paling sehat di dunia, kecambah brokoli adalah sumber sulforaphane yang luar biasa, sebuah senyawa yang diteliti secara ekstensif karena potensi anti-kankernya. Rasanya lebih lembut daripada brokoli dewasa.",
//     variants: [
//       { size: "50gr", price: 20000 },
//       { size: "100gr", price: 35000 },
//     ],
//     details: {
//       flavorProfile: ["Gurih (Nutty)", "Manis", "Renyah", "Juicy"],
//       servingSuggestion: [
//         "Dimakan langsung sebagai camilan sehat.",
//         "Sebagai dasar utama untuk salad.",
//         "Isian sandwich atau wrap untuk tekstur renyah.",
//         "Dicampurkan ke dalam adonan telur dadar.",
//       ],
//       healthBenefits: [
//         "Sumber protein nabati yang sangat baik.",
//         "Mengandung lesitin yang baik untuk fungsi otak.",
//         "Kaya akan Vitamin D, E, dan seng (zinc).",
//         "Mendukung kesehatan tulang dan kulit.",
//       ],
//     },
//   },
//   {
//     id: 5,
//     name: "Arugula Microgreens",
//     slug: "arugula-microgreens",
//     image: "https://images.pexels.com/photos/7657967/pexels-photo-7657967.jpeg",
//     alt: "Microgreens arugula dengan daun hijau gelap",
//     category: "Radish",
//     likes: 1500,
//     shares: 820,
//     sold: 2300,
//     shortDescription:
//       "Tendangan rasa pedas dan nutty untuk membangkitkan selera.",
//     longDescription:
//       "Bagi para pencinta rasa pedas, microgreens arugula adalah pilihan yang tepat. Ia menangkap esensi rasa arugula dewasa dalam bentuk yang lebih kecil dan lembut, memberikan sentuhan gourmet pada hidangan apa pun.",
//     variants: [
//       { size: "50gr", price: 16000 },
//       { size: "100gr", price: 26000 },
//     ],
//     details: {
//       flavorProfile: ["Gurih (Nutty)", "Manis", "Renyah", "Juicy"],
//       servingSuggestion: [
//         "Dimakan langsung sebagai camilan sehat.",
//         "Sebagai dasar utama untuk salad.",
//         "Isian sandwich atau wrap untuk tekstur renyah.",
//         "Dicampurkan ke dalam adonan telur dadar.",
//       ],
//       healthBenefits: [
//         "Sumber protein nabati yang sangat baik.",
//         "Mengandung lesitin yang baik untuk fungsi otak.",
//         "Kaya akan Vitamin D, E, dan seng (zinc).",
//         "Mendukung kesehatan tulang dan kulit.",
//       ],
//     },
//   },
// ];

// // Fungsi untuk mengambil data tidak berubah
// export async function getProductBySlug(slug: string) {
//   return productsData.find((product) => product.slug === slug);
// }
