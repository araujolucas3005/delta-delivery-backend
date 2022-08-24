import { Request, Response } from "express";
import { container } from "tsyringe";
import { DeleteOrderStatusUseCase } from "./DeleteOrderStatusUseCase";

export class DeleteOrderStatusController {
  async handle(req: Request, res: Response) {
    const useCase = container.resolve(DeleteOrderStatusUseCase);

    const response = await useCase.execute(req.params.id);

    return res.status(200).json(response);
  }
}
