// app/components/Breadcrumbs.tsx
import Link from 'next/link';
import { HiChevronRight } from 'react-icons/hi';

type Crumb = {
    label: string;
    href: string;
};

type BreadcrumbsProps = {
    crumbs: Crumb[];
};

export default function Breadcrumbs({ crumbs }: BreadcrumbsProps) {
    return (
        <nav aria-label="Breadcrumb" className="container mx-auto px-6 py-4">
            <ol className="flex items-center space-x-2 text-sm text-gray-500 whitespace-nowrap overflow-x-auto">
                {crumbs.map((crumb, index) => (
                    <li key={index} className="flex items-center">
                        {index > 0 && (
                            <HiChevronRight className="w-5 h-5 flex-shrink-0" />
                        )}

                        {/* Jika ini bukan crumb terakhir, tampilkan seperti biasa */}
                        {index < crumbs.length - 1 ? (
                            <Link href={crumb.href} className="hover:underline hover:text-gray-800 flex-shrink-0">
                                {crumb.label}
                            </Link>
                        ) : (
                            // Jika ini crumb terakhir (judul halaman), terapkan truncate
                            <span
                                className="font-semibold text-gray-700 truncate"
                                title={crumb.label} // Tambahkan title agar full text bisa dilihat saat hover di desktop
                            >
                                {crumb.label}
                            </span>
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    );
}