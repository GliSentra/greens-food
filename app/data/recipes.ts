// app/data/recipes.ts
import "server-only";
import { sheets } from "@/app/lib/sheets";

const SPREADSHEET_ID = "1x6oER4RhuytrZYmVxKsa5UBurQhORc-vV1eB02Zgm5s";

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
  views: number; // <-- TAMBAH
  likes: number; // <-- TAMBAH
  shares: number;
  ingredients: string[];
  instructions: string[];
};

export async function getRecipes(): Promise<Recipe[]> {
  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: "recipes!A3:N", // Mengambil data dari sheet 'recipes'
    });

    const rows = response.data.values || [];

    return rows.map(
      (row): Recipe => ({
        id: parseInt(row[0] || "0"),
        slug: row[1] || "",
        title: row[2] || "",
        category: row[3] || "",
        prepTime: row[4] || "",
        servings: row[5] || "",
        author: row[6] || "",
        image: row[7] || "",
        alt: row[8] || "",
        views: parseInt(row[9] || "0"),
        likes: parseInt(row[10] || "0"),
        shares: parseInt(row[11] || "0"),
        ingredients: String(row[12] || "")
          .split(";")
          .map((item) => item.trim())
          .filter(Boolean),
        instructions: String(row[13] || "")
          .split(";")
          .map((item) => item.trim())
          .filter(Boolean),
      })
    );
  } catch (error) {
    console.error("Gagal mengambil data resep:", error);
    return [];
  }
}

// Fungsi getRecipeBySlug sekarang menggunakan getRecipes
export async function getRecipeBySlug(
  slug: string
): Promise<Recipe | undefined> {
  const recipes = await getRecipes();
  return recipes.find((recipe) => recipe.slug === slug);
}

