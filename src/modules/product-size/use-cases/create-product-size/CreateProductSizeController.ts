import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateProductSizeUseCase } from "./CreateProductSizeUseCase";

export class CreateProductSizeController {
  async handle(req: Request, res: Response) {
    const useCase = container.resolve(CreateProductSizeUseCase);

    const response = await useCase.execute(req.body);

    return res.status(201).json(response);
  }
}
