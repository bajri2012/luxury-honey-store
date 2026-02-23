'use server';

import prisma from "@/lib/prisma";
import { OrderStatus } from "@prisma/client";

interface CheckoutData {
    customerName: string;
    phone: string;
    address: {
        city: string;
        street: string;
        country: string;
    };
    items: {
        id: string;
        name: string;
        price: number;
        quantity: number;
    }[];
}

export async function createOrder(data: CheckoutData) {
    try {
        // 1. Ensure a guest user exists
        let guestUser = await prisma.user.findUnique({
            where: { email: 'guest@honey.shop' }
        });

        if (!guestUser) {
            guestUser = await prisma.user.create({
                data: {
                    email: 'guest@honey.shop',
                    name: 'Guest Customer',
                    role: 'USER',
                }
            });
        }

        // 2. Perform transaction to create address and order
        const result = await prisma.$transaction(async (tx) => {
            // Create shipping address
            const shippingAddress = await tx.address.create({
                data: {
                    userId: guestUser!.id,
                    city: data.address.city,
                    street: data.address.street,
                    country: data.address.country,
                    isDefault: false,
                }
            });

            const totalAmount = data.items.reduce(
                (sum, item) => sum + item.price * item.quantity,
                0
            );

            // Create order
            const order = await tx.order.create({
                data: {
                    userId: guestUser!.id,
                    shippingAddressId: shippingAddress.id,
                    status: OrderStatus.PENDING,
                    totalAmount: totalAmount,
                    currency: 'SAR',
                    orderItems: {
                        create: data.items.map((item) => ({
                            productId: item.id,
                            quantity: item.quantity,
                            price: item.price,
                        }))
                    }
                }
            });

            return order;
        });

        return { success: true, orderId: result.id };
    } catch (error: any) {
        console.error('Checkout error:', error);
        return { success: false, error: error.message || 'Failed to process order' };
    }
}
