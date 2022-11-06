import { OrderStatus, Prisma } from "@prisma/client";
import { injectable } from "tsyringe";
import { prisma } from "../../../../shared/infra/prisma/prismaClient";
import { findOrThrow } from "../../../../shared/utils/findOrThrow";

const findOptions: Prisma.OrderFindManyArgs = {
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
};

const findByStatusOptions = (
  status: OrderStatus | null,
): Prisma.OrderFindManyArgs => ({
  ...findOptions,
  where: {
    status,
  },
});

interface Request {
  status: string | null;
}

@injectable()
export class ListOrdersUseCase {
  async execute({ status = null }: Request) {
    if (!status) {
      const orders = await prisma.order.findMany(findOptions);

      return orders;
    }

    if (status === "PENDING") {
      const orders = await prisma.order.findMany(findByStatusOptions(null));

      return orders;
    }

    const orderStatus = await findOrThrow("Order status", () =>
      prisma.orderStatus.findFirst({
        where: { status },
      }),
    );

    const orders = await prisma.order.findMany(
      findByStatusOptions(orderStatus),
    );

    return orders;
  }
}
