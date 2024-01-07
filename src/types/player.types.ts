import { CHARACTERISTICS, PLAYERTYPE } from "@prisma/client";

export type Player = {
    id?: number;
    playerName: string;
    physicals: string;
    mentalStats: any;
    characteristics: CHARACTERISTICS;
    height: number;
    weight: number;
    basePrise: number;
    actualPrise: number;
    injured: any;
    fitnessScore: number,
    analysis: any,
    playerType: PLAYERTYPE,
    teamId: number,
    teamName: string,
}

export type Players = Player[];