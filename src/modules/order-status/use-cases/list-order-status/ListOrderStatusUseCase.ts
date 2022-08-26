import { injectable } from "tsyringe";
import { prisma } from "../../../../shared/infra/prisma/prismaClient";

@injectable()
export class ListOrderStatusUseCase {
  async execute() {
    const orderStatus = await prisma.paymentMethod.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return orderStatus;
  }
}