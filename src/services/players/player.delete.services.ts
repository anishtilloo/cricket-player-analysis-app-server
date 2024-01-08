import prisma from "../../utils/prisma";
import type { Player, Players } from "../../types/player.types";

export const deletePlayer = async (id: number) : Promise<Player> => {
    return prisma.player.delete({
        where: {
            id,
        },
    })
}