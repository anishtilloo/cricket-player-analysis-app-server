import prisma from "../../utils/prisma";

export const listTeams = async () => {
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

export const getTeam = async (id: string) => {
    return prisma.team.findUnique({
        where: {
            id,
        },
        include: {
            players: true
        }
    })
}