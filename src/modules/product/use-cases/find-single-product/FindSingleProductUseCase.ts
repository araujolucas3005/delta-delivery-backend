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
      include: {
        productType: {
          select: {
            id: true,
            name: true,
          },
        },
        sizes: {
          select: {
            id: true,
            price: true,
            productSize: {
              select: {
                id: true,
                unit: true,
                value: true,
              },
            },
          },
        },
      },
    });

    if (!productExists) {
      throw new AppError({ message: "Product not found", status: 404 });
    }

    return productExists;
  }
}
