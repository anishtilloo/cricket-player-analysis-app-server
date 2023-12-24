/*
  Warnings:

  - The primary key for the `Players` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Players` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Teams` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Teams` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `teamId` on the `Players` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "Players" DROP CONSTRAINT "Players_teamId_teamName_fkey";

-- AlterTable
ALTER TABLE "Players" DROP CONSTRAINT "Players_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "teamId",
ADD COLUMN     "teamId" INTEGER NOT NULL,
ADD CONSTRAINT "Players_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Teams" DROP CONSTRAINT "Teams_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Teams_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "Teams_id_teamName_key" ON "Teams"("id", "teamName");

-- AddForeignKey
ALTER TABLE "Players" ADD CONSTRAINT "Players_teamId_teamName_fkey" FOREIGN KEY ("teamId", "teamName") REFERENCES "Teams"("id", "teamName") ON DELETE RESTRICT ON UPDATE CASCADE;
