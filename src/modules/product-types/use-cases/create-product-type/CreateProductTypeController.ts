import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateProductTypeUseCase } from "./CreateProductTypeUseCase";

export class CreateProductTypeController {
  async handle(req: Request, res: Response) {
    const useCase = container.resolve(CreateProductTypeUseCase);

    const response = await useCase.execute(req.body);

    return res.status(201).json(response);
  }
}
