import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListOrdersUseCase } from "./ListOrdersUseCase";

export class ListOrdersController {
  async handle(req: Request, res: Response) {
    const useCase = container.resolve(ListOrdersUseCase);

    const response = await useCase.execute();

    return res.status(200).json(response);
  }
}
