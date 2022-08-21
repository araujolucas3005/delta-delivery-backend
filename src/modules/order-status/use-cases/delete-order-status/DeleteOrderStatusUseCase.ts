import { singleton } from "tsyringe";

import { AppError } from "../../../../shared/infra/http/errors/AppError";
import { prisma } from "../../../../shared/infra/prisma/prismaClient";

@singleton()
export class DeleteOrderStatusUseCase {
  async execute(id: string) {
    const orderStatus = await prisma.orderStatus.findFirst({
      where: { id },
    });

    if (!orderStatus) {
      throw new AppError({
        message: "Order status does not found",
        status: 404,
      });
    }

    const deletedOrderStatus = await prisma.orderStatus.delete({
      where: { id },
    });

    return deletedOrderStatus;
  }
}
