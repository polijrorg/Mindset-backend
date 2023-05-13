-- DropForeignKey
ALTER TABLE "course" DROP CONSTRAINT "course_userId_fkey";

-- AddForeignKey
ALTER TABLE "course" ADD CONSTRAINT "course_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
