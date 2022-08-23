import { Request, Response } from "express";
import { container } from "tsyringe";
import { FindSingleProductTypeUseCase } from "./FindSingleProductTypeUseCase";

export class FindSingleProductTypeController {
  async handle(req: Request, res: Response) {
    const useCase = container.resolve(FindSingleProductTypeUseCase);

    const { id } = req.params;

    const response = await useCase.execute(id);

    return res.status(200).json(response);
  }
}
