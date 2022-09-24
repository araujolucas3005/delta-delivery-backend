import { singleton } from "tsyringe";
import { AppError } from "../../../../shared/infra/http/errors/AppError";
import { prisma } from "../../../../shared/infra/prisma/prismaClient";

@singleton()
export class FindSingleOrderUseCase {
  async execute(id: string) {
    const orderExists = await prisma.order.findFirst({
      where: {
        id,
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

    if (!orderExists) {
      throw new AppError({ message: "Order not found", status: 404 });
    }

    return orderExists;
  }
}
