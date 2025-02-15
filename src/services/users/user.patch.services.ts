import { Prisma, RoleEnumType } from "@prisma/client";
import prisma from "../../utils/prisma";

export const assignRoleToUser = async (role: RoleEnumType, user: Prisma.UserUpdateInput,) => {
    const updateUser = await prisma.user.update({
        where: {
            id: BigInt(String(user.id)),
        },
        data: {
            ...user,
            role: role,
        }
    })
    return updateUser;
}