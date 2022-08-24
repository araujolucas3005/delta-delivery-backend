import { injectable } from "tsyringe";
import { InferType } from "yup";

import { prisma } from "../../../../shared/infra/prisma/prismaClient";
import { AppError } from "../../../../shared/infra/http/errors/AppError";
import { OrderStatusSchema } from "./UpdateOrderStatusSchema";

type Request = InferType<typeof OrderStatusSchema>;

@injectable()
export class UpdateOrderStatusUseCase {
  async execute(data: Request) {
    OrderStatusSchema.validateSync(data, { stripUnknown: true });

    const orderStatusExists = await prisma.orderStatus.findFirst({
      where: { status: data.status },
    });

    if (!orderStatusExists) {
      throw new AppError({
        message: "Order status does not exists",
        status: 404,
      });
    }

    // Check if the status is already in use
    const orderStatusInUse = await prisma.orderStatus.findMany({
      where: { status: data.status },
    });

    if (orderStatusInUse && orderStatusInUse !== data.id) {
      throw new AppError({
        message: "Order status already exists",
        type: "[already-exists]",
      });
    }

    const updatedOrderStatus = await prisma.orderStatus.update({
      where: { id: data.id },
      data,
    });
    return updatedOrderStatus;
  }
}
