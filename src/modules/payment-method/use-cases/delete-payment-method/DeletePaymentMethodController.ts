import { Request, Response } from "express";
import { container } from "tsyringe";
import { DeletePaymentMethodUseCase } from "./DeletePaymentMethodUseCase";

export class DeletePaymentMethodController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    const deletePaymentMethodUseCase = container.resolve(
      DeletePaymentMethodUseCase,
    );

    await deletePaymentMethodUseCase.execute(id);

    return res.status(204).send();
  }
}
