import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListOrderStatusUseCase } from "./ListOrderStatusUseCase";

export class ListOrderStatusController {
  async handle(req: Request, res: Response) {
    const useCase = container.resolve(ListOrderStatusUseCase);

    const response = await useCase.execute();

    return res.status(200).json(response);
  }
}
