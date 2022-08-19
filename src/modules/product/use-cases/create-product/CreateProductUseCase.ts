import { inject, injectable } from "tsyringe";
import { InferType } from "yup";
import { InjectablesEnum } from "../../../../shared/container";
import { AppError } from "../../../../shared/infra/http/errors/AppError";

import { prisma } from "../../../../shared/infra/prisma/prismaClient";
import { StorageProvider } from "../../../../shared/provider/StorageProvider/StorageProvider";
import { createProductSchema } from "./createProductSchema";

type Request = InferType<typeof createProductSchema>;

@injectable()
export class CreateProductUseCase {
  constructor(
    @inject(InjectablesEnum.LOCAL_STORAGE_PROVIDER)
    private localStorageProvider: StorageProvider,
  ) {}

  async execute(data: Request) {
    try {
      createProductSchema.validateSync(data, {
        stripUnknown: true,
      });

      let productTypeCreateOptions: any;

      if (data.productTypeId) {
        const productTypeExists = await prisma.productType.findFirst({
          where: { id: data.productTypeId },
        });

        if (!productTypeExists) {
          throw new AppError({
            message: "Product type not found",
            status: 404,
          });
        }

        productTypeCreateOptions = {
          connect: {
            id: data.productTypeId,
          },
        };
      } else {
        productTypeCreateOptions = {
          connectOrCreate: {
            where: {
              name: data.productType.name,
            },
            create: {
              name: data.productType.name,
            },
          },
        };
      }

      // não pode salvar o produto se ocorrer algum erro no salvamento da imagem
      return prisma.$transaction(async () => {
        const createdProduct = await prisma.product.create({
          data: {
            name: data.name,
            description: data.description,
            isAvailable: data.isAvailable,
            price: data.price * 100,
            imageUrl: data.imageUrl && `product/${data.imageUrl}`,
            productType: productTypeCreateOptions,
          },
          include: {
            productType: !!data.productType,
          },
        });

        if (data.imageUrl) {
          await this.localStorageProvider.save(data.imageUrl, "product");
        }

        return createdProduct;
      });
    } catch (err) {
      if (data.imageUrl) {
        this.localStorageProvider.delete(data.imageUrl, "");
      }

      throw err;
    }
  }
}
