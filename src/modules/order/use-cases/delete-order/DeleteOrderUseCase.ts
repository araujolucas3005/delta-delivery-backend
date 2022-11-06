import { singleton } from "tsyringe";

import { AppError } from "../../../../shared/infra/http/errors/AppError";
import { prisma } from "../../../../shared/infra/prisma/prismaClient";

@singleton()
export class DeleteOrderUseCase {
  async execute(id: string) {
    const orderExists = await prisma.order.findFirst({
      where: { id },
    });

    if (!orderExists) {
      throw new AppError({
        message: "Order not found",
        status: 404,
      });
    }

    await prisma.order.delete({
      where: { id },
    });
  }
}
