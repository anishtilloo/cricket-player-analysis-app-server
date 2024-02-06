import { Player } from "@prisma/client";

export type Team = {
  id?: string;
  teamName: string;
  ownerName: string;
  coach: any;
  netWorth: number;
  teamLogo: string;
  players?: Player[];
};

export type Teams = Team[];
