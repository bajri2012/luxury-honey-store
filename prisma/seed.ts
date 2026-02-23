import prisma from "../lib/prisma";

async function main() {
    // 1. Create luxury category
    const category = await prisma.category.upsert({
        where: { name: "Premium Natural Honey" },
        update: {},
        create: {
            name: "Premium Natural Honey",
            description: "The finest honey extracted from the heart of nature.",
        },
    });

    // 2. Seed 4 products
    const products = [
        {
            name: "Royal Sidr Honey",
            description: "One of the rarest and most luxurious types of honey, known for its pleasant aroma and thick consistency.",
            price: 450,
            stock: 50,
            weight: 0.5,
            origin: "Hadramaut, Yemen",
            harvestDate: new Date("2025-11-01"),
            batchNumber: "SIDR-2025-001",
            image: "https://images.unsplash.com/photo-1589733424448-0265217988b1?auto=format&fit=crop&q=80&w=800",
            categoryId: category.id,
        },
        {
            name: "Samra Honey",
            description: "Rich in minerals and nutrients, perfect for boosting immunity.",
            price: 280,
            stock: 35,
            weight: 0.5,
            origin: "Asir, Saudi Arabia",
            harvestDate: new Date("2026-01-15"),
            batchNumber: "SAMRA-2026-004",
            image: "https://images.unsplash.com/photo-1558583055-d7ac00b1adca?auto=format&fit=crop&q=80&w=800",
            categoryId: category.id,
        },
        {
            name: "Talh Honey",
            description: "Characterized by its dark color and strong taste, extracted from Talh forests.",
            price: 320,
            stock: 20,
            weight: 0.5,
            origin: "Hail, Saudi Arabia",
            harvestDate: new Date("2025-12-10"),
            batchNumber: "TALH-2025-012",
            image: "https://images.unsplash.com/photo-1471943311424-646960669fba?auto=format&fit=crop&q=80&w=800",
            categoryId: category.id,
        },
        {
            name: "Wildflower Honey",
            description: "An aromatic blend of nectar from various wildflowers, with a light and refreshing taste.",
            price: 180,
            stock: 100,
            weight: 0.5,
            origin: "Taif, Saudi Arabia",
            harvestDate: new Date("2026-02-01"),
            batchNumber: "WILD-2026-002",
            image: "https://images.unsplash.com/photo-1615485242250-934336c74755?auto=format&fit=crop&q=80&w=800",
            categoryId: category.id,
        },
    ];

    // Delete existing products to avoid duplicates if necessary or just create
    // For this seed, we use create. If we want to be safe, we could use upsert or deleteMany first.
    // The user just said "run the seed script again".

    await prisma.product.deleteMany({
        where: {
            categoryId: category.id
        }
    });

    for (const product of products) {
        await prisma.product.create({
            data: product,
        });
    }

    console.log("Seed successful");
}

main()
    .catch((e) => {
        console.error("Seed failed:", e.message);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
