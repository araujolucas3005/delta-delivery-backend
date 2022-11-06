import { Response, Request } from "express";
import { container } from "tsyringe";
import { UpdateOrderStatusUseCase } from "./UpdateOrderStatusUseCase";

export class UpdateOrderStatusController {
  async handle(req: Request, res: Response) {
    const useCase = container.resolve(UpdateOrderStatusUseCase);

    const {
      params: { id },
      body,
    } = req;

    const response = await useCase.execute(id, body);

    return res.status(200).json(response);
  }
}
