import { prisma } from "../db.config.js"

export const addUser = async (data) => {
    const confirm = await prisma.user.findFirst({ where: {email: data.email}})
    if(confirm != null) return null

    const newUser = await prisma.user.create({ data: data });
    return newUser.id;
}

export const getUser = async (userId) => {
    const confirm = await prisma.user.findFirst({ where: {id: userId}});
    return confirm;
}

export const editUserInfo = async (user, body) => {
    const target = await prisma.user.findFirst({ where: { id: user.id } });
    if (!target) return null;

    const updated = await prisma.user.update({
        where: { id: target.id },
        data: {
            name: body.name,
            birth: new Date(body.birth),
            address: body.address,
            subaddr: body.subaddr,
            gender: body.gender,
            updated_at: new Date()
        }
    })

    return updated.id;
}