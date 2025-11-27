export const responseFromReviews = async (reviews) => {
    return {
        reviews: reviews,
        pagination: {
            cursor: reviews.length ? reviews[reviews.length - 1].id : null
        }
    }
}