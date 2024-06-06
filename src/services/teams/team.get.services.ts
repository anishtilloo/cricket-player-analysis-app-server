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
    })
}

export const getTeamUsingName = async (name : string) => {
    return prisma.team.findFirst({
        where: {
            teamName: {
                equals: name,
                mode: "insensitive",
            }
        }
    })
}

export const getToalCountOfTeams = async () => {
    return prisma.team.count();
}

export const getTeamsAllongWithTotalCount = async () => {
    return await prisma.$transaction([
        prisma.team.count(),
        prisma.team.findMany({
            select: {
                id: true,
                teamLogo: true,
                teamName: true,
                ownerName: true,
                coach: true,
                netWorth: true
            }
        })
    ])
}