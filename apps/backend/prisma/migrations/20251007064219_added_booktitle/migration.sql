/*
  Warnings:

  - Added the required column `bookTitle` to the `Book` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Book" ADD COLUMN     "bookTitle" TEXT NOT NULL;
