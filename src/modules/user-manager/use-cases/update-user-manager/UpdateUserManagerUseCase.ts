import { injectable } from "tsyringe";
import { InferType } from "yup";

import { AppError } from "../../../../shared/infra/http/errors/AppError";
import { prisma } from "../../../../shared/infra/prisma/prismaClient";
import { UpdateUserManagerSchema } from "./UpdateUserManagerSchema";

type Request = InferType<typeof UpdateUserManagerSchema>;

@injectable()
export class UpdateUserManagerUseCase {
  async execute(data: Request) {
    UpdateUserManagerSchema.validateSync(data, { stripUnknown: true });

    const userManagerExists = await prisma.userManager.findFirst({
      where: {
        id: data.id,
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

    if (userManagerWithSameLogin && userManagerWithSameLogin.id !== data.id) {
      throw new AppError({
        message: "User Manager already exists",
        type: "[already-exists]",
      });
    }

    const updatedUserManager = await prisma.userManager.update({
      where: { id: data.id },
      data,
    });

    return updatedUserManager;
  }
}
