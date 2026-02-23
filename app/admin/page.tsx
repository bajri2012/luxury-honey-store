import prisma from "@/lib/prisma";
import { ShoppingCart, Users, CreditCard, TrendingUp, Package } from 'lucide-react';

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
    const totalOrders = await prisma.order.count();
    const totalRevenue = await prisma.order.aggregate({
        _sum: {
            totalAmount: true
        }
    });
    const totalProducts = await prisma.product.count();
    const totalCustomers = await prisma.user.count();

    const stats = [
        {
            label: "إجمالي الطلبات",
            value: totalOrders,
            icon: ShoppingCart,
            color: "text-blue-600",
            bg: "bg-blue-50"
        },
        {
            label: "إجمالي الإيرادات",
            value: `${Number(totalRevenue._sum.totalAmount || 0)} ر.س`,
            icon: CreditCard,
            color: "text-emerald-600",
            bg: "bg-emerald-50"
        },
        {
            label: "عدد المنتجات",
            value: totalProducts,
            icon: Package,
            color: "text-amber-600",
            bg: "bg-amber-50"
        },
        {
            label: "عدد العملاء",
            value: totalCustomers,
            icon: Users,
            color: "text-purple-600",
            bg: "bg-purple-50"
        }
    ];

    return (
        <div dir="rtl">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-slate-800">نظرة عامة</h1>
                <p className="text-slate-500">مرحباً بك في لوحة تحكم متجر العسل.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                {stats.map((stat, index) => (
                    <div key={index} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-6">
                        <div className={`p-4 rounded-xl ${stat.bg} ${stat.color}`}>
                            <stat.icon size={24} />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-slate-500 mb-1">{stat.label}</p>
                            <p className="text-2xl font-bold text-slate-800">{stat.value}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Quick Actions or Recent Activity Placeholder */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm p-8 h-[400px] flex flex-col items-center justify-center text-center space-y-4">
                    <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center text-slate-300">
                        <TrendingUp size={32} />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-slate-800">مخطط المبيعات</h3>
                        <p className="text-slate-500 text-sm">سيتم تفعيل الرسوم البيانية قريباً لتتبع الأداء المالي.</p>
                    </div>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 flex flex-col items-center justify-center text-center space-y-4">
                    <div className="w-16 h-16 bg-amber-50 rounded-full flex items-center justify-center text-amber-300">
                        <Bell size={32} />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-slate-800">تنبيهات النظام</h3>
                        <p className="text-slate-500 text-sm">لا توجد تنبيهات جديدة في الوقت الحالي.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

function Bell({ size }: { size: number }) {
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
            <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
            <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
        </svg>
    );
}
