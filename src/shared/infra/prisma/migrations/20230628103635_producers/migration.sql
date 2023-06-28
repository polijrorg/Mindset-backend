/*
  Warnings:

  - You are about to alter the column `rating` on the `course` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.

*/
-- DropForeignKey
ALTER TABLE "videoClasses" DROP CONSTRAINT "videoClasses_courseId_fkey";

-- AlterTable
ALTER TABLE "course" ALTER COLUMN "rating" SET DATA TYPE DOUBLE PRECISION;

-- CreateTable
CREATE TABLE "producer" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "birthdayDate" TEXT NOT NULL,
    "course" TEXT NOT NULL,
    "rgFront" TEXT NOT NULL,
    "rgBack" TEXT NOT NULL,
    "rgNumber" TEXT NOT NULL,
    "contrato" TEXT NOT NULL,

    CONSTRAINT "producer_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "videoClasses" ADD CONSTRAINT "videoClasses_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "course"("id") ON DELETE CASCADE ON UPDATE CASCADE;
