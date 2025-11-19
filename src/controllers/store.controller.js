import { StatusCodes } from "http-status-codes";
import { listStoreReviews } from "../services/store.service.js";

export const handleListStoreReviews = async (req, res, next) => {
    /* Swagger 설정
    #swagger.summary = "가게 리뷰 목록 조회 API";
    #swagger.responses[200] = {
        description: "성공 응답",
        content: {
            "application/json": {
                schema: {
                    type: "object",
                    properties: {
                        success: { type: "boolean" },
                        code: { type: "string", example: "200" },
                        data: {
                            type: "object",
                            properties: {
                                reviews: {
                                    type: "array",
                                    items: {
                                        type: "object",
                                        properties: {
                                            id: { type: "number" },
                                            store: { type: "number" },
                                            reviewer: { type: "number" },
                                            content: { type: "string" },
                                            score: { type: "number", format: "double" }
                                        }
                                    }
                                },
                                pagination: {
                                    type: "object",
                                    properties: {
                                        cursor: { type: "number" }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    */
    const reviews = await listStoreReviews(
        parseInt(req.params.storeId),
        typeof req.query.cursor === "string" ? parseInt(req.query.cursor) : 0
    );
    res.status(StatusCodes.OK).success(reviews);
}