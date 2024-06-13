import { User, RoleEnumType } from "@prisma/client";

import prisma from "../../utils/prisma";
import { encryptPassword } from "../../utils/encryption";

const createUser = async (user: User) => {
  return await prisma.user.create({
    data: {
      ...user,
      password: await encryptPassword(user.password),
      role: RoleEnumType.USER,
    },
  });
};

export default createUser;
