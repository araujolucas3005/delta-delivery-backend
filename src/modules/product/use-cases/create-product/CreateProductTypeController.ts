import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateProductUseCase } from "./CreateProductUseCase";

export class CreateProductController {
  async handle(req: Request, res: Response) {
    const useCase = container.resolve(CreateProductUseCase);

    const data = JSON.parse(req.body.json);

    const response = await useCase.execute({ ...data, imageUrl: req.filename });

    return res.status(201).json(response);
  }
}
