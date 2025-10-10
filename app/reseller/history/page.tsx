// app/reseller/history/page.tsx
import ResellerLayout from "@/app/components/ResellerLayout";

// Data dummy untuk desain
const dummyOrders = [
    { id: "PO-GLS-0015", date: "2025-10-09", total: 350000, status: "Menunggu Konfirmasi" },
    { id: "PO-GLS-0014", date: "2025-10-08", total: 150000, status: "Dikirim" },
    { id: "PO-GLS-0013", date: "2025-10-05", total: 275000, status: "Selesai" },
    { id: "PO-GLS-0012", date: "2025-10-02", total: 95000, status: "Selesai" },
    { id: "PO-GLS-0011", date: "2025-09-28", total: 550000, status: "Dibatalkan" },
];

// Komponen untuk badge status yang berwarna
function StatusBadge({ status }: { status: string }) {
    const baseClasses = "px-2.5 py-1 rounded-full text-xs font-semibold";
    let colorClasses = "";

    switch (status.toLowerCase()) {
        case "menunggu konfirmasi":
            colorClasses = "bg-yellow-100 text-yellow-800";
            break;
        case "dikirim":
            colorClasses = "bg-blue-100 text-blue-800";
            break;
        case "selesai":
            colorClasses = "bg-green-100 text-green-800";
            break;
        case "dibatalkan":
            colorClasses = "bg-red-100 text-red-800";
            break;
        default:
            colorClasses = "bg-gray-100 text-gray-800";
    }

    return <span className={`${baseClasses} ${colorClasses}`}>{status}</span>;
}


export default function OrderHistoryPage() {
    return (
        <ResellerLayout>
            <div className="container mx-auto px-6 min-h-screen">
                <h1 className="text-3xl font-bold text-gray-900 mb-6">Riwayat Pesanan</h1>

                <div className="bg-white p-6 rounded-lg shadow border">
                    <div className="overflow-x-auto">
                        <table className="min-w-full text-left text-sm whitespace-nowrap">
                            <thead className="border-b-2 font-medium">
                                <tr>
                                    <th scope="col" className="px-4 py-3">ID Pesanan</th>
                                    <th scope="col" className="px-4 py-3">Tanggal</th>
                                    <th scope="col" className="px-4 py-3">Total</th>
                                    <th scope="col" className="px-4 py-3">Status</th>
                                    <th scope="col" className="px-4 py-3"><span className="sr-only">Aksi</span></th>
                                </tr>
                            </thead>
                            <tbody>
                                {dummyOrders.map(order => (
                                    <tr key={order.id} className="border-b hover:bg-gray-50">
                                        <td className="px-4 py-3 font-medium">{order.id}</td>
                                        <td className="px-4 py-3 text-gray-600">{order.date}</td>
                                        <td className="px-4 py-3 text-gray-600">{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(order.total)}</td>
                                        <td className="px-4 py-3">
                                            <StatusBadge status={order.status} />
                                        </td>
                                        <td className="px-4 py-3">
                                            <a href="#" className="text-green-600 hover:text-green-800 font-semibold">Lihat Detail</a>
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