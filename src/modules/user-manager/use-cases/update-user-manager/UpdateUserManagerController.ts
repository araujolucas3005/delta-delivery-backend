import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateUserManagerUseCase } from "./UpdateUserManagerUseCase";

export class UpdateUserManagerController {
  async handle(req: Request, res: Response) {
    const useCase = container.resolve(UpdateUserManagerUseCase);

    const response = useCase.execute({
      ...req.body,
      id: req.userId,
    });

    return res.status(200).send(response);
  }
}
