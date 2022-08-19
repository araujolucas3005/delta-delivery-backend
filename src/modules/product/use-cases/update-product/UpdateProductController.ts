import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateProductUseCase } from "./UpdateProductUseCase";

export class UpdateProductController {
  async handle(req: Request, res: Response) {
    const useCase = container.resolve(UpdateProductUseCase);

    const { json } = req.body;

    const data = json && JSON.parse(json);

    const response = await useCase.execute(req.params.id, {
      ...data,
      imageUrl: req.filename,
    });

    return res.status(200).json(response);
  }
}
