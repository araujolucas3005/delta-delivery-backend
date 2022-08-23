import { singleton } from "tsyringe";
import { InferType } from "yup";

import { AppError } from "../../../../shared/infra/http/errors/AppError";
import { prisma } from "../../../../shared/infra/prisma/prismaClient";
import { updateProductTypeSchema } from "./updateProductTypeSchema";

type Request = InferType<typeof updateProductTypeSchema>;

@singleton()
export class UpdateProductTypeUseCase {
  async execute(id: string, data: Request) {
    updateProductTypeSchema.validateSync(data, { stripUnknown: true });

    const productTypeExists = await prisma.productType.findFirst({
      where: { id },
    });

    if (!productTypeExists) {
      throw new AppError({ message: "Product type not found", status: 404 });
    }

    const productTypeWithNameExists = await prisma.productType.findFirst({
      where: { name: data.name },
    });

    // if the id is the same, there is no problem
    if (productTypeWithNameExists && productTypeWithNameExists.id !== id) {
      throw new AppError({
        message: "Product type already exists",
        type: "[already-exists]",
      });
    }

    const updatedProductType = await prisma.productType.update({
      data,
      where: {
        id,
      },
    });

    return updatedProductType;
  }
}
