// app/components/RecipeCardSkeleton.tsx

export default function RecipeCardSkeleton() {
    return (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            {/* Placeholder untuk Gambar */}
            <div className="w-full h-56 bg-gray-200 animate-pulse"></div>
            <div className="p-6 flex flex-col flex-grow">
                {/* Placeholder untuk Kategori */}
                <div className="h-5 w-1/3 bg-gray-200 rounded-full animate-pulse mb-4 self-start"></div>
                {/* Placeholder untuk Judul */}
                <div className="h-6 w-3/4 bg-gray-200 rounded animate-pulse mb-3"></div>
                <div className="flex-grow"></div>
                {/* Placeholder untuk Metrik */}
                <div className="h-4 w-full bg-gray-200 rounded-full animate-pulse mb-4"></div>
                {/* Placeholder untuk Tombol */}
                <div className="h-10 w-1/2 bg-gray-200 rounded-full animate-pulse self-start"></div>
            </div>
        </div>
    );
}