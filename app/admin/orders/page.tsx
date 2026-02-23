import prisma from "@/lib/prisma";
import { Eye, MapPin, User, Package, Clock, Hash } from 'lucide-react';
import { OrderStatus } from "@prisma/client";

export const dynamic = "force-dynamic";

export default async function AdminOrdersPage() {
    const orders = await prisma.order.findMany({
        include: {
            user: true,
            shippingAddress: true,
            orderItems: {
                include: {
                    product: true
                }
            }
        },
        orderBy: {
            createdAt: "desc"
        }
    });

    const getStatusStyle = (status: OrderStatus) => {
        switch (status) {
            case OrderStatus.PENDING:
                return "bg-amber-100 text-amber-700 border-amber-200";
            case OrderStatus.PROCESSING:
                return "bg-blue-100 text-blue-700 border-blue-200";
            case OrderStatus.SHIPPED:
                return "bg-purple-100 text-purple-700 border-purple-200";
            case OrderStatus.DELIVERED:
                return "bg-emerald-100 text-emerald-700 border-emerald-200";
            case OrderStatus.CANCELLED:
                return "bg-red-100 text-red-700 border-red-200";
            default:
                return "bg-slate-100 text-slate-700 border-slate-200";
        }
    };

    const getStatusLabel = (status: OrderStatus) => {
        switch (status) {
            case OrderStatus.PENDING: return "قيد الانتظار";
            case OrderStatus.PROCESSING: return "جاري المعالجة";
            case OrderStatus.SHIPPED: return "تم الشحن";
            case OrderStatus.DELIVERED: return "تم التوصيل";
            case OrderStatus.CANCELLED: return "ملغي";
            default: return status;
        }
    };

    return (
        <div dir="rtl">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-slate-800">إدارة الطلبات</h1>
                <p className="text-slate-500">عرض وتتبع جميع طلبات العملاء في المتجر.</p>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden min-w-full">
                {/* Table Header */}
                <div className="overflow-x-auto">
                    <table className="w-full text-right border-collapse">
                        <thead className="bg-slate-50 border-b border-slate-200">
                            <tr>
                                <th className="px-6 py-4 text-sm font-bold text-slate-600 uppercase tracking-wider">
                                    <div className="flex items-center gap-2">
                                        <Hash size={16} />
                                        رقم الطلب
                                    </div>
                                </th>
                                <th className="px-6 py-4 text-sm font-bold text-slate-600 uppercase tracking-wider">
                                    <div className="flex items-center gap-2">
                                        <Clock size={16} />
                                        التاريخ
                                    </div>
                                </th>
                                <th className="px-6 py-4 text-sm font-bold text-slate-600 uppercase tracking-wider">
                                    <div className="flex items-center gap-2">
                                        <User size={16} />
                                        العميل
                                    </div>
                                </th>
                                <th className="px-6 py-4 text-sm font-bold text-slate-600 uppercase tracking-wider">
                                    <div className="flex items-center gap-2">
                                        <MapPin size={16} />
                                        المدينة
                                    </div>
                                </th>
                                <th className="px-6 py-4 text-sm font-bold text-slate-600 uppercase tracking-wider">
                                    <div className="flex items-center gap-2">
                                        <Package size={16} />
                                        المنتجات
                                    </div>
                                </th>
                                <th className="px-6 py-4 text-sm font-bold text-slate-600 uppercase tracking-wider">الإجمالي</th>
                                <th className="px-6 py-4 text-sm font-bold text-slate-600 uppercase tracking-wider">الحالة</th>
                                <th className="px-6 py-4 text-sm font-bold text-slate-600 uppercase tracking-wider text-center">الإجراءات</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {orders.length === 0 ? (
                                <tr>
                                    <td colSpan={8} className="px-6 py-20 text-center text-slate-400">
                                        لا توجد طلبات مسجلة حالياً.
                                    </td>
                                </tr>
                            ) : (
                                orders.map((order) => (
                                    <tr key={order.id} className="hover:bg-slate-50 transition-colors group">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="font-mono text-sm font-bold text-emerald-900 group-hover:text-emerald-600">
                                                #{order.id.slice(-8).toUpperCase()}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                                            {new Intl.DateTimeFormat("ar-SA", {
                                                day: "numeric",
                                                month: "long",
                                                year: "numeric",
                                            }).format(order.createdAt)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-bold text-slate-800">{order.user.name || "عميل زائر"}</div>
                                            <div className="text-xs text-slate-500">{order.user.email}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                                            {order.shippingAddress.city}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-slate-600 max-w-xs">
                                            <div className="truncate">
                                                {order.orderItems.map(item => item.product.name).join('، ')}
                                            </div>
                                            <div className="text-xs text-emerald-600 font-medium">
                                                عدد القطع: {order.orderItems.reduce((acc, curr) => acc + curr.quantity, 0)}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap font-bold text-slate-800">
                                            {Number(order.totalAmount)} {order.currency}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusStyle(order.status)}`}>
                                                {getStatusLabel(order.status)}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-center">
                                            <button className="p-2 text-slate-400 hover:text-emerald-600 transition-colors">
                                                <Eye size={20} />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
