import { injectable } from "tsyringe";
import { prisma } from "../../../../shared/infra/prisma/prismaClient";

@injectable()
export class ListOrdersUseCase {
  async execute() {
    const orders = await prisma.order.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        paymentMethod: {
          select: {
            id: true,
            type: true,
          },
        },
        productsOrders: {
          select: {
            id: true,
            price: true,
            quantity: true,
            product: {
              select: {
                id: true,
                name: true,
                price: true,
                imageUrl: true,
                productType: {
                  select: {
                    id: true,
                    name: true,
                  },
                },
              },
            },
            productSize: {
              select: {
                id: true,
                unit: true,
                value: true,
              },
            },
          },
        },
        status: {
          select: {
            id: true,
            status: true,
          },
        },
      },
    });

    return orders;
  }
}
