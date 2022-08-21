import { Response, Request } from "express";
import { container } from "tsyringe";
import { UpdateOrderStatusUseCase } from "./UpdateOrderStatusUseCase";

export class ListOrderStatusController {
  async handle(req: Request, res: Response) {
    const useCase = container.resolve(UpdateOrderStatusUseCase);

    const response = await useCase.execute(req.body);

    return res.status(200).json(response);
  }
}
