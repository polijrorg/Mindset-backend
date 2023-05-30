/*
  Warnings:

  - Made the column `price` on table `course` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "course" DROP CONSTRAINT "course_userId_fkey";

-- AlterTable
ALTER TABLE "course" ALTER COLUMN "price" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "course" ADD CONSTRAINT "course_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
