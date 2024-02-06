import { User, RoleEnumType } from "@prisma/client";
import prisma from "../../utils/prisma";
import { encryptPassword } from "../../utils/encryption";
import { getUserByEmail } from "./user.get.services";
import ApiError from "../../utils/ApiError";
import httpStatus from "http-status";

const createUser = async (user: User) => {
  console.log("before user creation in user service");
  const existingUserWithSameEmail = await getUserByEmail(user.email);
  console.log(existingUserWithSameEmail);

  if (existingUserWithSameEmail) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Email already taken");
  }
  console.log("after checking user does not exist in db");
  return await prisma.user.create({
    data: {
      ...user,
      password: await encryptPassword(user.password),
      role: RoleEnumType.USER,
    },
  });
};

export default createUser;
