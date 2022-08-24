import { singleton } from "tsyringe";
import { AppError } from "../../../../shared/infra/http/errors/AppError";
import { prisma } from "../../../../shared/infra/prisma/prismaClient";

@singleton()
export class FindSingleProductUseCase {
  async execute(id: string) {
    const productExists = await prisma.product.findFirst({
      where: {
        id,
      },
    });

    if (!productExists) {
      throw new AppError({ message: "Product not found", status: 404 });
    }

    return productExists;
  }
}
