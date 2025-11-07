import { prisma } from "../db.config.js"

export const addUser = async (data) => {
    const confirm = await prisma.user.findFirst({ where: {email: data.email}})
    if(confirm == null) return null

    const newUser = await prisma.user.create({ data: data });
    return newUser.id;
}

export const getUser = async (userId) => {
    const confirm = await prisma.user.findFirst({ where: {id: userId}});
    return confirm;
}