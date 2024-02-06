import { PLAYERTYPE } from "@prisma/client";
import { Team } from "./team.types";

export type Player = {
  id?: string;
  playerName: string;
  playerImg: string;
  characteristics: string[];
  height: number;
  weight: number;
  basePrise: number;
  actualPrise: number;
  fitnessScore: number;
  injured: any;
  analysis: any;
  physicals: any;
  mentalStats: any;
  playerType: PLAYERTYPE;
  team: Team;
};

export type Players = Player[];
