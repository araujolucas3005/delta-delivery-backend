import { inject, injectable } from "tsyringe";
import { InferType } from "yup";
import { InjectablesEnum } from "../../../../shared/container";
import { AppError } from "../../../../shared/infra/http/errors/AppError";

import { prisma } from "../../../../shared/infra/prisma/prismaClient";
import { StorageProvider } from "../../../../shared/provider/StorageProvider/StorageProvider";
import { updateProductSchema } from "./updateProductSchema";

type Request = InferType<typeof updateProductSchema>;

@injectable()
export class UpdateProductUseCase {
  constructor(
    @inject(InjectablesEnum.LOCAL_STORAGE_PROVIDER)
    private localStorageProvider: StorageProvider,
  ) {}

  async execute(id: string, data: Request) {
    try {
      updateProductSchema.validateSync(data, {
        stripUnknown: true,
      });

      const productExists = await prisma.product.findFirst({ where: { id } });

      if (!productExists) {
        throw new AppError({ message: "Product not found", status: 404 });
      }

      // não pode salvar o produto se ocorrer algum erro no salvamento da imagem
      return prisma.$transaction(async () => {
        const updatedProduct = await prisma.product.update({
          where: { id },
          data: {
            name: data.name,
            description: data.description,
            isAvailable: data.isAvailable,
            price: data.price && data.price * 100,
            imageUrl: data.imageUrl && `product/${data.imageUrl}`,
          },
        });

        if (data.imageUrl) {
          if (productExists.imageUrl) {
            await this.localStorageProvider.delete(productExists.imageUrl, "");
          }

          await this.localStorageProvider.save(data.imageUrl, "product");
        }

        return updatedProduct;
      });
    } catch (err) {
      if (data.imageUrl) {
        this.localStorageProvider.delete(data.imageUrl, "");
      }

      throw err;
    }
  }
}
