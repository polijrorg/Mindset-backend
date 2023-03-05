/*
  Warnings:

  - You are about to drop the column `phone` on the `user` table. All the data in the column will be lost.
  - Added the required column `code` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phoneNumber` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "user" DROP COLUMN "phone",
ADD COLUMN     "code" TEXT NOT NULL,
ADD COLUMN     "phoneNumber" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "appointment" (
    "id" TEXT NOT NULL,
    "establishmentId" INTEGER NOT NULL,
    "patientId" TEXT NOT NULL,
    "doctorId" TEXT NOT NULL,
    "doctorSpeciality" TEXT NOT NULL,
    "transport" TEXT NOT NULL,
    "fuel" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "patientCep" TEXT NOT NULL,
    "reason" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "patientSex" TEXT NOT NULL,
    "generatedCC" DOUBLE PRECISION NOT NULL,
    "CO2" DOUBLE PRECISION NOT NULL,
    "distance" DOUBLE PRECISION NOT NULL,
    "companyId" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "appointment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "establishment" (
    "id" TEXT NOT NULL,
    "cnesCode" INTEGER NOT NULL,
    "fantasyName" TEXT NOT NULL,
    "cep" INTEGER NOT NULL,
    "address" TEXT NOT NULL,
    "district" TEXT NOT NULL,
    "place" TEXT NOT NULL,
    "latitude" INTEGER,
    "longitude" INTEGER,

    CONSTRAINT "establishment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "establishment_cnesCode_key" ON "establishment"("cnesCode");

-- CreateIndex
CREATE INDEX "establishment_id_cnesCode_idx" ON "establishment"("id", "cnesCode");

-- AddForeignKey
ALTER TABLE "appointment" ADD CONSTRAINT "appointment_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "appointment" ADD CONSTRAINT "appointment_establishmentId_fkey" FOREIGN KEY ("establishmentId") REFERENCES "establishment"("cnesCode") ON DELETE RESTRICT ON UPDATE CASCADE;
