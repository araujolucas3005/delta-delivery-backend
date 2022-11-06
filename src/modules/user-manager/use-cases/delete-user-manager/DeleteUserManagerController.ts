import { Request, Response } from "express";
import { container } from "tsyringe";
import { DeleteUserManagerUseCase } from "./DeleteUserManagerUseCase";

export class DeleteUserManagerController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    const deleteUserManagerUseCase = container.resolve(
      DeleteUserManagerUseCase,
    );

    await deleteUserManagerUseCase.execute(id);

    return res.status(204).send();
  }
}
