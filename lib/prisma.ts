import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';

// Force loading of .env file
dotenv.config();

const prismaClientSingleton = () => {
    return new PrismaClient({
        // @ts-ignore - Following user preference for datasourceUrl despite local type mismatch
        datasourceUrl: process.env.DATABASE_URL,
    });
};

declare global {
    var prisma: undefined | ReturnType<typeof prismaClientSingleton>;
}

const prisma = globalThis.prisma ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma;
