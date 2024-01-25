import prisma from "../../utils/prisma";
import { PlayerSchemaType } from "../../schemas/player.schema";

const addPlayer = async (player: PlayerSchemaType) => {
    const {
        playerName, 
        playerImg, 
        characteristics, 
        height, 
        weight, 
        basePrise, 
        actualPrise, 
        fitnessScore, 
        injured, 
        analysis, 
        physicals, 
        mentalStats, 
        playerType,
        team
    } = player;
    return  await prisma.player.create({
        data: {
            playerName: playerName,
            playerImg: playerImg,
            characteristics: characteristics,
            height: height,
            weight: weight,
            basePrise: basePrise,
            actualPrise: actualPrise,
            fitnessScore: fitnessScore,
            injured: injured,
            analysis: analysis,
            physicals: physicals,
            mentalStats: mentalStats,
            playerType: playerType,
            team: {
                ...team
            }
        }
    })
}

export default addPlayer;