// export const recipesData: Recipe[] = [
//   {
//     id: 1,
//     slug: "salad-segar-pelangi-microgreens",
//     title: "Salad Segar Pelangi dengan Vinaigrette Lemon",
//     category: "Salad",
//     prepTime: "15 Menit",
//     servings: "2 Porsi",
//     author: "Dapur Glisentra",
//     image: "https://images.pexels.com/photos/1211887/pexels-photo-1211887.jpeg",
//     alt: "Salad segar berwarna-warni dengan taburan microgreens di atasnya",
//     views: 12500, // <-- TAMBAH
//     likes: 823, // <-- TAMBAH
//     shares: 451,
//     ingredients: [
//       "2 cangkir sayuran hijau campur (selada, bayam)",
//       "1/2 cangkir tomat ceri, belah dua",
//       "1/4 timun, iris tipis",
//       "1/4 cangkir microgreens (campuran Radish & Pea Shoots)",
//       "2 sdm minyak zaitun",
//       "1 sdm jus lemon segar",
//       "Garam dan lada secukupnya",
//     ],
//     instructions: [
//       "Dalam mangkuk besar, campurkan sayuran hijau, tomat ceri, dan irisan timun.",
//       "Dalam mangkuk kecil, kocok bersama minyak zaitun, jus lemon, garam, dan lada untuk membuat saus vinaigrette.",
//       "Tuangkan vinaigrette di atas salad dan aduk hingga merata.",
//       "Sajikan segera di piring dan taburi dengan microgreens segar di atasnya untuk tambahan rasa dan nutrisi.",
//     ],
//   },
//   {
//     id: 2,
//     slug: "smoothie-hijau-penambah-energi",
//     title: "Smoothie Hijau Penambah Energi",
//     category: "Smoothie",
//     prepTime: "5 Menit",
//     servings: "1 Gelas",
//     author: "Dapur Glisentra",
//     image:
//       "https://images.unsplash.com/photo-1611497426695-412abe2f287b?q=80&w=1040&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//     alt: "Gelas berisi smoothie hijau kental dengan hiasan microgreens",
//     views: 12500, // <-- TAMBAH
//     likes: 823, // <-- TAMBAH
//     shares: 451,
//     ingredients: [
//       "1 buah pisang beku",
//       "1 genggam bayam segar",
//       "1/4 cangkir Sunflower Shoots Microgreens",
//       "1 cangkir susu almond (atau susu pilihan)",
//       "1 sdm biji chia",
//     ],
//     instructions: [
//       "Masukkan semua bahan ke dalam blender.",
//       "Blender dengan kecepatan tinggi hingga semua bahan halus dan tercampur sempurna.",
//       "Tuang ke dalam gelas dan sajikan segera.",
//       "Jika suka, hias dengan beberapa helai sunflower shoots di atasnya.",
//     ],
//   },
//   {
//     id: 3,
//     slug: "roti-panggang-alpukat-micro-radish",
//     title: "Roti Panggang Alpukat & Telur dengan Micro Radish Pedas",
//     category: "Sarapan",
//     prepTime: "10 Menit",
//     servings: "1 Porsi",
//     author: "Dapur Glisentra",
//     image: "https://images.pexels.com/photos/566566/pexels-photo-566566.jpeg",
//     alt: "Roti panggang dengan alpukat, telur mata sapi, dan microgreens",
//     views: 12500, // <-- TAMBAH
//     likes: 823, // <-- TAMBAH
//     shares: 451,
//     ingredients: [
//       "1 lembar roti sourdough atau roti gandum",
//       "1/2 buah alpukat matang",
//       "1 butir telur",
//       "Sedikit perasan lemon",
//       "Garam, lada hitam, dan bubuk cabai (chili flakes)",
//       "1 genggam Red Radish Microgreens",
//     ],
//     instructions: [
//       "Panggang roti hingga berwarna keemasan.",
//       "Sementara itu, masak telur sesuai selera (mata sapi, rebus, atau orak-arik).",
//       "Lumatkan alpukat di mangkuk kecil, campur dengan perasan lemon, garam, dan lada.",
//       "Oleskan alpukat lumat di atas roti panggang.",
//       "Letakkan telur di atasnya, lalu taburi dengan bubuk cabai dan Red Radish Microgreens yang melimpah.",
//     ],
//   },
//   {
//     id: 4,
//     slug: "salmon-pesto-micro-arugula",
//     title: "Salmon Panggang dengan Pesto Micro Arugula",
//     category: "Hidangan Utama",
//     prepTime: "20 Menit",
//     servings: "1 Porsi",
//     author: "Dapur Glisentra",
//     image: "https://images.pexels.com/photos/806361/pexels-photo-806361.jpeg",
//     alt: "Sepotong salmon panggang disajikan dengan saus hijau pesto dan hiasan microgreens",
//     views: 12500, // <-- TAMBAH
//     likes: 823, // <-- TAMBAH
//     shares: 451,
//     ingredients: [
//       "1 potong (150gr) fillet salmon",
//       "1 sdm minyak zaitun",
//       "Garam dan lada",
//       "Untuk Pesto: 1 cangkir Arugula Microgreens, 1/4 cangkir kacang mede/kenari, 1 siung bawang putih, 2 sdm keju parmesan parut, 3 sdm minyak zaitun",
//     ],
//     instructions: [
//       "Untuk membuat pesto: Blender Arugula Microgreens, kacang, bawang putih, dan keju parmesan. Sambil terus diblender, tuangkan minyak zaitun perlahan hingga saus mengental. Sisihkan.",
//       "Bumbui fillet salmon dengan garam dan lada di kedua sisi.",
//       "Panaskan minyak zaitun di wajan anti lengket. Masak salmon, dimulai dari sisi kulit, selama 4-5 menit per sisi atau hingga matang.",
//       "Sajikan salmon di atas piring, lalu olesi dengan satu sendok penuh pesto Micro Arugula segar.",
//     ],
//   },
//   {
//     id: 5,
//     slug: "quinoa-bowl-tunas-brokoli",
//     title: "Quinoa Bowl Sehat dengan Tunas Brokoli",
//     category: "Mangkuk Sehat",
//     prepTime: "15 Menit (jika quinoa sudah matang)",
//     servings: "1 Porsi",
//     author: "Dapur Glisentra",
//     image: "https://images.pexels.com/photos/1199979/pexels-photo-1199979.jpeg",
//     alt: "Mangkuk berisi quinoa, sayuran, dan taburan tunas brokoli di atasnya",
//     views: 12500, // <-- TAMBAH
//     likes: 823, // <-- TAMBAH
//     shares: 451,
//     ingredients: [
//       "1 cangkir quinoa yang sudah matang",
//       "1/2 cangkir buncis kalengan, bilas",
//       "1/4 cangkir tomat ceri, belah dua",
//       "1/4 cangkir timun, potong dadu",
//       "1 genggam besar Broccoli Sprouts (Tunas Brokoli)",
//       "Saus: 2 sdm minyak zaitun, 1 sdm jus lemon, garam, lada",
//     ],
//     instructions: [
//       "Siapkan saus dengan mencampurkan minyak zaitun, jus lemon, garam, dan lada dalam wadah kecil.",
//       "Dalam mangkuk saji, masukkan quinoa matang, buncis, tomat ceri, dan timun.",
//       "Tuangkan saus di atasnya dan aduk hingga semua bahan terlapisi dengan baik.",
//       "Taburi dengan Broccoli Sprouts yang melimpah tepat sebelum disajikan untuk menjaga kerenyahannya.",
//     ],
//   },
// ];
