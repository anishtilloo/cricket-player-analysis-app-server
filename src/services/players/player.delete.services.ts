import prisma from "../../utils/prisma";

export const deletePlayer = async (id: string) => {
    return await prisma.player.delete({
        where: {
            id: BigInt(id),
        },
    })
}