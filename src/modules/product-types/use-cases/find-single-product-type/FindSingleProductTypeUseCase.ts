import { singleton } from "tsyringe";

import { AppError } from "../../../../shared/infra/http/errors/AppError";
import { prisma } from "../../../../shared/infra/prisma/prismaClient";

@singleton()
export class FindSingleProductTypeUseCase {
  async execute(id: string) {
    const productTypeExists = await prisma.productType.findFirst({
      where: { id },
    });

    if (!productTypeExists) {
      throw new AppError({ message: "Product type not found", status: 404 });
    }

    return productTypeExists;
  }
}
