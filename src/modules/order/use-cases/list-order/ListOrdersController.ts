import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListOrdersUseCase } from "./ListOrdersUseCase";

export class ListOrdersController {
  async handle(req: Request, res: Response) {
    const useCase = container.resolve(ListOrdersUseCase);

    const {
      query: { status },
    } = req as typeof req & { query: any };

    const response = await useCase.execute({ status });

    return res.status(200).json(response);
  }
}
