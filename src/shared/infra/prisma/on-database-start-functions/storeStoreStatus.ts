import { prisma } from "../prismaClient";

export async function storeStoreStatus() {
  const storeStatus = await prisma.storeStatus.findFirst({ where: { id: 1 } });

  if (!storeStatus) {
    await prisma.storeStatus.create({ data: { status: false } });
  }

  return storeStatus;
}
