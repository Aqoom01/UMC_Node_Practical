import { prisma } from "../db.config.js";

export const getReviewAnswer = async (reviews) => {
    for(const review of reviews.reviews) {
        const rereview = await prisma.rereview.findMany({
            select: {
                content: true,
                created_at: true
            },
            where: {
                origin: review.id
            }
        })

        if(rereview == null) {
            review["is_answer"] = false;
            review["answer"] = null;
        }
        else {
            review["is_answer"] = true;
            review["answer"] = {
                content: rereview.content,
                created_at: rereview.created_at
            }
        }
    }

    return reviews;
}