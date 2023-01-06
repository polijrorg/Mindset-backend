/*
  Warnings:

  - Added the required column `district` to the `establishment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `place` to the `establishment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "establishment" ADD COLUMN     "district" TEXT NOT NULL,
ADD COLUMN     "place" TEXT NOT NULL;
