// app/reseller/order/page.tsx
import 'server-only';
import ResellerLayout from "@/app/components/ResellerLayout";
import { getProducts } from "@/app/data/products";
import OrderForm from '@/app/components/OrderForm';

export default async function OrderPage() {
    const products = await getProducts();

    return (
        <ResellerLayout>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 min-h-screen">
                <h1 className="text-3xl font-bold text-gray-900 mb-6">Pesan Stok (Pre-Order)</h1>
                <OrderForm products={products} />
            </div>
        </ResellerLayout>
    );
}