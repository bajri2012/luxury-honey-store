export const dynamic = "force-dynamic";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[80vh] min-h-[600px] flex items-center justify-center overflow-hidden bg-emerald-950">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
          <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-amber-400 blur-[100px]" />
          <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-emerald-700 blur-[150px]" />
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="inline-block px-4 py-1 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-400 text-sm font-medium mb-6">
            عسل طبيعي 100% مستوحى من الطبيعة
          </div>
          <h1 className="text-4xl md:text-7xl font-bold text-white mb-6 leading-tight">
            عسل طبيعي <span className="text-amber-400">فاخر</span> <br />
            يلامس الحواس
          </h1>
          <p className="text-emerald-100 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            نقدم لكم تشكيلة مختارة من أجود أنواع العسل الملكي النقي، مستخرج بعناية لضمان أعلى درجات الجودة والنقاء.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/products"
              className="px-8 py-4 bg-amber-500 hover:bg-amber-600 text-emerald-950 font-bold rounded-lg transition-all transform hover:scale-105 flex items-center gap-2"
            >
              تسوق الآن
              <ArrowLeft size={20} />
            </Link>
            <Link
              href="/about"
              className="px-8 py-4 bg-transparent border border-emerald-500 hover:bg-emerald-900 text-white font-medium rounded-lg transition-all"
            >
              اكتشف قصتنا
            </Link>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-emerald-900 mb-16">لماذا تختار عسلنا؟</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="p-8 rounded-3xl bg-emerald-50 border border-emerald-100 hover:border-amber-200 transition-all group">
              <div className="w-16 h-16 bg-amber-400 rounded-2xl flex items-center justify-center mx-auto mb-8 transform group-hover:rotate-6 transition-transform">
                <span className="text-emerald-900 font-bold text-xl">1</span>
              </div>
              <h3 className="text-2xl font-bold text-emerald-900 mb-4">نقاء مطلق</h3>
              <p className="text-emerald-700 leading-relaxed">
                عسل غير معالج وخالٍ من الإضافات الكيميائية، طبيعي تماماً كما أرادته المحل.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-emerald-50 border border-emerald-100 hover:border-amber-200 transition-all group">
              <div className="w-16 h-16 bg-amber-400 rounded-2xl flex items-center justify-center mx-auto mb-8 transform group-hover:rotate-6 transition-transform">
                <span className="text-emerald-900 font-bold text-xl">2</span>
              </div>
              <h3 className="text-2xl font-bold text-emerald-900 mb-4">جودة فاخرة</h3>
              <p className="text-emerald-700 leading-relaxed">
                يتم اختبار كل دفعة بعناية في المختبرات لضمان معايير الجودة العالمية.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-emerald-50 border border-emerald-100 hover:border-amber-200 transition-all group">
              <div className="w-16 h-16 bg-amber-400 rounded-2xl flex items-center justify-center mx-auto mb-8 transform group-hover:rotate-6 transition-transform">
                <span className="text-emerald-900 font-bold text-xl">3</span>
              </div>
              <h3 className="text-2xl font-bold text-emerald-900 mb-4">توصيل آمن</h3>
              <p className="text-emerald-700 leading-relaxed">
                تغليف فاخر وآمن يضمن وصول العسل إليك بجودته الأصلية أينما كنت.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
