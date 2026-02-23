import { Package, Plus } from 'lucide-react';

export default function AdminProductsPage() {
    return (
        <div dir="rtl">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800">إدارة المنتجات</h1>
                    <p className="text-slate-500">إضافة وتعديل المنتجات المعروضة في المتجر.</p>
                </div>
                <button className="flex items-center gap-2 bg-emerald-900 text-white px-6 py-3 rounded-xl font-bold hover:bg-emerald-800 transition-all">
                    <Plus size={20} />
                    إضافة منتج جديد
                </button>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-20 flex flex-col items-center justify-center text-center space-y-4">
                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center text-slate-300">
                    <Package size={40} />
                </div>
                <div>
                    <h3 className="text-xl font-bold text-slate-800">قائمة المنتجات</h3>
                    <p className="text-slate-500 max-w-sm">سيتم تفعيل عرض قائمة المنتجات وإمكانيات التعديل في المرحلة القادمة.</p>
                </div>
            </div>
        </div>
    );
}
