import { singleton } from "tsyringe";
import { prisma } from "../../../../shared/infra/prisma/prismaClient";

@singleton()
export class ListProductSizesUseCase {
  async execute() {
    const productSizes = await prisma.productSize.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return productSizes;
  }
}
