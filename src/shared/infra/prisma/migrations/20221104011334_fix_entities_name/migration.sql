/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "appointment" DROP CONSTRAINT "appointment_companyId_fkey";

-- DropTable
DROP TABLE "User";

-- AddForeignKey
ALTER TABLE "appointment" ADD CONSTRAINT "appointment_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
