import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-emerald-950 text-emerald-50 py-12">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-right" dir="rtl">
                    {/* Brand */}
                    <div>
                        <h3 className="text-xl font-bold text-amber-400 mb-4">متجر العسل</h3>
                        <p className="text-emerald-200 leading-relaxed text-sm">
                            نقدم لكم أجود أنواع العسل الطبيعي المستخلص من الطبيعة البكر لضمان الفخامة والجودة العالية.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4 text-white">روابط سريعة</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="/" className="hover:text-amber-400 transition-colors">الرئيسية</Link></li>
                            <li><Link href="/products" className="hover:text-amber-400 transition-colors">المنتجات</Link></li>
                            <li><Link href="/privacy" className="hover:text-amber-400 transition-colors">سياسة الخصوصية</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4 text-white">تواصل معنا</h4>
                        <p className="text-sm">البريد الإلكتروني: info@honey-store.com</p>
                        <p className="text-sm">الجوال: +966 500 000 000</p>
                    </div>
                </div>
                <div className="border-t border-emerald-900 mt-12 pt-8 text-center text-xs text-emerald-400">
                    <p>© {new Date().getFullYear()} متجر العسل. جميع الحقوق محفوظة.</p>
                </div>
            </div>
        </footer>
    );
}
