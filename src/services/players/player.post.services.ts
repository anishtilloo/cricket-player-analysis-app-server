import prisma from "../../utils/prisma";
import type { Player, Players } from "../../types/player.types";

const addPlayer = async (player: Omit<Player, "id">) : Promise<Player> => {
    const {
        playerName, physicals, mentalStats, characteristics, height, weight, basePrise, actualPrise, injured, fitnessScore, analysis, playerType, teamId, teamName,
    } = player;
    return  prisma.player.create({
        data: {
            playerName: playerName,
            physicals: physicals,
            mentalStats: mentalStats,
            characteristics: characteristics,
            height: height,
            weight: weight,
            basePrise: basePrise,
            actualPrise: actualPrise,
            injured: injured,
            fitnessScore: fitnessScore,
            analysis: analysis,
            playerType: playerType,
            teamId: teamId,
            teamName: teamName,
        }
    })
}

export default addPlayer;