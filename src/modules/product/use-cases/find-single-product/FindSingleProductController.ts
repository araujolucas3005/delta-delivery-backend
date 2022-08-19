import { Request, Response } from "express";
import { container } from "tsyringe";
import { FindSingleProductUseCase } from "./FindSingleProductUseCase";

export class FindSingleProductController {
  async handle(req: Request, res: Response) {
    const useCase = container.resolve(FindSingleProductUseCase);

    const response = await useCase.execute(req.params.id);

    return res.status(200).json(response);
  }
}
