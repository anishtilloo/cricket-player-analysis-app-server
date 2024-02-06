import prisma from "../../utils/prisma";
import { PlayerSchemaType } from "../../schemas/player.schema";

export const update = async (id: string, player: PlayerSchemaType) => {
    return prisma.player.update({
        where: {
            id,
        },
        data: {
            ...player
        },
    })
}