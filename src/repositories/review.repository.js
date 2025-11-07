import { prisma } from "../db.config.js"

export const getUserReviews = async (user, cursor) => {
    const reviews = await prisma.review.findMany({
        select: {
            id: true,
            store: true,
            score: true,
            content: true,
            created_at: true
        },
        where: {
            reviewer: user.id, id: { gt: cursor }
        },
        orderBy: {
            created_at: "desc"
        },
        take: 5
    })

    const count = await prisma.review.count({ where: {reviewer: user.id}});
    return {
        reviews: reviews,
        cursor: cursor,
        totalReviews: count
    }
}