import ResellerLayout from "@/app/components/ResellerLayout";
import Link from "next/link";
import { FaBoxOpen, FaChartLine, FaPlusCircle, FaHistory } from "react-icons/fa";

// Data dummy untuk desain
const dummyResellerData = {
    name: "Toko Berkah",
    salesThisMonth: 1250000,
    ordersThisMonth: 15,
    topProduct: "Red Radish",
    recentOrders: [
        { id: "PO-GLS-0015", date: "2025-10-09", total: 350000, status: "Menunggu Konfirmasi" },
        { id: "PO-GLS-0014", date: "2025-10-08", total: 150000, status: "Dikirim" },
        { id: "PO-GLS-0013", date: "2025-10-05", total: 275000, status: "Selesai" },
    ],
};

// Komponen helper untuk badge status
// (Bisa juga dipindah ke file terpisah seperti app/components/StatusBadge.tsx)
function StatusBadge({ status }: { status: string }) {
    const baseClasses = "px-2.5 py-1 rounded-full text-xs font-semibold inline-block";
    let colorClasses = "";

    switch (status.toLowerCase()) {
        case "menunggu konfirmasi":
            colorClasses = "bg-yellow-100 text-yellow-800"; break;
        case "dikirim":
            colorClasses = "bg-blue-100 text-blue-800"; break;
        case "selesai":
            colorClasses = "bg-green-100 text-green-800"; break;
        case "dibatalkan":
            colorClasses = "bg-red-100 text-red-800"; break;
        default:
            colorClasses = "bg-gray-100 text-gray-800";
    }
    return <span className={`${baseClasses} ${colorClasses}`}>{status}</span>;
}

// Komponen helper untuk kartu statistik
function StatCard({ icon, title, value }: { icon: React.ReactNode, title: string, value: string | number }) {
    return (
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
            <div className="flex items-center justify-between">
                <div className="flex-shrink-0 bg-green-100 text-green-600 p-3 rounded-full">
                    {icon}
                </div>
                <div className="text-right">
                    <p className="text-sm font-medium text-gray-500 truncate">{title}</p>
                    <p className="text-2xl font-bold text-gray-900">{value}</p>
                </div>
            </div>
        </div>
    );
}

export default function ResellerDashboardPage() {
    return (
        <ResellerLayout>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 min-h-screen">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Selamat Datang, {dummyResellerData.name}!</h1>
                <p className="text-gray-600">Ini adalah ringkasan performa penjualan Anda.</p>

                {/* Kartu Statistik */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                    <StatCard
                        icon={<FaChartLine size={24} />}
                        title="Penjualan Bulan Ini"
                        value={new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(dummyResellerData.salesThisMonth)}
                    />
                    <StatCard
                        icon={<FaBoxOpen size={24} />}
                        title="Pesanan Bulan Ini"
                        value={dummyResellerData.ordersThisMonth}
                    />
                    <StatCard
                        icon={<FaBoxOpen size={24} />} // Sebaiknya ganti ikon jika ada yang lebih cocok
                        title="Produk Terlaris"
                        value={dummyResellerData.topProduct}
                    />
                </div>

                {/* Aksi Cepat */}
                <div className="mt-10">
                    <h2 className="text-xl font-bold mb-4 text-gray-800">Aksi Cepat</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Link href="/reseller/order" className="bg-green-600 text-white p-6 rounded-lg shadow-md hover:bg-green-700 transition-colors flex items-center gap-4">
                            <FaPlusCircle size={32} />
                            <div>
                                <p className="font-bold text-lg">Buat Pesanan Baru</p>
                                <p className="text-sm text-green-100">Mulai Pre-Order untuk stok Anda.</p>
                            </div>
                        </Link>
                        <Link href="/reseller/history" className="bg-white border border-gray-200 p-6 rounded-lg shadow-md hover:bg-gray-50 transition-colors flex items-center gap-4">
                            <FaHistory size={32} className="text-gray-600" />
                            <div>
                                <p className="font-bold text-lg text-gray-800">Lihat Riwayat</p>
                                <p className="text-sm text-gray-500">Lacak semua pesanan Anda sebelumnya.</p>
                            </div>
                        </Link>
                    </div>
                </div>

                {/* Tabel Riwayat Pesanan Terbaru */}
                <div className="mt-10 bg-white p-6 rounded-lg shadow-md border border-gray-200">
                    <h2 className="text-xl font-bold mb-4 text-gray-800">Pesanan Terbaru</h2>
                    <div className="overflow-x-auto">
                        <table className="min-w-full text-left text-sm whitespace-nowrap">
                            <thead className="bg-gray-50 border-b-2 font-medium text-gray-600">
                                <tr>
                                    <th scope="col" className="px-6 py-4">ID Pesanan</th>
                                    <th scope="col" className="px-6 py-4">Tanggal</th>
                                    <th scope="col" className="px-6 py-4">Total</th>
                                    <th scope="col" className="px-6 py-4">Status</th>
                                    <th scope="col" className="px-6 py-4"><span className="sr-only">Aksi</span></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {dummyResellerData.recentOrders.map(order => (
                                    <tr key={order.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 font-medium text-gray-900">{order.id}</td>
                                        <td className="px-6 py-4 text-gray-600">{order.date}</td>
                                        <td className="px-6 py-4 text-gray-600">{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(order.total)}</td>
                                        <td className="px-6 py-4">
                                            <StatusBadge status={order.status} />
                                        </td>
                                        <td className="px-6 py-4">
                                            <Link href="/reseller/history" className="text-green-600 hover:text-green-800 font-semibold">
                                                Lihat Detail
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </ResellerLayout>
    );
}