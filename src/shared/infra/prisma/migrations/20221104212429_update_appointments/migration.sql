/*
  Warnings:

  - Added the required column `CO2` to the `appointment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Patientcep` to the `appointment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `city` to the `appointment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `establishment` to the `appointment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `location` to the `appointment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `reason` to the `appointment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `appointment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "appointment" ADD COLUMN     "CO2" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "Patientcep" TEXT NOT NULL,
ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "establishment" TEXT NOT NULL,
ADD COLUMN     "location" TEXT NOT NULL,
ADD COLUMN     "reason" TEXT NOT NULL,
ADD COLUMN     "type" TEXT NOT NULL;
