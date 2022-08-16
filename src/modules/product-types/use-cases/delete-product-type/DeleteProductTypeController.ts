import { Request, Response } from "express";
import { container } from "tsyringe";
import { DeleteProductTypeUseCase } from "./DeleteProductTypeUseCase";

export class DeleteProductTypeController {
  async handle(req: Request, res: Response) {
    const useCase = container.resolve(DeleteProductTypeUseCase);

    const { id } = req.params;

    await useCase.execute(id);

    return res.status(204).send();
  }
}
