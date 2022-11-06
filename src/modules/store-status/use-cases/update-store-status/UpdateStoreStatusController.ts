import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateStoreStatusUseCase } from "./UpdateStoreStatusUseCase";

export class UpdateStoreStatusController {
  async handle(req: Request, res: Response) {
    const useCase = container.resolve(UpdateStoreStatusUseCase);

    const data = await useCase.execute(req.body);

    return res.status(200).json(data);
  }
}
