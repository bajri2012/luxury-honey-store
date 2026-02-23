'use client';

import Link from "next/link";
import { ShoppingCart, User, Menu } from "lucide-react";
import { useState, useEffect } from "react";
import { useCartStore } from "@/store/cartStore";
import CartSidebar from "./CartSidebar";

export default function Navbar() {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [mounted, setMounted] = useState(false);
    const getTotalItems = useCartStore((state) => state.getTotalItems);

    // Avoid hydration mismatch
    useEffect(() => {
        setMounted(true);
    }, []);

    const cartCount = mounted ? getTotalItems() : 0;

    return (
        <>
            <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-amber-100">
                <div className="container mx-auto px-4 h-20 flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="text-2xl font-bold text-emerald-900 border-b-2 border-amber-400">
                        متجر العسل
                    </Link>

                    {/* Desktop Links */}
                    <div className="hidden md:flex items-center space-x-8 space-x-reverse text-emerald-900 font-medium" dir="rtl">
                        <Link href="/" className="hover:text-amber-600 transition-colors">الرئيسية</Link>
                        <Link href="/products" className="hover:text-amber-600 transition-colors">المنتجات</Link>
                        <Link href="/about" className="hover:text-amber-600 transition-colors">من نحن</Link>
                        <Link href="/contact" className="hover:text-amber-600 transition-colors">اتصل بنا</Link>
                    </div>

                    {/* Icons */}
                    <div className="flex items-center space-x-4 space-x-reverse">
                        <Link href="/login" className="p-2 text-emerald-900 hover:text-amber-600 transition-colors">
                            <User size={24} />
                        </Link>
                        <button
                            onClick={() => setIsCartOpen(true)}
                            className="p-2 text-emerald-900 hover:text-amber-600 transition-colors relative"
                        >
                            <ShoppingCart size={24} />
                            {cartCount > 0 && (
                                <span className="absolute top-0 right-0 bg-red-500 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold animate-in zoom-in duration-300">
                                    {cartCount}
                                </span>
                            )}
                        </button>
                        <button className="md:hidden p-2 text-emerald-900">
                            <Menu size={24} />
                        </button>
                    </div>
                </div>
            </nav>

            <CartSidebar
                isOpen={isCartOpen}
                onClose={() => setIsCartOpen(false)}
            />
        </>
    );
}
