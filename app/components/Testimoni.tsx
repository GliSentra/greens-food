// app/components/Testimoni.tsx

const testimonials = [
    {
        quote: "Microgreens dari Glisentra benar-benar mengubah salad saya! Sangat segar dan renyah. Pengirimannya juga cepat sekali.",
        name: "Andini Putri",
        title: "Pecinta Makanan Sehat",
    },
    {
        quote: "Sebagai seorang chef, kualitas adalah segalanya. Glisentra selalu memberikan produk terbaik yang membuat hidangan saya naik kelas.",
        name: "Chef Budi",
        title: "Kepala Koki, Resto Enak",
    },
    {
        quote: "Anak-anak saya jadi suka makan sayur karena microgreens ini. Saya campurkan di smoothie mereka setiap pagi. Terima kasih Glisentra!",
        name: "Rina Wijaya",
        title: "Ibu Rumah Tangga",
    },
];

export default function Testimoni() {
    return (
        <section className="py-16 sm:py-20 bg-white">
            <div className="container mx-auto px-6 text-center">
                <h2 className="text-3xl sm:text-4xl font-bold mb-12">Apa Kata Mereka?</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
                    {testimonials.map((testimonial) => (
                        <div key={testimonial.name} className="bg-gray-100 p-8 rounded-lg">
                            <p className="text-gray-600 italic mb-6">"{testimonial.quote}"</p>
                            <p className="font-bold text-gray-800">{testimonial.name}</p>
                            <p className="text-sm text-gray-500">{testimonial.title}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}