import { prisma } from "../db.config.js";

export const getAllStoreReviews = async (storeId, cursor) => {
    const reviews = await prisma.review.findMany({
        select: {
            id: true,
            store: true,
            reviewer: true,
            content: true,
            score: true
        },
        where: {
            store: storeId,
            id: { gt: cursor }
        },
        orderBy: {
            id: "asc"
        },
        take: 5
    })

    return reviews;
}