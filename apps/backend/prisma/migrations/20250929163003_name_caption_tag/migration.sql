-- AlterTable
ALTER TABLE "public"."Images" ADD COLUMN     "age" TEXT,
ADD COLUMN     "caption" TEXT,
ADD COLUMN     "date" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "name" TEXT,
ADD COLUMN     "tags" TEXT;
