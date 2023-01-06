/*
  Warnings:

  - You are about to drop the column `establishment` on the `appointment` table. All the data in the column will be lost.
  - You are about to drop the column `establishmentCep` on the `appointment` table. All the data in the column will be lost.
  - Added the required column `establishmentId` to the `appointment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "appointment" DROP COLUMN "establishment",
DROP COLUMN "establishmentCep",
ADD COLUMN     "establishmentId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "establishment" (
    "id" TEXT NOT NULL,
    "cnesCode" INTEGER NOT NULL,
    "fantasyName" TEXT NOT NULL,
    "cep" INTEGER NOT NULL,
    "address" TEXT NOT NULL,
    "latitude" INTEGER NOT NULL,
    "logitude" INTEGER NOT NULL,

    CONSTRAINT "establishment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "establishment_cnesCode_key" ON "establishment"("cnesCode");

-- AddForeignKey
ALTER TABLE "appointment" ADD CONSTRAINT "appointment_establishmentId_fkey" FOREIGN KEY ("establishmentId") REFERENCES "establishment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
