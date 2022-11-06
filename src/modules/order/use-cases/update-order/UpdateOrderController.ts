import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateOrderUseCase } from "./UpdateOrderUseCase";

export class UpdateOrderController {
  async handle(req: Request, res: Response) {
    const useCase = container.resolve(UpdateOrderUseCase);

    const response = await useCase.execute(req.params.id, req.body);

    return res.status(200).json(response);
  }
}
