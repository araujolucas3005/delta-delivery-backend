-- CreateTable
CREATE TABLE "products" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "size" TEXT NOT NULL,
    "imageName" TEXT NOT NULL,
    "is_available" BOOLEAN NOT NULL DEFAULT true,
    "product_type_id" TEXT NOT NULL,

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_product_type_id_fkey" FOREIGN KEY ("product_type_id") REFERENCES "product_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
