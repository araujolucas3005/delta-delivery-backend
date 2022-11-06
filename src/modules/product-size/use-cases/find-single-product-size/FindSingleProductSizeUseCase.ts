import { singleton } from "tsyringe";

import { AppError } from "../../../../shared/infra/http/errors/AppError";
import { prisma } from "../../../../shared/infra/prisma/prismaClient";

@singleton()
export class FindSingleProductSizeUseCase {
  async execute(id: string) {
    const productSizeExists = await prisma.productSize.findFirst({
      where: { id },
    });

    if (!productSizeExists) {
      throw new AppError({ message: "Product size not found", status: 404 });
    }

    return productSizeExists;
  }
}
