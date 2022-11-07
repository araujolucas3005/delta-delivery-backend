import { Product, ProductSizesProducts } from "@prisma/client";
import { injectable } from "tsyringe";
import { InferType } from "yup";
import { AppError } from "../../../../shared/infra/http/errors/AppError";

import { prisma } from "../../../../shared/infra/prisma/prismaClient";
import { validateSchema } from "../../../../shared/utils/validateSchema";
import { createOrderSchema } from "./createOrderSchema";

type Request = InferType<typeof createOrderSchema>;

@injectable()
export class CreateOrderUseCase {
  async execute({ products, paymentMethod, ...data }: Request) {
    validateSchema(createOrderSchema, { products, paymentMethod, ...data });

    const paymentMethodExists = await prisma.paymentMethod.findFirst({
      where: { type: paymentMethod },
    });

    if (!paymentMethodExists) {
      throw new AppError({ message: "Payment method not found", status: 404 });
    }

    /*
      objeto para verificar os produtos do banco de dados com
      os produtos enviados
    */
    const productsMap = (
      await prisma.product.findMany({
        where: { id: { in: products.map(product => product.id) } },
        include: {
          sizes: true,
        },
      })
    ).reduce(
      (obj, product) => {
        obj[product.id] = {
          product,

          // para guardar depois o valor real do produto
          price: 0,
        };

        return obj;
      },
      {} as {
        [productId: string]: {
          price: number;
          product: Product & {
            sizes: ProductSizesProducts[];
          };
        };
      },
    );

    const productsNotFound: number[] = [];

    // verifica se todos os produtos enviados existem
    products.forEach((product, i) => {
      const dbProduct = productsMap[product.id];
      if (!dbProduct || dbProduct.product.deleted) {
        productsNotFound.push(i);
      }
    });

    if (productsNotFound.length > 0) {
      throw new AppError({
        message: `"${productsNotFound.join(
          ", ",
        )}" (index) products were not found`,
        status: 404,
      });
    }

    const productsWithSizeNotFound: string[] = [];

    // valor total do pedido
    const totalValue = products.reduce(
      (total, { quantity = 1, productSizeId, id }) => {
        const { product } = productsMap[id];
        let { price } = product;

        // se não tiver o price, então o valor deve estar atrelado ao tamanho
        if (!price) {
          const productSize = product.sizes.find(
            size => size.productSizeId === productSizeId,
          );

          // verifica se o produto tem o tamanho enviado
          if (!productSize) {
            price = 0;
            productsWithSizeNotFound.push(product.name);
          } else {
            price = productSize.price;
          }
        }

        // para colocar na tabela intermediária entre pedido e produto
        productsMap[id].price = price;

        return total + price * quantity;
      },
      0,
    );

    if (productsWithSizeNotFound.length > 0) {
      throw new AppError({
        message: `Sizes for "${productsWithSizeNotFound.join(
          ", ",
        )}" products were not found`,
        status: 404,
      });
    }

    const order = await prisma.order.create({
      data: {
        ...data,
        value: totalValue,
        zipcode: data.zipcode.replace("-", ""),
        cpf: data.cpf.replaceAll(/[.-]/g, ""),
        productsOrders: {
          createMany: {
            data: products.map(product => ({
              productId: product.id,
              price: productsMap[product.id].price,
              quantity: product.quantity,
              ...(product.productSizeId && {
                productSizeId: product.productSizeId,
              }),
            })),
          },
        },
        paymentMethod: {
          connect: {
            type: paymentMethod,
          },
        },
      },
      include: {
        productsOrders: {
          include: {
            product: true,
          },
        },
      },
    });

    return order;
  }
}
