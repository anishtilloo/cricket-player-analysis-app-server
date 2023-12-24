/*
  Warnings:

  - You are about to drop the `Player` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Player" DROP CONSTRAINT "Player_teamId_fkey";

-- DropTable
DROP TABLE "Player";

-- CreateTable
CREATE TABLE "Players" (
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

    CONSTRAINT "Players_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Players" ADD CONSTRAINT "Players_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Teams"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
