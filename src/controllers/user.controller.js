import { StatusCodes } from "http-status-codes";
import { bodyToUser } from "../dtos/user.dto.js";
import { 
    userSignUp,
    getUserByAccessToken,
    listUserReviews
} from "../services/user.service.js";

export const handleUserSignup = async (req, res, next) => {
    console.log("회원가입을 요청했습니다!");
    
    const user = await userSignUp(bodyToUser(req.body));
    res.status(StatusCodes.OK).json({
        success: true,
        code: StatusCodes.OK,
        message: "회원가입 요청이 완료되었습니다.",
        data: {
            access_token: "Bearer " + user.access_token,
            refresh_token: "Bearer " + user.refresh_token
        }
    });
};

export const handleUserReviews = async (req, res, next) => {
    console.log("작성한 리뷰 목록 조회를 요청했습니다!");

    const user = await getUserByAccessToken(req.get("Authorization"));
    if(user == null) throw new Error("사용자가 불분명합니다.");
    
    const cursor = (typeof req.query.cursor === "string") ? parseInt(req.query.cursor) : 0

    const reviews = await listUserReviews(user, cursor);
    res.status(StatusCodes.OK).json({
        success: true,
        code: StatusCodes.OK,
        message: "리뷰 목록 조회 요청이 완료되었습니다.",
        data: reviews
    });
}