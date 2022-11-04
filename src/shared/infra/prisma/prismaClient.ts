import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

async function storeStatusHealthCheck() {
  const storeStatus = await prisma.storeStatus.findFirst({ where: { id: 1 } });

  if (!storeStatus) {
    await prisma.storeStatus.create({ data: { status: false } });
  }

  return storeStatus;
}

storeStatusHealthCheck().then(storeStatus => {
  // eslint-disable-next-line no-console
  console.log(
    storeStatus ? "Store Status Created" : "Store Status Already Created",
  );
});
