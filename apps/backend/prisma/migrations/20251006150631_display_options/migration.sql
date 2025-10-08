/*
  Warnings:

  - You are about to drop the column `showCaption` on the `Book` table. All the data in the column will be lost.
  - You are about to drop the column `showDate` on the `Book` table. All the data in the column will be lost.
  - You are about to drop the column `showName` on the `Book` table. All the data in the column will be lost.
  - You are about to drop the column `age` on the `Images` table. All the data in the column will be lost.
  - You are about to drop the column `caption` on the `Images` table. All the data in the column will be lost.
  - You are about to drop the column `date` on the `Images` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Images` table. All the data in the column will be lost.
  - You are about to drop the column `tags` on the `Images` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Book" DROP COLUMN "showCaption",
DROP COLUMN "showDate",
DROP COLUMN "showName",
ADD COLUMN     "displaySettings" JSONB;

-- AlterTable
ALTER TABLE "public"."Images" DROP COLUMN "age",
DROP COLUMN "caption",
DROP COLUMN "date",
DROP COLUMN "name",
DROP COLUMN "tags",
ADD COLUMN     "displayOptions" JSONB;
