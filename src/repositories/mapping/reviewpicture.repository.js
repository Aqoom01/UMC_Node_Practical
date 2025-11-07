import { prisma } from "../../db.config.js";

export const getReviewImages = async (reviews) => {
    for(const review of reviews.reviews) {
        const images = prisma.picture.findMany({
            select: {
                url: true
            },
            where: {
                review: review.id
            }
        })
        review["images"] = images;
    }
    return reviews;
}