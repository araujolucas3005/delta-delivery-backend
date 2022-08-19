import { singleton } from "tsyringe";
import { prisma } from "../../../../shared/infra/prisma/prismaClient";

@singleton()
export class ListProductsUseCase {
  async execute() {
    const products = await prisma.product.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return products;
  }
}
