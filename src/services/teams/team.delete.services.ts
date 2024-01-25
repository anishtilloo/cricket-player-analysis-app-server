import prisma from "../../utils/prisma";

export const deleteTeam = async (id: number) => {
    return  prisma.team.delete({
        where: {
            id,
        },
    })
}