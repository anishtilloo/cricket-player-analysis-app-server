import prisma from "../../utils/prisma";

const getOrg = async (email: string) => {
  const result = await prisma.organization.findUnique({
    where: {
        email: email
    }
  });
  return result;
};

export default getOrg;
