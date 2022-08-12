/*
  Warnings:

  - Added the required column `updated_at` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `payment_methods` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `product_types` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `products` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "payment_methods" ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "product_types" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "products" ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;
