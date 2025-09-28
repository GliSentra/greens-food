// app/components/Keunggulan.tsx
import { FaLeaf, FaHeart } from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi';

const features = [
    {
        icon: <FaLeaf size={48} className="text-green-600" />,
        title: '100% Organik',
        description: 'Ditanam tanpa pestisida, hanya dengan air dan cahaya matahari untuk kebaikan murni.',
    },
    {
        icon: <HiSparkles size={48} className="text-green-600" />,
        title: 'Panen Segar Setiap Hari',
        description: 'Kami memanen microgreens setiap hari berdasarkan pesanan untuk menjamin kesegaran maksimal.',
    },
    {
        icon: <FaHeart size={48} className="text-green-600" />,
        title: 'Kaya Nutrisi',
        description: 'Setiap helainya padat dengan vitamin dan mineral yang baik untuk kesehatan Anda.',
    },
];

export default function Keunggulan() {
    return (
        <section className="py-16 sm:py-20 bg-white">
            <div className="container mx-auto px-6 text-center">
                <h2 className="text-3xl sm:text-4xl font-bold mb-12">Mengapa Memilih Glisentra?</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {features.map((feature) => (
                        <div key={feature.title} className="flex flex-col items-center">
                            {feature.icon}
                            <h3 className="text-xl font-semibold my-4">{feature.title}</h3>
                            <p className="text-gray-600">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}