import { injectable } from "tsyringe";
import { InferType } from "yup";

import { AppError } from "../../../../shared/infra/http/errors/AppError";
import { prisma } from "../../../../shared/infra/prisma/prismaClient";
import { UpdateUserManagerSchema } from "./UpdateUserManagerSchema";

type Request = InferType<typeof UpdateUserManagerSchema>;

@injectable()
export class UpdateUserManagerUseCase {
  async execute(id: string, data: Request) {
    UpdateUserManagerSchema.validateSync(data, { stripUnknown: true });

    const userManagerExists = await prisma.userManager.findFirst({
      where: {
        id,
      },
    });

    if (!userManagerExists) {
      throw new AppError({
        message: "User Manager does not exist",
        status: 404,
      });
    }

    const userManagerWithSameLogin = await prisma.userManager.findFirst({
      where: {
        login: data.login,
      },
    });

    if (userManagerWithSameLogin && userManagerWithSameLogin.id !== id) {
      throw new AppError({
        message: "User Manager already exists",
        type: "[already-exists]",
      });
    }

    const updatedUserManager = await prisma.userManager.update({
      where: { id },
      data,
    });

    return updatedUserManager;
  }
}
