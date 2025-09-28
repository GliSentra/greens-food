// app/components/FadeInOnScroll.tsx
'use client';

import { useInView } from 'react-intersection-observer';

type FadeInOnScrollProps = {
    children: React.ReactNode;
};

export default function FadeInOnScroll({ children }: FadeInOnScrollProps) {
    const { ref, inView } = useInView({
        triggerOnce: true, // Animasi hanya berjalan sekali
        threshold: 0.1,    // Elemen dianggap terlihat jika 10% bagiannya masuk layar
    });

    return (
        <div
            ref={ref}
            // Terapkan kelas CSS secara kondisional
            className={`transition-all duration-700 ease-in-out
                 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
            {children}
        </div>
    );
}