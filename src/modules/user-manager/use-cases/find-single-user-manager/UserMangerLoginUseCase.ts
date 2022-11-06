import { singleton } from "tsyringe";
import { sign } from "jsonwebtoken";
import { compare } from "bcrypt";
import { AppError } from "../../../../shared/infra/http/errors/AppError";
import { prisma } from "../../../../shared/infra/prisma/prismaClient";

interface Request {
  login: string;
  password: string;
}

@singleton()
export class UserMangerLoginUseCase {
  async execute(data: Request) {
    const user = await this.verifyUser(data);

    const token = sign(
      {
        exp: 60 * 60 * 24, // 1 dia
        sub: user.id,
      },
      process.env.JWT_SECRET!,
    );

    return { token };
  }

  private async verifyUser({ login, password }: Request) {
    const user = await prisma.userManager.findFirst({
      where: {
        login,
      },
    });

    if (!user) {
      throw new AppError({
        message: "Invalid login and/or password",
        type: "[auth]",
      });
    }

    const isPasswordValid = await compare(String(password), user.password);

    if (!isPasswordValid) {
      throw new AppError({
        message: "Invalid login and/or password",
        type: "[auth]",
      });
    }

    return user;
  }
}
