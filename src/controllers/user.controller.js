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
                }
              },
              success: { type: "object", nullable: true, example: null }
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

    const user = await getUserByAccessToken(req.get("Authorization"));
    if(user == null) throw new Error("사용자가 불분명합니다.");
    
    const cursor = (typeof req.query.cursor === "string") ? parseInt(req.query.cursor) : 0

    const reviews = await listUserReviews(user, cursor);
    res.status(StatusCodes.OK).success(reviews);
}