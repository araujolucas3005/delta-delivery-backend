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
