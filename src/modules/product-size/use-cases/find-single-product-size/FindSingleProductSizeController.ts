import { Request, Response } from "express";
import { container } from "tsyringe";
import { FindSingleProductSizeUseCase } from "./FindSingleProductSizeUseCase";

export class FindSingleProductSizeController {
  async handle(req: Request, res: Response) {
    const useCase = container.resolve(FindSingleProductSizeUseCase);

    const { id } = req.params;

    const response = await useCase.execute(id);

    return res.status(200).json(response);
  }
}
