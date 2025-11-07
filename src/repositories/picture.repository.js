import { prisma } from "../db.config.js";

export const getImageUrl = async (reviews) => {
    for(const review of reviews.reviews) {
        for(const imageId of review.images) {
            const url = await prisma.picture.findFirst({
                select: {
                    url: true
                },
                where: {id: imageId}});
            review.images.imageId = url;
        }
    }
    return reviews;
}