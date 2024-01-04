import prisma from "../../utils/prisma";
import type { Team, Teams } from "../../types/team.types";

export const update = async (id: number, team: Omit<Team, "id">) : Promise<Team> => {
    const { teamName, ownerName, coach, netWorth } = team;
    return  prisma.team.update({
        where: {
            id,
        },
        data: {
            teamName,
            ownerName,
            coach,
            netWorth
        },
        select: {
            id: true,
            teamName: true,
            ownerName: true,
            coach: true,
            netWorth: true,
        }
    })
}

