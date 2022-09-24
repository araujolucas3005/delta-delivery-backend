import { Request, Response } from "express";
import { container } from "tsyringe";
import { DeleteOrderUseCase } from "./DeleteOrderUseCase";

export class DeleteOrderController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    const useCase = container.resolve(DeleteOrderUseCase);

    await useCase.execute(id);

    return res.status(204).send();
  }
}
