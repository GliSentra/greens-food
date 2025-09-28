// app/layout.tsx
import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import ScrollToTop from './components/ScrollToTop';
import BackToTopButton from './components/BackToTopButton';
import './globals.css';

// Konfigurasi font Poppins
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'] // Kita ambil beberapa ketebalan font
});

export const metadata: Metadata = {
  title: 'Glisentra Microgreens', // Anda bisa memperbarui title default di sini
  description: 'Microgreens organik segar untuk gaya hidup sehat.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/* Terapkan class font ke seluruh body */}
      <body className={poppins.className}>
        <ScrollToTop />
        {children}
        <BackToTopButton />
      </body>
    </html>
  );
}