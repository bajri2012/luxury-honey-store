'use client';

import { ShoppingCart } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';

interface Product {
    id: string;
    name: string;
    price: number;
    image: string | null;
}

export default function AddToCartButton({ product }: { product: Product }) {
    const addItem = useCartStore((state) => state.addItem);

    const handleAddToCart = () => {
        addItem({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
        });
    };

    return (
        <button
            onClick={handleAddToCart}
            className="w-full py-3 bg-emerald-900 hover:bg-emerald-800 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-all transform hover:-translate-y-1 active:scale-95"
        >
            <ShoppingCart size={18} />
            أضف للسلة
        </button>
    );
}
