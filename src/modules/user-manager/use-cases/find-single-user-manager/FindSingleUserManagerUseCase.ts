import { singleton } from "tsyringe";
import { sign } from "jsonwebtoken";
import { AppError } from "../../../../shared/infra/http/errors/AppError";
import { prisma } from "../../../../shared/infra/prisma/prismaClient";

@singleton()
export class FindSingleUserManagerUseCase {
  async execute(login: string, password: string) {
    const userManagerExist = await prisma.userManager.findFirst({
      where: {
        login,
      },
    });

    if (!userManagerExist) {
      throw new AppError({
        message: "Login or Password is invalid",
        type: "[default]",
      });
    }

    if (password !== userManagerExist.password) {
      throw new AppError({
        message: "Login or Password is invalid",
        type: "[default]",
      });
    }

    const payload = {};

    const token = sign(payload, "delta-delivery-senha", {
      expiresIn: "15m",
      subject: userManagerExist.id,
    });

    return { token };
  }
}
