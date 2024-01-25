import prisma from "../../utils/prisma";
import { TeamSchemaType } from "../../schemas/team.schema";

export const update = async (id: number, team: TeamSchemaType) => {
    return  prisma.team.update({
        where: {
            id,
        },
        data: {
            ...team
        },
    })
}

