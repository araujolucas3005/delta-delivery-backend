import { injectable } from "tsyringe";
import { InferType } from "yup";

import { AppError } from "../../../../shared/infra/http/errors/AppError";
import { prisma } from "../../../../shared/infra/prisma/prismaClient";
import { createPaymentMethodSchema } from "./createPaymentMethodSchema";

type Request = InferType<typeof createPaymentMethodSchema>;

@injectable()
export class CreatePaymentMethodUseCase {
  async execute(data: Request) {
    createPaymentMethodSchema.validateSync(data, { stripUnknown: true });

    const paymentMethodExists = await prisma.paymentMethod.findFirst({
      where: { type: data.type },
    });

    if (paymentMethodExists) {
      throw new AppError({
        message: "Payment method already exists",
        type: "[already-exists]",
      });
    }

    const createdPaymentMethod = await prisma.paymentMethod.create({
      data,
    });
    return createdPaymentMethod;
  }
}
