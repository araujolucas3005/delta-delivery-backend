import { injectable } from "tsyringe";
import { prisma } from "../../../../shared/infra/prisma/prismaClient";

@injectable()
export class ListProductTypesUseCase {
  async execute() {
    const paymentMethods = await prisma.paymentMethod.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return paymentMethods;
  }
}
