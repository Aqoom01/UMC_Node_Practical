import { StatusCodes } from "http-status-codes";
import { bodyToUser } from "../dtos/user.dto.js";
import { 
    userSignUp,
    getUserByAccessToken,
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
            properties: {
              email: { type: "string" },
              name: { type: "string" },
              gender: { type: "string" },
              birth: { type: "string", format: "date" },
              address: { type: "string" },
              detailAddress: { type: "string" },
              phoneNumber: { type: "string" },
              preferences: { type: "array", items: { type: "number" } }
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
              resultType: { type: "string", example: "SUCCESS" },
              error: { type: "object", nullable: true, example: null },
              success: {
                type: "object",
                properties: {
                  email: { type: "string" },
                  name: { type: "string" },
                  preferCategory: { type: "array", items: { type: "string" } }
                }
              }
            }
          }
        }
      }
    };
    #swagger.responses[400] = {
        description: "회원 가입 실패 응답",
        content: {
            "application/json": {
                schema: {
                    type: "object",
                    properties: {
                        resultType: { type: "string", example: "FAIL" },
                        error: {
                            type: "object",
                            properties: {
                            errorCode: { type: "string", example: "U001" },
                            reason: { type: "string" },
                            data: { type: "object" }
                        },
                        success: { type: "object", nullable: true, example: null }
                    }
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
    /*
    #swagger.summary = "작성한 리뷰 목록 조회 API";
    #swagger.responses[500] = {
        description: "Access_Token 오류",
        content: {
            "application/json": {
                schema: {
                    type: "object",
                    properties: {
                        success: { type: "boolean" },
                        code: { type: "string", example: "U002" },
                        reason: { type: "string" },
                        data: { type: "object" }
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

    const user = await getUserByAccessToken(req.get("Authorization"));
    
    const cursor = (typeof req.query.cursor === "string") ? parseInt(req.query.cursor) : 0
    const reviews = await listUserReviews(user, cursor);
    res.status(StatusCodes.OK).success(reviews);
}