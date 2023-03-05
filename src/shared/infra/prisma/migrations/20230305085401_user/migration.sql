/*
  Warnings:

  - You are about to drop the `appointment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `establishment` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "appointment" DROP CONSTRAINT "appointment_companyId_fkey";

-- DropForeignKey
ALTER TABLE "appointment" DROP CONSTRAINT "appointment_establishmentId_fkey";

-- DropTable
DROP TABLE "appointment";

-- DropTable
DROP TABLE "establishment";
