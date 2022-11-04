/*
  Warnings:

  - You are about to drop the column `Patientcep` on the `appointment` table. All the data in the column will be lost.
  - Added the required column `patientCep` to the `appointment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "appointment" DROP COLUMN "Patientcep",
ADD COLUMN     "patientCep" TEXT NOT NULL;
