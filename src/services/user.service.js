import { responseFromUser } from "../dtos/user.dto.js";
import {
    addUser,
    getUser
} from "../repositories/user.repository.js";

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
        throw new Error("이미 존재하는 이메일입니다.");
    }

    const user = await getUser(joinUserId);
    return responseFromUser({ user });
};