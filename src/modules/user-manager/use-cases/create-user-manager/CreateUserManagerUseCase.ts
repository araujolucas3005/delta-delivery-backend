import { injectable } from "tsyringe";
import { InferType } from "yup";

import { AppError } from "../../../../shared/infra/http/errors/AppError";
import { prisma } from "../../../../shared/infra/prisma/prismaClient";
import { createUserManagerSchema } from "./CreateUserManagerSchema";

type Request = InferType<typeof createUserManagerSchema>;

@injectable()
export class CreateUserManagerUseCase {
  async execute(data: Request) {
    createUserManagerSchema.validate(data, { stripUnknown: true });

    const userManagerExist = await prisma.userManager.findFirst({
      where: { login: data.login },
    });

    if (userManagerExist) {
      throw new AppError({
        message: "Login already in use",
        type: "[already-exists]",
      });
    }

    const createdUserManager = await prisma.userManager.create({
      data,
    });

    return createdUserManager;
  }
}
