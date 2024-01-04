import prisma from "../../utils/prisma";
import type { Team, Teams } from "../../types/team.types";

export const deleteTeam = async (id: number) : Promise<Team> => {
    return  prisma.team.delete({
        where: {
            id,
        },
    })
}