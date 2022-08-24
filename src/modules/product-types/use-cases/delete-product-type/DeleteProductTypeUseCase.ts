import { singleton } from "tsyringe";

import { AppError } from "../../../../shared/infra/http/errors/AppError";
import { prisma } from "../../../../shared/infra/prisma/prismaClient";

@singleton()
export class DeleteProductTypeUseCase {
  async execute(id: string) {
    const productTypeExists = await prisma.productType.findFirst({
      where: { id },
    });

    if (!productTypeExists) {
      throw new AppError({ status: 404 });
    }

    const createdProductType = await prisma.productType.delete({
      where: { id },
    });

    return createdProductType;
  }
}
