import { Response, Request } from "express";
import { container } from "tsyringe";
import { CreateOrderStatusUseCase } from "./CreateOrderStatusUseCase";

export class CreateOrderStatusController {
  async handle(req: Request, res: Response) {
    const useCase = container.resolve(CreateOrderStatusUseCase);

    const response = await useCase.execute(req.body);

    return res.status(201).json(response);
  }
}
