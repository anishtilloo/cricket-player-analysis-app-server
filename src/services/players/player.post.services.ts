import prisma from "../../utils/prisma";
import type { Player, Players } from "../../types/player.types";
import { PlayerSchemaType } from "../../schemas/player.schema";

const addPlayer = async (player: Omit<Player, "id">) : Promise<Player> => {
    const {
        playerName, playerImg, physicals, mentalStats, characteristics, height, weight, basePrise, actualPrise, injured, fitnessScore, analysis, playerType, team
    } = player;
    return  await prisma.player.create({
        data: {
            playerName: playerName,
            playerImg: playerImg,
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
            team: team
        }
    })
}

export default addPlayer;