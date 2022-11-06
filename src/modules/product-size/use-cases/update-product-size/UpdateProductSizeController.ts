import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateProductSizeUseCase } from "./UpdateProductSizeUseCase";

export class UpdateProductSizeController {
  async handle(req: Request, res: Response) {
    const useCase = container.resolve(UpdateProductSizeUseCase);

    const { id } = req.params;

    const response = await useCase.execute(id, req.body);

    return res.status(200).json(response);
  }
}
