import { injectable } from "tsyringe";
import { InferType } from "yup";

import { prisma } from "../../../../shared/infra/prisma/prismaClient";
import { AppError } from "../../../../shared/infra/http/errors/AppError";
import { orderStatusSchema } from "./UpdateOrderStatusSchema";
import { validateSchema } from "../../../../shared/utils/validateSchema";
import { findOrThrow } from "../../../../shared/utils/findOrThrow";

type Request = InferType<typeof orderStatusSchema>;

@injectable()
export class UpdateOrderStatusUseCase {
  async execute(id: string, data: Request) {
    validateSchema(orderStatusSchema, data);

    const orderStatus = await findOrThrow("Order Status", async () =>
      prisma.orderStatus.findFirst({
        where: { id },
      }),
    );

    const orderStatusInUse = await prisma.orderStatus.findFirst({
      where: { status: data.status },
    });

    if (orderStatusInUse && orderStatusInUse.id !== orderStatus.id) {
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
