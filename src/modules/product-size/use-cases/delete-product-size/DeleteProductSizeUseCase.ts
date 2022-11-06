import { singleton } from "tsyringe";

import { AppError } from "../../../../shared/infra/http/errors/AppError";
import { prisma } from "../../../../shared/infra/prisma/prismaClient";

@singleton()
export class DeleteProductSizeUseCase {
  async execute(id: string) {
    const productSizeExists = await prisma.productSize.findFirst({
      where: { id },
    });

    if (!productSizeExists) {
      throw new AppError({ status: 404 });
    }

    await prisma.productSize.delete({
      where: { id },
    });
  }
}
