// app/components/OrderForm.tsx
'use client';

import { useState, useMemo } from 'react';
import { Product } from '@/app/data/products';
import Image from 'next/image';

// Tipe baru untuk item di keranjang yang lebih detail
type CartItem = {
    productId: number;
    productName: string;
    variantSize: string;
    quantity: number;
    price: number;
    subtotal: number;
};

export default function OrderForm({ products }: { products: Product[] }) {
    // State baru untuk menangani kuantitas per varian
    // Format: { productId: { size: quantity } }
    const [quantities, setQuantities] = useState<Record<number, Record<string, number>>>({});
    const [activeCategory, setActiveCategory] = useState('Semua');

    const categories = ['Semua', ...new Set(products.map(p => p.category))];

    const handleQuantityChange = (productId: number, size: string, quantityStr: string) => {
        const quantity = parseInt(quantityStr) || 0;
        const newQuantity = Math.max(0, quantity);

        setQuantities(prev => ({
            ...prev,
            [productId]: {
                ...prev[productId],
                [size]: newQuantity,
            },
        }));
    };

    const filteredProducts = useMemo(() => {
        if (activeCategory === 'Semua') return products;
        return products.filter(p => p.category === activeCategory);
    }, [products, activeCategory]);

    const { cartItems, totalPrice } = useMemo(() => {
        const items: CartItem[] = [];
        for (const product of products) {
            if (quantities[product.id]) {
                for (const size in quantities[product.id]) {
                    const quantity = quantities[product.id][size];
                    if (quantity > 0) {
                        const variant = product.variants.find(v => v.size === size);
                        const price = variant?.price_reseller || 0;
                        items.push({
                            productId: product.id,
                            productName: product.name,
                            variantSize: size,
                            quantity: quantity,
                            price: price,
                            subtotal: price * quantity,
                        });
                    }
                }
            }
        }
        const total = items.reduce((sum, item) => sum + item.subtotal, 0);
        return { cartItems: items, totalPrice: total };
    }, [products, quantities]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Pesanan Siap Dikirim:", { items: cartItems, total: totalPrice });
        alert("Pesanan disimulasikan! Lihat hasilnya di console browser (F12).");
    };

    return (
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* Kolom Kiri: Daftar Produk & Filter */}
            <div className="lg:col-span-2 space-y-6">
                {/* Filter Kategori */}
                <div className="flex items-center gap-2 flex-wrap bg-white p-4 rounded-xl shadow-md border">
                    <span className="font-semibold mr-2 text-sm text-gray-600">Filter Kategori:</span>
                    {categories.map(category => (
                        <button key={category} type="button" onClick={() => setActiveCategory(category)} className={`px-3 py-1 text-sm rounded-full transition-colors ${activeCategory === category ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>
                            {category}
                        </button>
                    ))}
                </div>

                {/* Daftar Produk */}
                <div className="space-y-4">
                    {filteredProducts.map(product => (
                        <div key={product.id} className="bg-white p-4 rounded-xl shadow-md border border-gray-200">
                            <div className="flex items-center gap-4 mb-4">
                                <Image src={product.image} alt={product.alt} width={64} height={64} className="rounded-md object-cover flex-shrink-0" />
                                <p className="font-bold text-lg text-gray-900">{product.name}</p>
                            </div>
                            <div className="space-y-3 pl-4 border-l-2">
                                {product.variants.map(variant => (
                                    <div key={variant.size} className="grid grid-cols-3 items-center gap-2">
                                        <span className="font-medium text-sm text-slate-800">{variant.size}</span>
                                        <span className="text-sm text-green-600 font-semibold">{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(variant.price_reseller || 0)}</span>
                                        <input
                                            type="number"
                                            min="0"
                                            value={quantities[product.id]?.[variant.size] || ''}
                                            onChange={(e) => handleQuantityChange(product.id, variant.size, e.target.value)}
                                            className="w-20 p-2 border border-green-600 text-green-600 rounded-md text-center focus:outline-none focus:ring-2 focus:ring-green-500"
                                            placeholder="0"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Kolom Kanan: Ringkasan Pesanan */}
            <div className="lg:col-span-1 lg:sticky top-28">
                <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
                    <h2 className="text-xl font-bold border-b pb-3 mb-4 text-slate-800">Ringkasan Pesanan</h2>
                    {cartItems.length === 0 ? (
                        <p className="text-gray-500">Keranjang Anda kosong.</p>
                    ) : (
                        <div className="space-y-3 mb-4 max-h-60 overflow-y-auto pr-2">
                            {cartItems.map(item => (
                                <div key={item.productId} className="flex justify-between items-center text-sm">
                                    <div>
                                        <p className="font-semibold text-gray-800">{item.productName}</p>
                                        <p className="text-gray-500">Varian : {item.variantSize} </p>
                                        <p className="text-gray-500">x {item.quantity}</p>
                                    </div>
                                    <p className="font-semibold text-gray-900">{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format((item.price || 0) * item.quantity)}</p>
                                </div>
                            ))}
                        </div>
                    )}
                    <div className="border-t pt-4">
                        <div className="flex justify-between font-bold text-lg text-gray-900">
                            <span>Total</span>
                            <span>{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(totalPrice)}</span>
                        </div>
                        <button type="submit" disabled={cartItems.length === 0} className="w-full mt-6 bg-green-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-green-700 transition duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed">
                            Buat Pesanan (PO)
                        </button>
                    </div>
                </div>
            </div>
        </form>
    );
}