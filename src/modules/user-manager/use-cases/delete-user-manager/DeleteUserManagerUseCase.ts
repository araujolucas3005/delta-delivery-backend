import { singleton } from "tsyringe";

import { AppError } from "../../../../shared/infra/http/errors/AppError";
import { prisma } from "../../../../shared/infra/prisma/prismaClient";

@singleton()
export class DeleteUserManagerUseCase {
  async execute(id: string) {
    const userManagerExists = await prisma.userManager.findFirst({
      where: {
        id,
      },
    });

    if (!userManagerExists) {
      throw new AppError({
        message: "User not found",
        status: 404,
      });
    }

    await prisma.userManager.delete({
      where: {
        id,
      },
    });
  }
}
