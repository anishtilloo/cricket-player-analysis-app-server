import { PLAYERTYPE } from "@prisma/client";
import { Team } from "./team.types";

export type Player = {
    id?: number;
    playerName: string;
    playerImg: string;
    physicals: any;
    mentalStats: any;
    characteristics: string[];
    height: number;
    weight: number;
    basePrise: number;
    actualPrise: number;
    injured: any;
    fitnessScore: number,
    analysis: any,
    playerType: PLAYERTYPE,
    team?: Team
}

export type Players = Player[];