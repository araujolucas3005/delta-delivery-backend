import { singleton } from "tsyringe";
import { InferType } from "yup";

import { AppError } from "../../../../shared/infra/http/errors/AppError";
import { prisma } from "../../../../shared/infra/prisma/prismaClient";
import { OrderStatusSchema } from "./CreateOrderStatusSchema";

type Request = InferType<typeof OrderStatusSchema>;

@singleton()
export class CreateOrderStatusUseCase {
  async execute(data: Request) {
    OrderStatusSchema.validateSync(data, { stripUnknown: true });

    const orderStatusExists = await prisma.orderStatus.findFirst({
      where: { status: data.status },
    });

    if (orderStatusExists) {
      throw new AppError({
        message: "Order status already exists",
        type: "[already-exists]",
      });
    }

    const createdOrderStatus = await prisma.orderStatus.create({
      data,
    });

    return createdOrderStatus;
  }
}
