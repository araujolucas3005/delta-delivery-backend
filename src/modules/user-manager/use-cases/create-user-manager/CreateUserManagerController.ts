import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateUserManagerUseCase } from "./CreateUserManagerUseCase";

export class CreateUserManagerController {
  async handle(req: Request, res: Response) {
    const useCase = container.resolve(CreateUserManagerUseCase);

    const response = await useCase.execute(req.body);

    return res.status(201).json(response);
  }
}
