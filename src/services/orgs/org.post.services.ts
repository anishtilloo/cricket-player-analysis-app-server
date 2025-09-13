import prisma from "../../utils/prisma";
import { OrgType } from "../../types/org.types";

const addOrg = async (org: OrgType) => {
  const result = await prisma.organization.create({
    data: org,
  });
  return {
    id: Number(result.id),
    name: result.name,
    ownerName: result.ownerName,
    email: result.email
  }
};

export default addOrg;
