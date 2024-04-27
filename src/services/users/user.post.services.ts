import { User, RoleEnumType } from "@prisma/client";
import prisma from "../../utils/prisma";
import { encryptPassword } from "../../utils/encryption";
import { getUserByEmail } from "./user.get.services";
import ApiError from "../../utils/ApiError";
import httpStatus from "http-status";

const createUser = async (user: User) => {
  const existingUserWithSameEmail = await getUserByEmail(user.email);
  if (existingUserWithSameEmail) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Email already taken");
  }
  return await prisma.user.create({
    data: {
      ...user,
      password: await encryptPassword(user.password),
      role: RoleEnumType.USER,
    },
  });
};

export default createUser;
