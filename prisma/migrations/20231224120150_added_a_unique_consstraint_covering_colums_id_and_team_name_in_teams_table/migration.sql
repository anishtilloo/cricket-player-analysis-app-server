/*
  Warnings:

  - A unique constraint covering the columns `[id,teamName]` on the table `Teams` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `teamName` to the `Players` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Players" DROP CONSTRAINT "Players_teamId_fkey";

-- AlterTable
ALTER TABLE "Players" ADD COLUMN     "teamName" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Teams_id_teamName_key" ON "Teams"("id", "teamName");

-- AddForeignKey
ALTER TABLE "Players" ADD CONSTRAINT "Players_teamId_teamName_fkey" FOREIGN KEY ("teamId", "teamName") REFERENCES "Teams"("id", "teamName") ON DELETE RESTRICT ON UPDATE CASCADE;
