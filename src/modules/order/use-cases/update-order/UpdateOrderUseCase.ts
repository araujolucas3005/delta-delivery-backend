import { injectable } from "tsyringe";
import { InferType } from "yup";

import { prisma } from "../../../../shared/infra/prisma/prismaClient";
import { findOrThrow } from "../../../../shared/utils/findOrThrow";
import { validateSchema } from "../../../../shared/utils/validateSchema";
import { updateOrderSchema } from "./updateOrderSchema";

type Request = InferType<typeof updateOrderSchema>;

@injectable()
export class UpdateOrderUseCase {
  async execute(id: string, data: Request) {
    validateSchema(updateOrderSchema, data);

    await findOrThrow("Order", async () =>
      prisma.order.findFirst({
        where: { id },
      }),
    );

    await findOrThrow("Order status", async () =>
      prisma.orderStatus.findFirst({ where: { id: data.statusId } }),
    );

    const updatedOrder = await prisma.order.update({
      where: { id },
      data: {
        orderStatusId: data.statusId,
      },
      include: {
        status: true,
      },
    });

    return updatedOrder;
  }
}
