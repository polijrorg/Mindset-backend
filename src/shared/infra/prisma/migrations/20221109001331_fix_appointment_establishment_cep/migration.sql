/*
  Warnings:

  - You are about to drop the column `location` on the `appointment` table. All the data in the column will be lost.
  - Added the required column `establishmentCep` to the `appointment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "appointment" DROP COLUMN "location",
ADD COLUMN     "establishmentCep" TEXT NOT NULL;
