/*
  Warnings:

  - You are about to alter the column `latitude` on the `establishment` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to alter the column `longitude` on the `establishment` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - A unique constraint covering the columns `[cnesCode]` on the table `establishment` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "establishment" ALTER COLUMN "latitude" SET DATA TYPE INTEGER,
ALTER COLUMN "longitude" SET DATA TYPE INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "establishment_cnesCode_key" ON "establishment"("cnesCode");

-- CreateIndex
CREATE INDEX "establishment_id_cnesCode_idx" ON "establishment"("id", "cnesCode");
