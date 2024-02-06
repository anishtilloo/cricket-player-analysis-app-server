import prisma from "../../utils/prisma";
import type { Player, Players } from "../../types/player.types";

export const deletePlayer = async (id: string) => {
    return await prisma.player.delete({
        where: {
            id,
        },
    })
}