/*
  Warnings:

  - A unique constraint covering the columns `[bookId]` on the table `Order` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Book" ADD COLUMN     "bookTitleAlign" TEXT DEFAULT 'center';

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "bookId" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "Order_bookId_key" ON "Order"("bookId");

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book"("id") ON DELETE SET NULL ON UPDATE CASCADE;
