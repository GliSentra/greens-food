// app/kontak/page.tsx
import { Metadata } from 'next';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ContactView from '../components/ContactView';

// SEO Metadata untuk halaman Kontak
export const metadata: Metadata = {
    title: 'Hubungi Glisentra | Pesan Microgreens atau Ajukan Pertanyaan',
    description: 'Hubungi kami untuk pemesanan, pertanyaan tentang produk microgreens, atau peluang kerjasama. Kami siap membantu Anda.',
};

export default function KontakPage() {
    return (
        <div className="bg-white text-gray-800">
            <Header />
            <main className="py-16 sm:py-20">
                <ContactView />
            </main>
            <Footer />
        </div>
    );
}