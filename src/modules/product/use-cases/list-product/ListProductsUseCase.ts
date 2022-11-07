import { singleton } from "tsyringe";
import { prisma } from "../../../../shared/infra/prisma/prismaClient";

@singleton()
export class ListProductsUseCase {
  async execute() {
    const products = await prisma.product.findMany({
      orderBy: {
        createdAt: "desc",
      },
      where: {
        deleted: false,
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

    return products;
  }
}
