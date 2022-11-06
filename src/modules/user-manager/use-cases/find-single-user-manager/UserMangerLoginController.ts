import { Request, Response } from "express";
import { container } from "tsyringe";
import { UserMangerLoginUseCase } from "./UserMangerLoginUseCase";

export class UserMangerLoginController {
  async handle(req: Request, res: Response) {
    const useCase = container.resolve(UserMangerLoginUseCase);

    const { login, password } = req.body;

    const response = await useCase.execute({ login, password });

    return res.status(200).json(response);
  }
}
