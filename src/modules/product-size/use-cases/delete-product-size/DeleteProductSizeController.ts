import { Request, Response } from "express";
import { container } from "tsyringe";
import { DeleteProductSizeUseCase } from "./DeleteProductSizeUseCase";

export class DeleteProductSizeController {
  async handle(req: Request, res: Response) {
    const useCase = container.resolve(DeleteProductSizeUseCase);

    const { id } = req.params;

    await useCase.execute(id);

    return res.status(204).send();
  }
}
