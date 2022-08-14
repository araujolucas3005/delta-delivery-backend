import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreatePaymentMethodUseCase } from "./createPaymentMethodUseCase";

export class CreatePaymentMethodController {
  async handle(req: Request, res: Response) {
    const useCase = container.resolve(CreatePaymentMethodUseCase);

    const response = await useCase.execute(req.body);

    return res.status(201).json(response);
  }
}
