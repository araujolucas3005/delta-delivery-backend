import { Request, Response } from "express";
import { container } from "tsyringe";
import { GetStoreStatusUseCase } from "./GetStoreStatusUseCase";

export class GetStoreStatusController {
  async handle(req: Request, res: Response) {
    const useCase = container.resolve(GetStoreStatusUseCase);

    const data = await useCase.execute();

    return res.status(200).json(data);
  }
}
