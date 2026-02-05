/*
  Warnings:

  - You are about to drop the column `bookTitleAlign` on the `Book` table. All the data in the column will be lost.
  - You are about to drop the column `bookId` on the `Order` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_bookId_fkey";

-- DropIndex
DROP INDEX "Order_bookId_key";

-- AlterTable
ALTER TABLE "Book" DROP COLUMN "bookTitleAlign";

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "bookId";
