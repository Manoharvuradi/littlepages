/*
  Warnings:

  - You are about to drop the `_BookToImages` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."_BookToImages" DROP CONSTRAINT "_BookToImages_A_fkey";

-- DropForeignKey
ALTER TABLE "public"."_BookToImages" DROP CONSTRAINT "_BookToImages_B_fkey";

-- AlterTable
ALTER TABLE "public"."Images" ADD COLUMN     "bookId" INTEGER;

-- DropTable
DROP TABLE "public"."_BookToImages";

-- AddForeignKey
ALTER TABLE "public"."Images" ADD CONSTRAINT "Images_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "public"."Book"("id") ON DELETE SET NULL ON UPDATE CASCADE;
