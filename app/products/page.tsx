import Link from "next/link";
import Image from "next/image";
import AddToCartButton from "@/components/AddToCartButton";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function ProductsPage() {
    const products = await prisma.product.findMany({
        include: {
            category: true,
        },
        orderBy: {
            createdAt: "desc",
        },
    });

    return (
        <div className="bg-slate-50 min-h-screen py-16">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="text-center mb-16" dir="rtl">
                    <h1 className="text-4xl font-bold text-emerald-900 mb-4">تشكيلتنا المختارة</h1>
                    <p className="text-emerald-700 max-w-2xl mx-auto">
                        انغمس في عالم من النقاء الطبيعي مع أجود أنواع العسل المستخرج بعناية فائقة.
                    </p>
                </div>

                {/* Grid */}
                {products.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-emerald-200">
                        <p className="text-emerald-600">عذراً، لا توجد منتجات حالياً. سنقوم بإضافتها قريباً.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {products.map((product) => (
                            <div
                                key={product.id}
                                className="group bg-white rounded-3xl overflow-hidden border border-emerald-100 hover:border-amber-300 transition-all shadow-sm hover:shadow-xl"
                                dir="rtl"
                            >
                                {/* Image Container */}
                                <div className="relative h-64 overflow-hidden bg-slate-100">
                                    {product.image ? (
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-emerald-200">
                                            لا يوجد صورة
                                        </div>
                                    )}
                                    {/* Badge */}
                                    <div className="absolute top-4 right-4 bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                                        {product.category.name}
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-emerald-900 mb-2 group-hover:text-amber-600 transition-colors">
                                        {product.name}
                                    </h3>
                                    <p className="text-emerald-700 text-sm mb-4 line-clamp-2 min-h-[2.5rem]">
                                        {product.description}
                                    </p>

                                    {/* Info Row */}
                                    <div className="flex items-center justify-between mb-6">
                                        <div className="text-gray-500 text-xs font-medium">الوزن: {Number(product.weight) * 1000} جرام</div>
                                        <div className="text-amber-600 font-bold text-xl">{Number(product.price)} ر.س</div>
                                    </div>

                                    {/* Button */}
                                    <AddToCartButton
                                        product={{
                                            id: product.id,
                                            name: product.name,
                                            price: Number(product.price),
                                            image: product.image
                                        }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
