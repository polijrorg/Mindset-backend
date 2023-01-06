-- DropIndex
DROP INDEX "establishment_cnesCode_key";

-- AlterTable
ALTER TABLE "establishment" ALTER COLUMN "latitude" DROP NOT NULL,
ALTER COLUMN "longitude" DROP NOT NULL;
