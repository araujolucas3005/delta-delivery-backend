import { Request, Response } from "express";
import { container } from "tsyringe";
import { FindSingleUserManagerUseCase } from "./FindSingleUserManagerUseCase";

export class FindSingleUserManagerController {
  async handle(req: Request, res: Response) {
    const useCase = container.resolve(FindSingleUserManagerUseCase);

    const response = await useCase.execute(req.body.login, req.body.password);

    return res.status(200).json(response);
  }
}
