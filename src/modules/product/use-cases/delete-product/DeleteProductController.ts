import { Request, Response } from "express";
import { container } from "tsyringe";
import { DeleteProductUseCase } from "./DeleteProductUseCase";

export class DeleteProductController {
  async handle(req: Request, res: Response) {
    const useCase = container.resolve(DeleteProductUseCase);

    await useCase.execute(req.params.id);

    return res.status(204).send();
  }
}
