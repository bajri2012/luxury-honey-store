import Link from 'next/link';
import { LayoutDashboard, ShoppingCart, Box, Settings, LogOut, Bell } from 'lucide-react';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen bg-slate-50">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-slate-200 flex flex-col sticky top-0 h-screen">
                <div className="p-6 border-b border-slate-100">
                    <Link href="/admin" className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-emerald-900 rounded-lg flex items-center justify-center text-white font-bold">H</div>
                        <span className="text-xl font-bold text-slate-800">إدارة العسل</span>
                    </Link>
                </div>

                <nav className="flex-1 p-4 space-y-2" dir="rtl">
                    <Link
                        href="/admin"
                        className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-emerald-50 hover:text-emerald-900 rounded-xl transition-all group"
                    >
                        <LayoutDashboard size={20} className="group-hover:text-emerald-600" />
                        <span className="font-medium">لوحة القيادة</span>
                    </Link>
                    <Link
                        href="/admin/orders"
                        className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-emerald-50 hover:text-emerald-900 rounded-xl transition-all group"
                    >
                        <ShoppingCart size={20} className="group-hover:text-emerald-600" />
                        <span className="font-medium">الطلبات</span>
                    </Link>
                    <Link
                        href="/admin/products"
                        className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-emerald-50 hover:text-emerald-900 rounded-xl transition-all group"
                    >
                        <Box size={20} className="group-hover:text-emerald-600" />
                        <span className="font-medium">المنتجات</span>
                    </Link>
                    <div className="pt-4 mt-4 border-t border-slate-100">
                        <Link
                            href="/admin/settings"
                            className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 rounded-xl transition-all"
                        >
                            <Settings size={20} />
                            <span className="font-medium">الإعدادات</span>
                        </Link>
                    </div>
                </nav>

                <div className="p-4 border-t border-slate-100">
                    <button className="flex items-center gap-3 w-full px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl transition-all font-medium" dir="rtl">
                        <LogOut size={20} />
                        <span>تسجيل الخروج</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
                {/* Header */}
                <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8">
                    <div className="flex items-center gap-4">
                        <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors">
                            <Bell size={20} />
                        </button>
                        <div className="h-8 w-px bg-slate-200 mx-2"></div>
                        <div className="flex items-center gap-3">
                            <div className="text-right hidden sm:block">
                                <p className="text-sm font-bold text-slate-800">المسؤول</p>
                                <p className="text-xs text-slate-400">admin@honey.shop</p>
                            </div>
                            <div className="w-10 h-10 bg-slate-100 rounded-full border border-slate-200 flex items-center justify-center text-slate-400">
                                <Settings size={20} />
                            </div>
                        </div>
                    </div>
                    <div className="flex-1"></div>
                </header>

                {/* Page Content */}
                <div className="flex-1 overflow-y-auto p-8">
                    {children}
                </div>
            </main>
        </div>
    );
}
