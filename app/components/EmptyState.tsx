// app/components/EmptyState.tsx
import {
    HiOutlineDocumentSearch,
    HiOutlineShoppingBag,
    HiOutlineBookOpen,
    HiOutlineNewspaper
} from 'react-icons/hi';

interface EmptyStateProps {
    title?: string;
    message?: string;
    iconType?: 'product' | 'recipe' | 'blog'; // Prop baru untuk tipe ikon
}

export default function EmptyState({
    title = "Belum Ada Konten",
    message = "Silakan periksa kembali nanti.",
    iconType = 'product' // Nilai default jika tidak ditentukan
}: EmptyStateProps) {

    // Logika untuk memilih ikon berdasarkan prop iconType
    let IconComponent;
    switch (iconType) {
        case 'product':
            IconComponent = HiOutlineShoppingBag;
            break;
        case 'recipe':
            IconComponent = HiOutlineBookOpen;
            break;
        case 'blog':
            IconComponent = HiOutlineNewspaper;
            break;
        default:
            IconComponent = HiOutlineDocumentSearch;
    }

    return (
        <div className="text-center py-20 sm:py-32">
            <IconComponent className="mx-auto h-16 w-16 text-gray-400" />
            <h3 className="mt-4 text-2xl font-semibold text-gray-900">{title}</h3>
            <p className="mt-2 text-base text-gray-500">{message}</p>
        </div>
    );
}