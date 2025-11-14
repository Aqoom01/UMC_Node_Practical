import { StatusCodes } from "http-status-codes";
import { handleListStoreReviews } from "../services/store.service.js";

export const handleListStoreReviews = async (req, res, next) => {
    const reviews = await handleListStoreReviews(
        parseInt(req.params.storeId),
        typeof req.query.cursor === "string" ? parseInt(req.query.cursor) : 0
    );
    res.status(StatusCodes.OK).success(reviews);
}