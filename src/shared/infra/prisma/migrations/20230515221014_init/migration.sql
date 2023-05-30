/*
  Warnings:

  - You are about to alter the column `price` on the `course` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.

*/
-- DropForeignKey
ALTER TABLE "course" DROP CONSTRAINT "course_userId_fkey";

-- AlterTable
ALTER TABLE "course" ALTER COLUMN "price" DROP NOT NULL,
ALTER COLUMN "price" SET DATA TYPE INTEGER;

-- AddForeignKey
ALTER TABLE "course" ADD CONSTRAINT "course_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
