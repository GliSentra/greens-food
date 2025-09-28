// app/data/faq.ts

export type FaqItem = {
  question: string;
  answer: string;
};

export const faqData: FaqItem[] = [
  {
    question: "Apa itu microgreens?",
    answer:
      "Microgreens adalah sayuran muda yang dipanen pada tahap awal pertumbuhannya, biasanya saat daun pertamanya (kotiledon) muncul. Meskipun ukurannya kecil, mereka memiliki rasa yang lebih intens dan kandungan nutrisi yang jauh lebih padat dibandingkan sayuran dewasa.",
  },
  {
    question: "Bagaimana cara menyimpan microgreens agar tetap segar?",
    answer:
      "Simpan microgreens Anda di dalam wadah tertutup di dalam kulkas. Pastikan mereka tetap kering; jangan dicuci sampai Anda siap untuk menggunakannya. Dengan penyimpanan yang benar, mereka bisa bertahan segar hingga 7-10 hari.",
  },
  {
    question: "Apakah microgreens lebih bernutrisi daripada sayuran biasa?",
    answer:
      "Ya, secara umum. Penelitian menunjukkan bahwa microgreens dapat mengandung tingkat vitamin, mineral, dan antioksidan 4 hingga 40 kali lebih tinggi per gramnya dibandingkan dengan versi dewasanya. Sedikit taburan saja sudah memberikan dorongan gizi yang signifikan.",
  },
  {
    question: "Bagaimana cara terbaik menggunakan microgreens?",
    answer:
      "Sangat serbaguna! Anda bisa menaburkannya di atas salad, sup, pizza, atau telur. Mereka juga enak sebagai isian sandwich dan wrap, atau dicampurkan ke dalam smoothie untuk tambahan nutrisi. Kunjungi halaman Resep kami untuk lebih banyak inspirasi!",
  },
  {
    question: "Apakah produk Glisentra ditanam secara organik?",
    answer:
      "Tentu saja. Kami menanam semua microgreens kami di lingkungan yang terkontrol, hanya menggunakan benih non-GMO, air murni, dan cahaya, tanpa pestisida atau herbisida sama sekali. Kualitas dan kemurnian adalah prioritas utama kami.",
  },
];
