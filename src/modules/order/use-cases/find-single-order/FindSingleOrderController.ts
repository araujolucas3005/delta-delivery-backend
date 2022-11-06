import { Request, Response } from "express";
import { container } from "tsyringe";
import { FindSingleOrderUseCase } from "./FindSingleOrderUseCase";

export class FindSingleOrderController {
  async handle(req: Request, res: Response) {
    const useCase = container.resolve(FindSingleOrderUseCase);

    const response = await useCase.execute(req.params.id);

    return res.status(200).json(response);
  }
}
