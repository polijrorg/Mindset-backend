/*
  Warnings:

  - Changed the type of `establishmentId` on the `appointment` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "appointment" DROP CONSTRAINT "appointment_establishmentId_fkey";

-- AlterTable
ALTER TABLE "appointment" DROP COLUMN "establishmentId",
ADD COLUMN     "establishmentId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "appointment" ADD CONSTRAINT "appointment_establishmentId_fkey" FOREIGN KEY ("establishmentId") REFERENCES "establishment"("cnesCode") ON DELETE RESTRICT ON UPDATE CASCADE;
