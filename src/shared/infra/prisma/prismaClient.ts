/* eslint-disable no-console */
import { PrismaClient } from "@prisma/client";
import { enableSoftDeleteProducts } from "./on-database-start-functions/enableSoftDelete";
import { storeAdmin } from "./on-database-start-functions/storeAdmin";
import { storeStoreStatus } from "./on-database-start-functions/storeStoreStatus";

export const prisma = new PrismaClient();

function onDatabaseStart() {
  enableSoftDeleteProducts();

  storeAdmin().then(admin => {
    console.log(!admin ? "Admin created" : "Admin already created");
  });

  storeStoreStatus().then(storeStatus => {
    console.log(
      !storeStatus ? "Store Status Created" : "Store Status Already Created",
    );
  });
}

onDatabaseStart();
