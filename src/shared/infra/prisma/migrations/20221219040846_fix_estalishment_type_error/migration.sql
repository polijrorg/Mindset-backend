/*
  Warnings:

  - You are about to drop the column `logitude` on the `establishment` table. All the data in the column will be lost.
  - Added the required column `longitude` to the `establishment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "establishment" DROP COLUMN "logitude",
ADD COLUMN     "longitude" INTEGER NOT NULL;
