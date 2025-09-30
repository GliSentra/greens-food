// app/components/BlogCardSkeleton.tsx

export default function BlogCardSkeleton() {
    return (
        <div className="group">
            {/* Placeholder untuk Gambar */}
            <div className="w-full h-56 bg-gray-200 animate-pulse rounded-lg mb-6"></div>

            {/* Placeholder untuk Kategori */}
            <div className="h-5 w-1/4 bg-gray-200 rounded-full animate-pulse mb-3"></div>

            {/* Placeholder untuk Metadata (Tanggal & Penulis) */}
            <div className="h-4 w-1/2 bg-gray-200 rounded-full animate-pulse mb-2"></div>

            {/* Placeholder untuk Judul */}
            <div className="h-6 w-full bg-gray-200 rounded animate-pulse mb-3"></div>

            {/* Placeholder untuk Excerpt */}
            <div className="space-y-2">
                <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse"></div>
            </div>
        </div>
    );
}