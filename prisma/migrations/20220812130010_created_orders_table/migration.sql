-- CreateTable
CREATE TABLE "orders" (
    "id" TEXT NOT NULL,
    "client_name" TEXT NOT NULL,
    "client_phone_number" TEXT NOT NULL,
    "street_name" TEXT NOT NULL,
    "house_number" TEXT NOT NULL,
    "neighborhood" TEXT NOT NULL,
    "zipcode" TEXT NOT NULL,
    "change" INTEGER NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "orders_pkey" PRIMARY KEY ("id")
);
