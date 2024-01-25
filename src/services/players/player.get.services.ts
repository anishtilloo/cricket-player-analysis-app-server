import prisma from "../../utils/prisma";

export const listPlayers = async () => {
    return prisma.player.findMany();
}

export const getPlayer = async (id: number) => {
    return prisma.player.findUnique({
        where: {
            id,
        },
    })
}