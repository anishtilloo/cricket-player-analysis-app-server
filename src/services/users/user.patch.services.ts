import { Prisma, RoleEnumType } from "@prisma/client";
import prisma from "../../utils/prisma";

export const assignRoleToUser = async (role: RoleEnumType, user: Prisma.UserUpdateInput,) => {
    const updateUser = await prisma.user.update({
        where: {
            id: user.id as unknown as string,
        },
        data: {
            ...user,
            role: role,
        }
    })
    return updateUser;
}