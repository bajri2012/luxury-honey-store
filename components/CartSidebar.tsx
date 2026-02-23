'use client';

import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface CartSidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function CartSidebar({ isOpen, onClose }: CartSidebarProps) {
    const router = useRouter();
    const { items, removeItem, updateQuantity, getTotalPrice } = useCartStore();
    const [mounted, setMounted] = useState(false);

    // Avoid hydration mismatch
    useEffect(() => {
        setMounted(true);
    }, []);

    const handleCheckout = () => {
        onClose();
        router.push('/checkout');
    };

    if (!mounted) return null;

    return (
        <>
            {/* Backdrop */}
            <div
                className={`fixed inset-0 bg-black/50 z-[100] transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
                    }`}
                onClick={onClose}
            />

            {/* Sidebar */}
            <div
                className={`fixed top-0 right-0 h-full w-full max-w-md bg-white z-[101] shadow-2xl transition-transform duration-500 ease-in-out transform ${isOpen ? 'translate-x-0' : 'translate-x-full'
                    }`}
                dir="rtl"
            >
                <div className="flex flex-col h-full">
                    {/* Header */}
                    <div className="p-6 border-b border-emerald-100 flex items-center justify-between bg-slate-50">
                        <div className="flex items-center gap-3">
                            <div className="bg-emerald-900 p-2 rounded-lg text-white">
                                <ShoppingBag size={20} />
                            </div>
                            <h2 className="text-xl font-bold text-emerald-900">سلة المشتريات</h2>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-emerald-100 rounded-full transition-colors text-emerald-900"
                        >
                            <X size={24} />
                        </button>
                    </div>

                    {/* Items List */}
                    <div className="flex-1 overflow-y-auto p-6">
                        {items.length === 0 ? (
                            <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                                <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-200">
                                    <ShoppingBag size={40} />
                                </div>
                                <p className="text-emerald-700 font-medium text-lg">سلتك فارغة حالياً</p>
                                <button
                                    onClick={onClose}
                                    className="px-6 py-2 border-2 border-emerald-900 text-emerald-900 rounded-xl font-bold hover:bg-emerald-900 hover:text-white transition-all"
                                >
                                    استمر في التسوق
                                </button>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                {items.map((item) => (
                                    <div key={item.id} className="flex gap-4 group">
                                        <div className="w-20 h-20 bg-slate-100 rounded-xl overflow-hidden flex-shrink-0 border border-emerald-50">
                                            {item.image ? (
                                                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-emerald-200">
                                                    <ShoppingBag size={20} />
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex justify-between items-start mb-1">
                                                <h3 className="font-bold text-emerald-900 truncate">{item.name}</h3>
                                                <button
                                                    onClick={() => removeItem(item.id)}
                                                    className="text-gray-400 hover:text-red-500 transition-colors"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                            <p className="text-amber-600 font-bold mb-3">{item.price} ر.س</p>

                                            <div className="flex items-center gap-3">
                                                <div className="flex items-center border border-emerald-100 rounded-lg p-1">
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                        className="p-1 hover:bg-emerald-50 rounded text-emerald-900 transition-colors"
                                                    >
                                                        <Minus size={14} />
                                                    </button>
                                                    <span className="w-8 text-center font-bold text-emerald-900">{item.quantity}</span>
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                        className="p-1 hover:bg-emerald-50 rounded text-emerald-900 transition-colors"
                                                    >
                                                        <Plus size={14} />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    {items.length > 0 && (
                        <div className="p-6 border-t border-emerald-100 bg-slate-50 space-y-4">
                            <div className="flex justify-between items-center text-lg">
                                <span className="text-emerald-700">الإجمالي المالي:</span>
                                <span className="font-bold text-emerald-900 text-2xl">{getTotalPrice()} ر.س</span>
                            </div>
                            <p className="text-xs text-gray-500 text-center">الأسعار تشمل ضريبة القيمة المضافة والشحن</p>
                            <button 
                                onClick={handleCheckout}
                                className="w-full py-4 bg-amber-500 hover:bg-amber-600 text-white rounded-2xl font-bold shadow-lg shadow-amber-200 transition-all transform hover:-translate-y-1"
                            >
                                إتمام الطلب
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
