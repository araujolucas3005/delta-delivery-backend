import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListProductTypesUseCase } from "./ListProductTypesUseCase";

export class ListProductTypesController {
  async handle(req: Request, res: Response) {
    const useCase = container.resolve(ListProductTypesUseCase);

    const response = await useCase.execute();

    return res.status(200).json(response);
  }
}
