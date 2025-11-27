import { prisma } from "../db.config.js";

export const getImageUrl = async (reviews) => {
    for(const review of reviews.reviews) {
        const temp = [];
        for(const imageId of review.images) {
            const url = await prisma.picture.findFirst({
                select: {
                    url: true
                },
                where: {id: imageId}
            });
            temp.push(url.url);
        }
        review.images = temp;
    }
    return reviews;
}