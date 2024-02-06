import httpStatus from "http-status";
import ApiError from "../../utils/ApiError";
import prisma from "../../utils/prisma";
import { getUserById } from "./user.get.services";

export const deleteUserById = async (userId: string) => {
    const user = await getUserById(userId);
    if (!user) {
      throw new ApiError(httpStatus.NOT_FOUND, "User not found");
    }
  return await prisma.user.delete({
    where: {
      id: userId,
    },
  });
};
