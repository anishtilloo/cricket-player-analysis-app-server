import prisma from "../../utils/prisma";
import { PlayerSchemaType } from "../../schemas/player.schema";

const addPlayer = async (player: PlayerSchemaType) => {
 
  return await prisma.player.create({
    data: player
  });
};

export default addPlayer;
