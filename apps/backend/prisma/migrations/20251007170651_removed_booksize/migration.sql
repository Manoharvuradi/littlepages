/*
  Warnings:

  - You are about to drop the column `bookSizeId` on the `Book` table. All the data in the column will be lost.
  - You are about to drop the `BookSize` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `bookSize` to the `Book` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."Book" DROP CONSTRAINT "Book_bookSizeId_fkey";

-- AlterTable
ALTER TABLE "public"."Book" DROP COLUMN "bookSizeId",
ADD COLUMN     "bookSize" TEXT NOT NULL;

-- DropTable
DROP TABLE "public"."BookSize";
