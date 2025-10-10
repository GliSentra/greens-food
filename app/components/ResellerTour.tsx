// app/components/ResellerTour.tsx
'use client';

import Joyride, { Step, CallBackProps } from 'react-joyride';

interface TourProps {
    run: boolean;
    callback: (data: CallBackProps) => void;
}

export default function ResellerTour({ run, callback }: TourProps) {
    // Definisi langkah-langkah tur tidak berubah
    const steps: Step[] = [
        {
            target: '#reseller-welcome',
            content: 'Selamat datang di Portal Reseller! Di sini Anda bisa melihat ringkasan performa dan melakukan aktivitas reseller Anda.',
            placement: 'bottom',
            title: 'Selamat Datang!',
        },
        {
            target: '#reseller-stats',
            content: 'Di sini Anda bisa memantau statistik penting seperti total penjualan dan jumlah pesanan secara sekilas.',
            placement: 'bottom',
            title: 'Statistik Performa',
        },
        {
            target: '#reseller-quick-actions',
            content: 'Gunakan tombol ini sebagai jalan pintas untuk aksi paling umum: membuat pesanan baru atau melihat riwayat semua pesanan Anda.',
            placement: 'bottom',
            title: 'Aksi Cepat',
        },
        {
            target: '#reseller-sidebar',
            content: 'Ini adalah pusat navigasi utama Anda. Semua menu penting untuk portal reseller ada di sini.',
            placement: 'right',
            title: 'Sidebar Navigasi',
        },
        {
            target: '#reseller-sidebar-order',
            content: 'Ini adalah menu yang paling penting. Klik di sini untuk mulai membuat pesanan stok (Pre-Order) baru.',
            placement: 'right',
            title: 'Membuat Pesanan',
        },
        {
            target: 'main', // Menargetkan tag <main>
            content: 'Semua konten dari menu yang Anda pilih akan ditampilkan di area utama ini. Selamat menjelajah!',
            placement: 'center',
            title: 'Area Konten',
        },
    ];

    return (
        <Joyride
            steps={steps}
            run={run}
            callback={callback}
            continuous
            showProgress
            showSkipButton
            styles={{
                options: {
                    primaryColor: '#16a34a',
                    textColor: '#333',
                    zIndex: 1000,
                },
            }}
        />
    );
}