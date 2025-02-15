-- CreateEnum
CREATE TYPE "RoleEnumType" AS ENUM ('ORGANIZATION', 'ORG_ADMIN', 'ORG_TEAM_MANAGER', 'ORG_ANALYST', 'RECRUITER', 'PLAYER', 'USER');

-- CreateEnum
CREATE TYPE "TokenType" AS ENUM ('ACCESS', 'REFRESH', 'RESET_PASSWORD', 'VERIFY_EMAIL');

-- CreateEnum
CREATE TYPE "PLAYERTYPE" AS ENUM ('BATSMEN', 'BATSMEN_WICKETKEEPER', 'BOWLER', 'ALL_ROUNDER');

-- CreateTable
CREATE TABLE "Users" (
    "id" BIGSERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "avatar" TEXT DEFAULT 'default.png',
    "role" "RoleEnumType" NOT NULL,
    "isEmailVerified" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "playerId" BIGINT NOT NULL,
    "organizationId" BIGINT NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Organization" (
    "id" BIGSERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "ownerName" VARCHAR(255) NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "Organization_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tokens" (
    "id" BIGSERIAL NOT NULL,
    "token" TEXT NOT NULL,
    "type" "TokenType" NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,
    "blacklisted" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" BIGINT NOT NULL,

    CONSTRAINT "Tokens_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Teams" (
    "id" BIGSERIAL NOT NULL,
    "teamName" VARCHAR(255) NOT NULL,
    "ownerName" TEXT NOT NULL,
    "coach" JSONB,
    "netWorth" DOUBLE PRECISION,
    "teamLogo" TEXT,
    "organizationId" BIGINT NOT NULL,

    CONSTRAINT "Teams_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Players" (
    "id" BIGSERIAL NOT NULL,
    "playerName" VARCHAR(255) NOT NULL,
    "playerImg" TEXT,
    "characteristics" TEXT[],
    "height" DOUBLE PRECISION NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,
    "basePrice" DOUBLE PRECISION,
    "actualPrice" DOUBLE PRECISION,
    "fitnessScore" DOUBLE PRECISION,
    "injured" JSONB,
    "analysis" JSONB,
    "physicals" JSONB,
    "mentalStats" JSONB,
    "playerType" "PLAYERTYPE" NOT NULL,
    "teamId" BIGINT,
    "teamName" TEXT,
    "playingSquadId" BIGINT,
    "userId" BIGINT,

    CONSTRAINT "Players_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlayingSquads" (
    "id" BIGSERIAL NOT NULL,
    "teamId" BIGINT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PlayingSquads_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_id_key" ON "Users"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Organization_id_key" ON "Organization"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Organization_email_key" ON "Organization"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Tokens_id_key" ON "Tokens"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Teams_id_teamName_key" ON "Teams"("id", "teamName");

-- CreateIndex
CREATE UNIQUE INDEX "Players_id_key" ON "Players"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Players_userId_key" ON "Players"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "PlayingSquads_id_key" ON "PlayingSquads"("id");

-- AddForeignKey
ALTER TABLE "Users" ADD CONSTRAINT "Users_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tokens" ADD CONSTRAINT "Tokens_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Teams" ADD CONSTRAINT "Teams_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Players" ADD CONSTRAINT "Players_teamId_teamName_fkey" FOREIGN KEY ("teamId", "teamName") REFERENCES "Teams"("id", "teamName") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Players" ADD CONSTRAINT "Players_playingSquadId_fkey" FOREIGN KEY ("playingSquadId") REFERENCES "PlayingSquads"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Players" ADD CONSTRAINT "Players_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlayingSquads" ADD CONSTRAINT "PlayingSquads_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Teams"("id") ON DELETE CASCADE ON UPDATE CASCADE;
