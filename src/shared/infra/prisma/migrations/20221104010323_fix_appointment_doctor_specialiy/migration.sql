/*
  Warnings:

  - You are about to drop the column `doctorSpecialty` on the `appointment` table. All the data in the column will be lost.
  - Added the required column `doctorSpeciality` to the `appointment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "appointment" DROP COLUMN "doctorSpecialty",
ADD COLUMN     "doctorSpeciality" TEXT NOT NULL;
