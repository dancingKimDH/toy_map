/*
  Warnings:

  - You are about to drop the column `accessToken` on the `Session` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Session` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Session` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Session_accessToken_key";

-- AlterTable
ALTER TABLE "Session" DROP COLUMN "accessToken",
DROP COLUMN "createdAt",
DROP COLUMN "updatedAt";
