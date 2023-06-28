/*
  Warnings:

  - You are about to drop the column `contrato` on the `producer` table. All the data in the column will be lost.
  - Added the required column `curriculum` to the `producer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "producer" DROP COLUMN "contrato",
ADD COLUMN     "curriculum" TEXT NOT NULL;
