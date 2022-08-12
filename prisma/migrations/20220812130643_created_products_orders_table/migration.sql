-- CreateTable
CREATE TABLE "products_orders" (
    "id" TEXT NOT NULL,
    "product_id" TEXT NOT NULL,
    "order_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "products_orders_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "products_orders" ADD CONSTRAINT "products_orders_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products_orders" ADD CONSTRAINT "products_orders_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
