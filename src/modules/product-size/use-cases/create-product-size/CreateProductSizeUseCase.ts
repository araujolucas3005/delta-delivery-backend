import { singleton } from "tsyringe";
import { InferType } from "yup";

import { AppError } from "../../../../shared/infra/http/errors/AppError";
import { prisma } from "../../../../shared/infra/prisma/prismaClient";
import { createProductSizeSchema } from "./createProductSizeSchema";

type Request = InferType<typeof createProductSizeSchema>;

@singleton()
export class CreateProductSizeUseCase {
  async execute(data: Request) {
    createProductSizeSchema.validateSync(data, { stripUnknown: true });

    const productSizeExists = await prisma.productSize.findFirst({
      where: { unit: data.unit },
    });

    if (productSizeExists) {
      throw new AppError({
        message: "Product size already exists",
        type: "[already-exists]",
      });
    }

    const createdProductSize = await prisma.productSize.create({
      data,
    });

    return createdProductSize;
  }
}
