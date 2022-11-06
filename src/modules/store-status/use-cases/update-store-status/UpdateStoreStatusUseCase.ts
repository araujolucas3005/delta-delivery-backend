import { injectable } from "tsyringe";
import { InferType } from "yup";
import { prisma } from "../../../../shared/infra/prisma/prismaClient";
import { validateSchema } from "../../../../shared/utils/validateSchema";
import { updateStoreStatusSchema } from "./updateStoreStatusSchema";

type Request = InferType<typeof updateStoreStatusSchema>;

@injectable()
export class UpdateStoreStatusUseCase {
  async execute(data: Request) {
    validateSchema(updateStoreStatusSchema, data);

    const { status } = data;

    let storeStatus = await prisma.storeStatus.findFirst({
      where: { id: 1 },
    });

    if (!storeStatus) {
      storeStatus = await prisma.storeStatus.create({
        data: { status },
      });

      return storeStatus;
    }

    storeStatus = await prisma.storeStatus.update({
      data: { status },
      where: { id: 1 },
    });

    return storeStatus;
  }
}
