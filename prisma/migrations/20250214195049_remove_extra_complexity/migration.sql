/*
  Warnings:

  - The values [ORG_ADMIN,ORG_TEAM_MANAGER,ORG_ANALYST] on the enum `RoleEnumType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "RoleEnumType_new" AS ENUM ('ADMIN', 'TEAM_MANAGER', 'ANALYST', 'RECRUITER', 'PLAYER', 'USER');
ALTER TABLE "Users" ALTER COLUMN "role" TYPE "RoleEnumType_new" USING ("role"::text::"RoleEnumType_new");
ALTER TYPE "RoleEnumType" RENAME TO "RoleEnumType_old";
ALTER TYPE "RoleEnumType_new" RENAME TO "RoleEnumType";
DROP TYPE "RoleEnumType_old";
COMMIT;
