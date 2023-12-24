/*
  Warnings:

  - The values [CLAM] on the enum `CHARACTERISTICS` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "CHARACTERISTICS_new" AS ENUM ('CALM', 'AGGRESSIVE');
ALTER TABLE "Players" ALTER COLUMN "characteristics" TYPE "CHARACTERISTICS_new" USING ("characteristics"::text::"CHARACTERISTICS_new");
ALTER TYPE "CHARACTERISTICS" RENAME TO "CHARACTERISTICS_old";
ALTER TYPE "CHARACTERISTICS_new" RENAME TO "CHARACTERISTICS";
DROP TYPE "CHARACTERISTICS_old";
COMMIT;
