import { StatusCodes } from "http-status-codes";
import { listStoreReviews } from "../services/store.service.js";

export const handleListStoreReviews = async (req, res, next) => {
    /* Swagger 설정
    #swagger.summary = "가게 리뷰 목록 조회 API";
    #swagger.parameters['storeId'] = {
        in: "path",
        required: true,
        description: "조회할 가게 ID",
        schema: { type: "integer", example: 1 }
    };
    #swagger.parameters['cursor'] = {
        in: "query",
        required: false,
        description: "마지막으로 조회한 리뷰 ID. 없으면 0부터 시작",
        schema: { type: "integer", minimum: 0 }
    };
    #swagger.responses[200] = {
        description: "리뷰 목록 조회 성공",
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
                                            id: { type: "integer" },
                                            store: { type: "integer" },
                                            reviewer: { type: "integer" },
                                            content: { type: "string" },
                                            score: { type: "number", format: "double" }
                                        }
                                    }
                                },
                                pagination: {
                                    type: "object",
                                    properties: {
                                        cursor: { type: "integer", nullable: true }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    };
    */
    const reviews = await listStoreReviews(
        parseInt(req.params.storeId),
        typeof req.query.cursor === "string" ? parseInt(req.query.cursor) : 0
    );
    res.status(StatusCodes.OK).success(reviews);
}