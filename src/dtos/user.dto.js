export const bodyToUser = (body) => {
    const Birth = new Date(body.birth);

    return {
        email: body.email,
        password: body.password,
        name: body.name, 
        gender: body.gender,
        birth: Birth,
        address1: body.address1,
        address2: body.address2
    };
};

export const responseFromUser = ({ user }) => {
    return {
        access_token: `access-token-for-user-${user.id}`,
        refresh_token: `refresh-token-for-user-${user.id}`
    };
};