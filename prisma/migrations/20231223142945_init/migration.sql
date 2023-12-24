-- CreateEnum
CREATE TYPE "CHARACTERISTICS" AS ENUM ('CLAM', 'AGGRESSIVE');

-- CreateEnum
CREATE TYPE "PLAYERTYPE" AS ENUM ('BATSMEN', 'BATSMEN_WICKETKEEPER', 'BOWLER', 'ALL_ROUNDER');

-- CreateTable
CREATE TABLE "Team" (
    "id" TEXT NOT NULL,
    "teamName" TEXT NOT NULL,
    "ownerName" TEXT NOT NULL,
    "coach" JSONB NOT NULL,
    "newWorth" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Team_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Player" (
    "id" TEXT NOT NULL,
    "playerName" TEXT NOT NULL,
    "physicals" JSONB NOT NULL,
    "mentalStats" JSONB NOT NULL,
    "characteristics" "CHARACTERISTICS" NOT NULL,
    "height" DOUBLE PRECISION NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,
    "basePrise" DOUBLE PRECISION NOT NULL,
    "actualPrise" DOUBLE PRECISION NOT NULL,
    "injured" JSONB NOT NULL,
    "fitnessScore" DOUBLE PRECISION NOT NULL,
    "analysis" JSONB NOT NULL,
    "playerType" "PLAYERTYPE" NOT NULL,
    "teamId" TEXT NOT NULL,

    CONSTRAINT "Player_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Player" ADD CONSTRAINT "Player_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
