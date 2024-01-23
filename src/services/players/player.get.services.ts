import prisma from "../../utils/prisma";
import type { Player, Players } from "../../types/player.types";

// export type Player = {
//     id?: number;
//     playerName: string;
//     physicals: any;
//     mentalStats: any;
//     characteristics: CHARACTERISTICS;
//     height: number;
//     weight: number;
//     basePrise: number;
//     actualPrise: number;
//     injured: any;
//     fitnessScore: number,
//     analysis: any,
//     playerType: PLAYERTYPE,
//     teamId: number,
//     teamName: string,
// }


export const listPlayers = async (): Promise<Players> => {
    return prisma.player.findMany({
        select: {
            id: true,
            playerName: true,
            playerImg: true,
            physicals: true,
            mentalStats: true,
            characteristics: true,
            height: true,
            weight: true,
            basePrise: true,
            actualPrise: true,
            injured: true,
            fitnessScore: true,
            analysis: true,
            playerType: true,
            teamId: true,
            teamName: true,
        }
    })
}

export const getPlayer = async (id: number): Promise<Player | null> => {
    return prisma.player.findUnique({
        where: {
            id,
        },
    })
}