import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListProductSizesUseCase } from "./ListProductSizesUseCase";

export class ListProductSizesController {
  async handle(req: Request, res: Response) {
    const useCase = container.resolve(ListProductSizesUseCase);

    const response = await useCase.execute();

    return res.status(200).json(response);
  }
}
