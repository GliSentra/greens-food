// app/page.tsx
import { Metadata } from 'next';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import Keunggulan from './components/Keunggulan'; // <-- TAMBAHKAN INI
import FeaturedProducts from './components/FeaturedProducts';
import Edukasi from './components/Edukasi'; // <-- TAMBAHKAN INI
import Testimoni from './components/Testimoni'; // <-- TAMBAHKAN INI
import Footer from './components/Footer';
import CtaSection from './components/CtaSection';
import FadeInOnScroll from './components/FadeInOnScroll';

export const metadata: Metadata = {
  title: 'Glisentra - Microgreens Organik Segar untuk Gaya Hidup Sehat',
  description: 'Temukan kesegaran microgreens organik premium dari Glisentra. Dipanen segar setiap hari untuk nutrisi dan rasa terbaik. Sempurna untuk salad, smoothie, dan garnish.',
  keywords: ['microgreens', 'organik', 'sayuran segar', 'glisentra', 'makanan sehat'],
};

export default function HomePage() {
  return (
    <div className="bg-white text-gray-800">
      <Header />
      <main>

        <HeroSection />

        <FadeInOnScroll>
          <Keunggulan /> {/* <-- PANGGIL KOMPONEN DI SINI */}
        </FadeInOnScroll>

        <FadeInOnScroll>
          <FeaturedProducts />
        </FadeInOnScroll>

        <FadeInOnScroll>
          <Edukasi />    {/* <-- PANGGIL KOMPONEN DI SINI */}
        </FadeInOnScroll>
        <FadeInOnScroll>
          <Testimoni />  {/* <-- PANGGIL KOMPONEN DI SINI */}
        </FadeInOnScroll>
        <FadeInOnScroll>
          <CtaSection />
        </FadeInOnScroll>
      </main>
      <Footer />
    </div>
  );
}