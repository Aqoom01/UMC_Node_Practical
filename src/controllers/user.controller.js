import { StatusCodes } from "http-status-codes";
import { bodyToUser } from "../dtos/user.dto.js";
import { 
    userSignUp,
    //getUserByAccessToken,
    listUserReviews
} from "../services/user.service.js";

export const handleUserSignup = async (req, res, next) => {
    console.log("회원가입을 요청했습니다!");
    /* Swagger 설정
    #swagger.summary = '회원 가입 API';
    #swagger.requestBody = {
        required: true,
        content: {
            "application/json": {
                schema: {
                    type: "object",
                    required: [
                        "email",
                        "password",
                        "name",
                        "gender",
                        "birth",
                        "address1",
                        "address2"
                    ],
                    properties: {
                        email: { type: "string", format: "email" },
                        password: { type: "string", minLength: 8 },
                        name: { type: "string" },
                        gender: { type: "string", enum: ["M", "F"] },
                        birth: { type: "string", format: "date" },
                        address1: { type: "string", description: "기본 주소" },
                        address2: { type: "string", description: "상세 주소" }
                    }
                }
            }
        }
    };
    #swagger.responses[200] = {
        description: "회원 가입 성공 응답",
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
                                access_token: { type: "string" },
                                refresh_token: { type: "string" }
                            }
                        }
                    }
                }
            }
        }
    };
    #swagger.responses[400] = {
        description: "중복 이메일 등 유효하지 않은 요청",
        content: {
            "application/json": {
                schema: {
                    type: "object",
                    properties: {
                        success: { type: "boolean", example: false },
                        code: { type: "string", example: "U001" },
                        reason: { type: "string", example: "이미 존재하는 이메일입니다." },
                        data: { type: "object", nullable: true }
                    }
                }
            }
        }
    };
    */
    
    const user = await userSignUp(bodyToUser(req.body));
    res.status(StatusCodes.OK).success(user);
};

export const handleUserReviews = async (req, res, next) => {
    console.log("작성한 리뷰 목록 조회를 요청했습니다!");
    /* Swagger 설정
    #swagger.summary = "작성한 리뷰 목록 조회 API";
    #swagger.parameters['Authorization'] = {
        in: "header",
        required: true,
        description: "access-token-for-user-{userId} 형태의 토큰",
        schema: { type: "string", example: "Bearer access-token-for-user-1" }
    };
    #swagger.parameters['cursor'] = {
        in: "query",
        required: false,
        description: "이전 응답의 cursor 값",
        schema: { type: "integer", minimum: 0 }
    };
    #swagger.responses[401] = {
        description: "액세스 토큰 검증 실패",
        content: {
            "application/json": {
                schema: {
                    type: "object",
                    properties: {
                        success: { type: "boolean", example: false },
                        code: { type: "string", example: "U002" },
                        reason: { type: "string", example: "Access token is invalid." },
                        data: { type: "object", nullable: true }
                    }
                }
            }
        }
    };
    #swagger.responses[200] = {
        description: "작성한 리뷰 목록 조회 API 성공 응답",
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
                                            score: { type: "number", format: "double", example: "2.1" },
                                            content: { type: "string" },
                                            created_at: { type: "string", format: "date" },
                                            images: { type: "array", items: { type: "string" } },
                                            is_answer: { type: "boolean" },
                                            answer: {
                                                type: "object",
                                                properties: {
                                                    content: { type: "string" },
                                                    created_at: { type: "string", format: "date" }
                                                }
                                            }
                                        }
                                    }
                                },
                                cursor: { type: "integer" },
                                totalReviews: { type: "integer" }
                            }
                        }
                    }
                }
            }
        }
    };
    */

    const user = await req.user;    
    const cursor = (typeof req.query.cursor === "string") ? parseInt(req.query.cursor) : 0
    const reviews = await listUserReviews(user, cursor);
    res.status(StatusCodes.OK).success(reviews);
}