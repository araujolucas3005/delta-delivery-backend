import { singleton } from "tsyringe";
import { InferType } from "yup";

import { AppError } from "../../../../shared/infra/http/errors/AppError";
import { prisma } from "../../../../shared/infra/prisma/prismaClient";
import { updateProductSizeSchema } from "./updateProductSizeSchema";

type Request = InferType<typeof updateProductSizeSchema>;

@singleton()
export class UpdateProductSizeUseCase {
  async execute(id: string, data: Request) {
    updateProductSizeSchema.validateSync(data, { stripUnknown: true });

    const productSizeExists = await prisma.productSize.findFirst({
      where: { id },
    });

    if (!productSizeExists) {
      throw new AppError({ message: "Product size not found", status: 404 });
    }

    if (data.unit) {
      const productTypeWithUnitExists = await prisma.productSize.findFirst({
        where: { unit: data.unit },
      });

      // if the id is the same, there is no problem
      if (productTypeWithUnitExists && productTypeWithUnitExists.id !== id) {
        throw new AppError({
          message: "Product size already exists",
          type: "[already-exists]",
        });
      }
    }

    const updatedProductSize = await prisma.productSize.update({
      data,
      where: {
        id,
      },
    });

    return updatedProductSize;
  }
}
