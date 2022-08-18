import { injectable } from "tsyringe";
import { InferType } from "yup";

import { AppError } from "../../../../shared/infra/http/errors/AppError";
import { prisma } from "../../../../shared/infra/prisma/prismaClient";
import { UpdatePaymentMethodSchema } from "./UpdatePaymentMethodSchema";

type Request = InferType<typeof UpdatePaymentMethodSchema>;

@injectable()
export class UpdatePaymentMethodUseCase {
  async execute(id: string, data: Request) {
    UpdatePaymentMethodSchema.validateSync(data, { stripUnknown: true });

    // Check if payment method exists
    const paymentMethodExists = await prisma.paymentMethod.findFirst({
      where: { id },
    });

    if (!paymentMethodExists) {
      throw new AppError({
        message: "Payment method does not exists",
        status: 404,
      });
    }

    // Check if the nem is already in use
    const paymentMethodExistsWithSameName =
      await prisma.paymentMethod.findFirst({
        where: { type: data.type },
      });

    if (
      paymentMethodExistsWithSameName &&
      paymentMethodExistsWithSameName.id !== id
    ) {
      throw new AppError({
        message: "Payment method already exists",
        type: "[already-exists]",
      });
    }

    const updatedPaymentMethod = await prisma.paymentMethod.update({
      where: { id },
      data,
    });

    return updatedPaymentMethod;
  }
}
