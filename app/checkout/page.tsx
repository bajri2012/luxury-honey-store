'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/store/cartStore';
import { createOrder } from '@/app/actions/checkout';
import { ShoppingBag, CreditCard, ChevronLeft, Loader2, MapPin, User, Phone } from 'lucide-react';

export default function CheckoutPage() {
    const router = useRouter();
    const { items, getTotalPrice, clearCart } = useCartStore();
    const [loading, setLoading] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        city: '',
        street: '',
    });

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    if (items.length === 0 && !loading) {
        return (
            <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
                <div className="text-center space-y-4">
                    <div className="bg-emerald-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto text-emerald-600">
                        <ShoppingBag size={40} />
                    </div>
                    <h1 className="text-2xl font-bold text-emerald-900">سلتك فارغة</h1>
                    <p className="text-slate-600">لا يمكن إتمام الطلب لأن السلة لا تحتوي على منتجات.</p>
                    <button
                        onClick={() => router.push('/products')}
                        className="px-8 py-3 bg-emerald-900 text-white rounded-xl font-bold hover:bg-emerald-800 transition-all"
                    >
                        تصفح المنتجات
                    </button>
                </div>
            </div>
        );
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const result = await createOrder({
            customerName: formData.name,
            phone: formData.phone,
            address: {
                city: formData.city,
                street: formData.street,
                country: 'Saudi Arabia',
            },
            items: items.map(item => ({
                id: item.id,
                name: item.name,
                price: item.price,
                quantity: item.quantity,
            })),
        });

        if (result.success) {
            clearCart();
            router.push(`/success?orderId=${result.orderId}`);
        } else {
            alert('عذراً، حدث خطأ أثناء معالجة الطلب: ' + result.error);
            setLoading(false);
        }
    };

    return (
        <div className="bg-slate-50 min-h-screen py-12" dir="rtl">
            <div className="container mx-auto px-4 max-w-6xl">
                {/* Navigation Breadcrumb */}
                <div className="flex items-center gap-2 text-emerald-700 mb-8 cursor-pointer hover:text-emerald-900" onClick={() => router.back()}>
                    <ChevronLeft size={20} className="rotate-180" />
                    <span className="font-medium">العودة للتسوق</span>
                </div>

                <h1 className="text-3xl font-bold text-emerald-900 mb-10 flex items-center gap-3">
                    <CreditCard className="text-amber-500" />
                    إتمام الطلب
                </h1>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                    {/* Form Section */}
                    <div className="lg:col-span-7 space-y-6">
                        <form id="checkout-form" onSubmit={handleSubmit} className="bg-white rounded-3xl p-8 border border-emerald-100 shadow-sm space-y-8">
                            <section>
                                <h2 className="text-xl font-bold text-emerald-900 mb-6 flex items-center gap-2 border-b border-slate-100 pb-4">
                                    <User size={20} className="text-amber-500" />
                                    المعلومات الشخصية
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-bold text-emerald-800 mb-2">الاسم الكامل</label>
                                        <input
                                            required
                                            type="text"
                                            className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all"
                                            placeholder="محمد علي"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-emerald-800 mb-2">رقم الجوال</label>
                                        <input
                                            required
                                            type="tel"
                                            className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all text-left"
                                            placeholder="05xxxxxxx"
                                            value={formData.phone}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        />
                                    </div>
                                </div>
                            </section>

                            <section>
                                <h2 className="text-xl font-bold text-emerald-900 mb-6 flex items-center gap-2 border-b border-slate-100 pb-4">
                                    <MapPin size={20} className="text-amber-500" />
                                    عنوان التوصيل
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-bold text-emerald-800 mb-2">المدينة</label>
                                        <input
                                            required
                                            type="text"
                                            className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all"
                                            placeholder="الرياض"
                                            value={formData.city}
                                            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-emerald-800 mb-2">الحي والشارع</label>
                                        <input
                                            required
                                            type="text"
                                            className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all"
                                            placeholder="حي النرجس، شارع النخيل"
                                            value={formData.street}
                                            onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                                        />
                                    </div>
                                </div>
                            </section>

                            <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-100">
                                <p className="text-emerald-800 text-sm">
                                    <strong>ملاحظة:</strong> الدفع حالياً متاح فقط عند الاستلام (COD) لضمان أفضل تجربة لك.
                                </p>
                            </div>
                        </form>
                    </div>

                    {/* Summary Section */}
                    <div className="lg:col-span-5">
                        <div className="bg-emerald-900 text-white rounded-3xl p-8 sticky top-24 shadow-xl">
                            <h2 className="text-xl font-bold mb-8 flex items-center gap-2">
                                <ShoppingBag size={20} className="text-amber-400" />
                                ملخص الطلب
                            </h2>

                            <div className="space-y-4 mb-8 max-h-[40vh] overflow-y-auto custom-scrollbar pl-2">
                                {items.map((item) => (
                                    <div key={item.id} className="flex justify-between items-center bg-white/5 p-4 rounded-2xl border border-white/10">
                                        <div className="flex gap-4 items-center">
                                            <div className="w-12 h-12 bg-white/10 rounded-lg overflow-hidden">
                                                <img src={item.image!} alt={item.name} className="w-full h-full object-cover" />
                                            </div>
                                            <div>
                                                <p className="font-bold text-sm truncate max-w-[150px]">{item.name}</p>
                                                <p className="text-amber-400 text-xs">{item.quantity} × {item.price} ر.س</p>
                                            </div>
                                        </div>
                                        <span className="font-bold">{item.price * item.quantity} ر.س</span>
                                    </div>
                                ))}
                            </div>

                            <div className="space-y-4 border-t border-white/10 pt-6">
                                <div className="flex justify-between text-white/70">
                                    <span>المجموع الفرعي</span>
                                    <span>{getTotalPrice()} ر.س</span>
                                </div>
                                <div className="flex justify-between text-white/70">
                                    <span>الشحن والتوصيل</span>
                                    <span className="text-emerald-400 font-bold">مجاني</span>
                                </div>
                                <div className="flex justify-between text-2xl font-bold pt-4">
                                    <span>الإجمالي</span>
                                    <span className="text-amber-400">{getTotalPrice()} ر.س</span>
                                </div>
                            </div>

                            <button
                                type="submit"
                                form="checkout-form"
                                disabled={loading}
                                className="w-full mt-8 py-5 bg-amber-500 hover:bg-amber-400 disabled:bg-slate-400 text-emerald-950 font-bold text-lg rounded-2xl transition-all shadow-lg hover:shadow-amber-500/20 active:scale-95 flex items-center justify-center gap-3"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="animate-spin" />
                                        جاري المعالجة...
                                    </>
                                ) : (
                                    'تأكيد الطلب والدفع عند الاستلام'
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
