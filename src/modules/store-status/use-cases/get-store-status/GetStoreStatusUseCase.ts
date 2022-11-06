import { injectable } from "tsyringe";
import { prisma } from "../../../../shared/infra/prisma/prismaClient";

@injectable()
export class GetStoreStatusUseCase {
  async execute() {
    let storeStatus = await prisma.storeStatus.findFirst({
      where: { id: 1 },
    });

    if (!storeStatus) {
      storeStatus = await prisma.storeStatus.create({
        data: { status: false },
      });
    }

    return storeStatus;
  }
}
