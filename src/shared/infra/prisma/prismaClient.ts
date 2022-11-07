import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

export const prisma = new PrismaClient();

async function storeAdmin() {
  const admin = await prisma.userManager.findFirst({ where: { id: 1 } });

  if (!admin) {
    const hashedPassword = await bcrypt.hash(
      process.env.ADMIN_PASSWORD_SEED!,
      5,
    );

    await prisma.userManager.create({
      data: {
        id: 1,
        login: "admin",
        name: "admin",
        password: hashedPassword,
      },
    });
  }

  return admin;
}

async function enableSoftDeleteProducts() {
  prisma.$use(async (params, next) => {
    // Check incoming query type
    if (params.model === "Product") {
      if (params.action === "delete") {
        // Delete queries
        // Change action to an update
        params.action = "update";
        params.args.data = { deleted: true };
      }
      if (params.action === "deleteMany") {
        // Delete many queries
        params.action = "updateMany";
        if (params.args.data !== undefined) {
          params.args.data.deleted = true;
        } else {
          params.args.data = { deleted: true };
        }
      }
    }

    return next(params);
  });
}

enableSoftDeleteProducts();

async function storeStatusHealthCheck() {
  const storeStatus = await prisma.storeStatus.findFirst({ where: { id: 1 } });

  if (!storeStatus) {
    await prisma.storeStatus.create({ data: { status: false } });
  }

  return storeStatus;
}

storeAdmin().then(admin => {
  // eslint-disable-next-line no-console
  console.log(!admin ? "Admin created" : "Admin already created");
});

storeStatusHealthCheck().then(storeStatus => {
  // eslint-disable-next-line no-console
  console.log(
    !storeStatus ? "Store Status Created" : "Store Status Already Created",
  );
});
