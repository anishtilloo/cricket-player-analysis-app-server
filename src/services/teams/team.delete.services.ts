import prisma from "../../utils/prisma";

export const deleteTeam = async (id: string) => {
    return  prisma.team.delete({
        where: {
            id,
        },
    })
}