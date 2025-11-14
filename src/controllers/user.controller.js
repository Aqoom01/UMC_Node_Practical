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