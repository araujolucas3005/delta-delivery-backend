/*
  Warnings:

  - Added the required column `value` to the `products` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "products" ADD COLUMN     "value" INTEGER NOT NULL,
ALTER COLUMN "imageName" DROP NOT NULL;
