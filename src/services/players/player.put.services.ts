import prisma from "../../utils/prisma";
import type { Player, Players } from "../../types/player.types";

export const update = async (id: number, player: Omit<Player, "id">) : Promise<Player> => {
    const {
        playerName, physicals, mentalStats, characteristics, height, weight, basePrise, actualPrise, injured, fitnessScore, analysis, playerType, teamId, teamName,
    } = player;
    return prisma.player.update({
        where: {
            id,
        },
        data: {
            playerName,
            physicals,
            mentalStats,
            characteristics,
            height,
            weight,
            basePrise,
            actualPrise,
            injured,
            fitnessScore,
            analysis,
            playerType,
            teamId,
            teamName,
        },
        select: {
            id: true,
            playerName: true,
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