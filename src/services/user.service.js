import {
    responseFromUser,
    responseFromUserReviews
} from "../dtos/user.dto.js";
import {
    addUser,
    getUser
} from "../repositories/user.repository.js";
import {
    getUserReviews
} from "../repositories/review.repository.js"
import {
    getReviewImages
} from "../repositories/mapping/reviewpicture.repository.js";
import {
    getReviewAnswer
} from "../repositories/rereview.repository.js";
import {
    getImageUrl
} from "../repositories/picture.repository.js";
import {
    DuplicateUserEmailError,
    UnValidatedAccessTokenError
} from "../errors.js";


// export const getUserByAccessToken = async (s) => {
//     const id = s.split("-")[4];
//     const user = await getUser(id);
//     if(user == null) throw new UnValidatedAccessTokenError();

//     return user;
// }

export const userSignUp = async (data) => {
    const joinUserId = await addUser({
        email: data.email,
        password: data.password,
        name: data.name,
        gender: data.gender,
        birth: data.birth,
        address: data.address1,
        subaddr: data.address2
    });

    if (joinUserId === null) {
        throw new DuplicateUserEmailError("이미 존재하는 이메일입니다.");
    }

    const user = await getUser(joinUserId);
    return responseFromUser({ user });
};

export const listUserReviews = async (user, cursor) => {
    const reviews = await getReviewAnswer(await getImageUrl(await getReviewImages(await getUserReviews(user, cursor))));

    return responseFromUserReviews(reviews);
}