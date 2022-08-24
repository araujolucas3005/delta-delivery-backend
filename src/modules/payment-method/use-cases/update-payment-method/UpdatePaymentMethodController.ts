import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdatePaymentMethodUseCase } from "./UpdatePaymentMethodUseCase";

export class UpdatePaymentMethodController {
  async handle(req: Request, res: Response) {
    const useCase = container.resolve(UpdatePaymentMethodUseCase);

    const response = await useCase.execute(req.params.id, req.body);

    return res.status(200).json(response);
  }
}
