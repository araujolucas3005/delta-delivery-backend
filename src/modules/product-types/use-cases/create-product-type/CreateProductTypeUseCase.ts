import { injectable } from "tsyringe";
import { InferType } from "yup";

import { AppError } from "../../../../shared/infra/http/errors/AppError";
import { prisma } from "../../../../shared/infra/prisma/prismaClient";
import { ErrorTypesEnum } from "../../../../shared/types/ErrorTypes";
import { createProductTypeSchema } from "./createProductTypeSchema";

type Request = InferType<typeof createProductTypeSchema>;

@injectable()
export class CreateProductTypeUseCase {
  async execute(data: Request) {
    createProductTypeSchema.validateSync(data, { stripUnknown: true });

    const productTypeExists = await prisma.productType.findFirst({
      where: { name: data.name },
    });

    if (productTypeExists) {
      throw new AppError({
        message: "Product type already exists",
        type: ErrorTypesEnum.ALREADY_EXISTS,
      });
    }

    const createdProductType = await prisma.productType.create({
      data,
    });

    return createdProductType;
  }
}
