// app/reseller/points/page.tsx
'use client'; // Dibutuhkan untuk interaktivitas tombol "Tukar"

import ResellerLayout from "@/app/components/ResellerLayout";
import { FaGift, FaStar } from "react-icons/fa";

// Data dummy untuk desain
const dummyPointsData = {
    balance: 1250,
    rewards: [
        { id: 1, title: "Diskon Ongkir Rp 10.000", points_cost: 500, type: "Voucher" },
        { id: 2, title: "Gratis 1 Pack Red Radish", points_cost: 800, type: "Produk Gratis" },
        { id: 3, title: "Voucher Diskon 5%", points_cost: 1500, type: "Voucher" },
    ],
    history: [
        { id: 1, date: "2025-10-10", description: "Poin dari Pesanan #PO-0013", amount: 275 },
        { id: 2, date: "2025-10-07", description: "Penukaran: Diskon Ongkir", amount: -500 },
        { id: 3, date: "2025-10-02", description: "Poin dari Pesanan #PO-0012", amount: 95 },
        { id: 4, date: "2025-09-28", description: "Poin dari Pesanan #PO-0011", amount: 550 },
    ],
};

export default function PointsPage() {
    const handleRedeem = (pointsCost: number) => {
        alert(`Fitur penukaran belum berfungsi. Anda mencoba menukar hadiah seharga ${pointsCost} poin.`);
    };

    return (
        <ResellerLayout>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Poin & Hadiah</h1>

                {/* Kartu Saldo Poin */}
                <div className="bg-green-600 text-white p-8 rounded-xl shadow-lg mb-10 text-center">
                    <p className="font-semibold">Total Poin Anda</p>
                    <div className="flex items-center justify-center gap-2 mt-2">
                        <FaStar className="text-yellow-300" size={32} />
                        <p className="text-4xl font-bold">{dummyPointsData.balance.toLocaleString('id-ID')}</p>
                    </div>
                </div>

                {/* Katalog Hadiah */}
                <div className="mb-10">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Tukarkan Poin Anda</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {dummyPointsData.rewards.map(reward => {
                            const canRedeem = dummyPointsData.balance >= reward.points_cost;
                            return (
                                <div key={reward.id} className="bg-white border border-gray-200 rounded-lg shadow-sm p-5 flex flex-col">
                                    <div className="flex-grow">
                                        <span className={`inline-block px-2 py-0.5 text-xs font-semibold rounded-full mb-2 ${reward.type === 'Voucher' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'}`}>
                                            {reward.type}
                                        </span>
                                        <h3 className="text-lg font-bold text-gray-900">{reward.title}</h3>
                                        <div className="flex items-center gap-1.5 mt-2 text-green-600 font-semibold">
                                            <FaStar className="text-yellow-400" />
                                            <span>{reward.points_cost.toLocaleString('id-ID')} Poin</span>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => handleRedeem(reward.points_cost)}
                                        disabled={!canRedeem}
                                        className="w-full mt-4 bg-green-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-700 transition duration-300 disabled:bg-gray-300 disabled:cursor-not-allowed"
                                    >
                                        Tukar
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Riwayat Transaksi Poin */}
                <div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Riwayat Poin</h2>
                    <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="min-w-full text-left text-sm whitespace-nowrap">
                                <thead className="bg-gray-50 font-medium text-gray-600">
                                    <tr>
                                        <th className="px-6 py-3">Tanggal</th>
                                        <th className="px-6 py-3">Deskripsi</th>
                                        <th className="px-6 py-3 text-right">Jumlah Poin</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {dummyPointsData.history.map(item => (
                                        <tr key={item.id}>
                                            <td className="px-6 py-4 text-gray-500">{item.date}</td>
                                            <td className="px-6 py-4 text-gray-800">{item.description}</td>
                                            <td className={`px-6 py-4 font-bold text-right ${item.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                                {item.amount > 0 ? '+' : ''}{item.amount.toLocaleString('id-ID')}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

            </div>
        </ResellerLayout>
    );
}