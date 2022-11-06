import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateOrderUseCase } from "./CreateOrderUseCase";

export class CreateOrderController {
  async handle(req: Request, res: Response) {
    const useCase = container.resolve(CreateOrderUseCase);

    const response = await useCase.execute(req.body);

    return res.status(201).json(response);
  }
}
