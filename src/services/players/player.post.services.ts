import prisma from "../../utils/prisma";
import { PlayerSchemaType } from "../../schemas/player.schema";
import { Prisma } from "@prisma/client";
// import { Player } from "../../types/player.types";

const addPlayer = async (player: Prisma.PlayerCreateInput) => {
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
    team,
  } = player;
  return await prisma.player.create({
    data: {
      //   playerName: playerName,
      //   playerImg: playerImg,
      //   characteristics: characteristics,
      //   height: height,
      //   weight: weight,
      //   basePrise: basePrise,
      //   actualPrise: actualPrise,
      //   fitnessScore: fitnessScore,
      //   injured: injured,
      //   analysis: analysis,
      //   physicals: physicals,
      //   mentalStats: mentalStats,
      //   playerType: playerType,
      //   team: {
      //     ...team,
      //   },
      ...player,
    },
  });
};

export default addPlayer;
