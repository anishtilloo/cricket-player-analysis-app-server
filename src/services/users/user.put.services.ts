import { Prisma } from "@prisma/client";
import prisma from "../../utils/prisma";
import ApiError from "../../utils/ApiError";
import httpStatus from "http-status";
import { getUserByEmail, getUserById } from "./user.get.services";

export const updateUserById = async (
    userId: string,
    updateBody: Prisma.UserUpdateInput
) => {
    const gotUser = await getUserById(userId);
    if (!gotUser) {
        throw new ApiError(httpStatus.NOT_FOUND, "User not found");
    }
    if (updateBody.email && (await getUserByEmail(updateBody.email as string))) {
        throw new ApiError(httpStatus.BAD_REQUEST, "Email already taken");
    }
    const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: updateBody,
    });
    return updatedUser;
};

export default updateUserById;
