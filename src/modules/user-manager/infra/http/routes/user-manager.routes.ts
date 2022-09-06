import { Router } from "express";
import { ensureAuthenticated } from "../../../../../shared/infra/http/middlewares/ensureAuthenticated";
import { CreateUserManagerController } from "../../../use-cases/create-user-manager/CreateUserManagerController";
import { FindSingleUserManagerController } from "../../../use-cases/find-single-user-manager/FindSingleUserManagerController";
import { UpdateUserManagerController } from "../../../use-cases/update-user-manager/UpdateUserManagerController";
import { DeleteUserManagerController } from "../../../use-cases/delete-user-manager/DeleteUserManagerController";

const userManagerRoutes = Router()
  .post("", new CreateUserManagerController().handle)
  .get("/:login", new FindSingleUserManagerController().handle)
  .patch("/", ensureAuthenticated, new UpdateUserManagerController().handle)
  .delete("/:id", new DeleteUserManagerController().handle);

export { userManagerRoutes };
