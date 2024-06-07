import prisma from "../../utils/prisma";

export const deleteUserById = async (userId: string) => {
  return await prisma.user.delete({
    where: {
      id: userId,
    },
  });
};
