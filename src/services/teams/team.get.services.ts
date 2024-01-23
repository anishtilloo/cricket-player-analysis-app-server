import prisma from "../../utils/prisma";
import type { Team, Teams } from "../../types/team.types";

export const listTeams = async (): Promise<Teams> => {
    return prisma.team.findMany({
        select: {
            id: true,
            teamLogo: true,
            teamName: true,
            ownerName: true,
            coach: true,
            netWorth: true
        }
    })
}

export const getTeam = async (id: number): Promise<Team | null> => {
    return prisma.team.findUnique({
        where: {
            id,
        },
        include: {
            players: true
        }
    })
}