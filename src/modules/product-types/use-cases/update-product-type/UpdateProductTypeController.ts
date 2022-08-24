import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateProductTypeUseCase } from "./UpdateProductTypeUseCase";

export class UpdateProductTypeController {
  async handle(req: Request, res: Response) {
    const useCase = container.resolve(UpdateProductTypeUseCase);

    const { id } = req.params;

    const response = await useCase.execute(id, req.body);

    return res.status(200).json(response);
  }
}
