// app/components/ProductCardSkeleton.tsx

export default function ProductCardSkeleton() {
    return (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            {/* Placeholder untuk Gambar */}
            <div className="w-full h-56 bg-gray-200 animate-pulse"></div>
            <div className="p-6">
                {/* Placeholder untuk Kategori */}
                <div className="h-4 w-1/4 bg-gray-200 rounded-full animate-pulse mb-4"></div>
                {/* Placeholder untuk Judul */}
                <div className="h-6 w-3/4 bg-gray-200 rounded animate-pulse mb-3"></div>
                {/* Placeholder untuk Deskripsi */}
                <div className="h-4 w-full bg-gray-200 rounded animate-pulse mb-5"></div>
                {/* Placeholder untuk Harga */}
                <div className="h-6 w-1/2 bg-gray-200 rounded animate-pulse"></div>
            </div>
        </div>
    );
}