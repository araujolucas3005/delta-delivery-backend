import { singleton } from "tsyringe";
import { prisma } from "../../../../shared/infra/prisma/prismaClient";

@singleton()
export class ListProductTypesUseCase {
  async execute() {
    const productTypes = await prisma.productType.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return productTypes;
  }
}
