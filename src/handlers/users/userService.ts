import bcrypt from "bcrypt";
import prisma from "../../utils/prisma";

export async function findUserByEmail(email: string) {
        const result = await prisma.user.findUnique({
            where: {
              email,
            },
        });
        return result;
}

export async function createUserByEmailAndPassword(user: {email: string; password: string}){
    user.password = bcrypt.hashSync(user.password, 12);
    const result = await prisma.user.create({
        data: user
    });
    return result.id
}

export async function findUserById(id: string) {
    const result = await prisma.user.findUnique({
        where: {
            id: id,
        }
    });
    return result;
}