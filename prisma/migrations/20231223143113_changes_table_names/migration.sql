/*
  Warnings:

  - You are about to drop the `Team` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Player" DROP CONSTRAINT "Player_teamId_fkey";

-- DropTable
DROP TABLE "Team";

-- CreateTable
CREATE TABLE "Teams" (
    "id" TEXT NOT NULL,
    "teamName" TEXT NOT NULL,
    "ownerName" TEXT NOT NULL,
    "coach" JSONB NOT NULL,
    "newWorth" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Teams_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Player" ADD CONSTRAINT "Player_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Teams"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
