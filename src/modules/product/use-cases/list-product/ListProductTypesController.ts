import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListProductsUseCase } from "./ListProductsUseCase";

export class ListProductsController {
  async handle(req: Request, res: Response) {
    const useCase = container.resolve(ListProductsUseCase);

    const response = await useCase.execute();

    return res.status(200).json(response);
  }
}
