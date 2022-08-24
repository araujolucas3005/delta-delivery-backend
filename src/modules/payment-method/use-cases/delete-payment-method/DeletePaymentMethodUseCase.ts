import { singleton } from "tsyringe";

import { AppError } from "../../../../shared/infra/http/errors/AppError";
import { prisma } from "../../../../shared/infra/prisma/prismaClient";

@singleton()
export class DeletePaymentMethodUseCase {
  async execute(id: string) {
    const paymentMethodExists = await prisma.paymentMethod.findFirst({
      where: { id },
    });

    if (!paymentMethodExists) {
      throw new AppError({
        message: "Payment method not found",
        status: 404,
      });
    }

    await prisma.paymentMethod.delete({
      where: { id },
    });
  }
}
