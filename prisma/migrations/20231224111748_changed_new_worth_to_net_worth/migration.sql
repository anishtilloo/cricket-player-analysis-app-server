/*
  Warnings:

  - You are about to drop the column `newWorth` on the `Teams` table. All the data in the column will be lost.
  - Added the required column `netWorth` to the `Teams` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Teams" DROP COLUMN "newWorth",
ADD COLUMN     "netWorth" DOUBLE PRECISION NOT NULL;
