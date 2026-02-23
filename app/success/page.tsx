'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { CheckCircle2, ShoppingBag, ArrowRight, Home, Share2 } from 'lucide-react';
import { Suspense } from 'react';

function SuccessContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const orderId = searchParams.get('orderId');

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6" dir="rtl">
            <div className="max-w-xl w-full bg-white rounded-[2.5rem] shadow-2xl shadow-emerald-900/10 border border-emerald-100 overflow-hidden transform animate-in fade-in zoom-in duration-700">
                {/* Top Banner */}
                <div className="bg-emerald-900 p-12 text-center relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full opacity-10">
                        <div className="absolute -top-10 -left-10 w-40 h-40 bg-white rounded-full blur-3xl"></div>
                        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-amber-400 rounded-full blur-3xl"></div>
                    </div>
                    <div className="relative z-10 flex justify-center mb-6">
                        <div className="bg-white/10 p-4 rounded-full backdrop-blur-sm border border-white/20">
                            <CheckCircle2 size={64} className="text-amber-400" />
                        </div>
                    </div>
                    <h1 className="text-3xl font-bold text-white relative z-10">شكراً لثقتك بنا!</h1>
                    <p className="text-emerald-100/80 mt-2 relative z-10 text-lg">تم استلام طلبك بنجاح وهو الآن قيد المعالجة.</p>
                </div>

                {/* Order Details */}
                <div className="p-10 space-y-8">
                    <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 text-center">
                        <p className="text-slate-500 text-sm font-medium mb-1">رقم الطلب الخاص بك</p>
                        <p className="text-2xl font-black text-emerald-900 tracking-wider">#{orderId?.slice(-8).toUpperCase() || 'HB-99824'}</p>
                    </div>

                    <div className="space-y-4">
                        <h3 className="font-bold text-emerald-900 text-lg">الخطوات القادمة</h3>
                        <ul className="space-y-4">
                            <li className="flex gap-4">
                                <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center font-bold flex-shrink-0">1</div>
                                <p className="text-slate-600">سيقوم فريقنا بتجهيز أجود أنواع العسل المختارة لك.</p>
                            </li>
                            <li className="flex gap-4">
                                <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center font-bold flex-shrink-0">2</div>
                                <p className="text-slate-600">سيتواصل مع مندوب التوصيل لتحديد موعد التسليم.</p>
                            </li>
                            <li className="flex gap-4">
                                <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center font-bold flex-shrink-0">3</div>
                                <p className="text-slate-600">الدفع سيكون عند الاستلام (COD).</p>
                            </li>
                        </ul>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-slate-100">
                        <button
                            onClick={() => router.push('/products')}
                            className="flex items-center justify-center gap-2 py-4 bg-emerald-900 text-white rounded-2xl font-bold hover:bg-emerald-800 transition-all shadow-lg"
                        >
                            <ShoppingBag size={20} />
                            مواصلة التسوق
                        </button>
                        <button
                            onClick={() => router.push('/')}
                            className="flex items-center justify-center gap-2 py-4 border-2 border-emerald-900 text-emerald-900 rounded-2xl font-bold hover:bg-emerald-50 transition-all"
                        >
                            <Home size={20} />
                            الرئيسية
                        </button>
                    </div>

                    <button className="w-full flex items-center justify-center gap-2 text-emerald-700 font-medium py-2 hover:text-emerald-900 transition-colors">
                        <Share2 size={18} />
                        مشاركة رابط المتجر مع الأصدقاء
                    </button>
                </div>
            </div>
        </div>
    );
}

export default function SuccessPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin text-emerald-900">
                    <Loader2 size={48} />
                </div>
            </div>
        }>
            <SuccessContent />
        </Suspense>
    );
}

function Loader2({ size }: { size: number }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M21 12a9 9 0 1 1-6.219-8.56" />
        </svg>
    );
}
