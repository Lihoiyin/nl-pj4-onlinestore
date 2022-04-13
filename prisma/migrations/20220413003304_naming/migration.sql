/*
  Warnings:

  - You are about to drop the column `Img` on the `Item` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Item" DROP COLUMN "Img",
ADD COLUMN     "image" TEXT;
