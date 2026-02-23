import { PrismaClient } from "@prisma/client";
import "dotenv/config";

console.log("DATABASE_URL:", process.env.DATABASE_URL ? "Defined" : "Undefined");

// @ts-ignore
const prisma = new PrismaClient({
    datasources: {
        db: {
            url: process.env.DATABASE_URL
        }
    }
});

async function test() {
    try {
        const count = await prisma.product.count();
        console.log("Count:", count);
    } catch (e) {
        console.error("Error:", e);
    } finally {
        await prisma.$disconnect();
    }
}

test();
