import { Router } from "express";
import { CreateUserManagerController } from "../../../use-cases/create-user-manager/CreateUserManagerController";
import { UserMangerLoginController } from "../../../use-cases/find-single-user-manager/UserMangerLoginController";
import { UpdateUserManagerController } from "../../../use-cases/update-user-manager/UpdateUserManagerController";
import { DeleteUserManagerController } from "../../../use-cases/delete-user-manager/DeleteUserManagerController";
import { ensureAthenticated } from "../../../../../shared/infra/http/middlewares/ensureAuthenticated";

const userManagerRoutes = Router()
  .post("", ensureAthenticated, new CreateUserManagerController().handle)
  .post("/login", new UserMangerLoginController().handle)
  .patch("/", ensureAthenticated, new UpdateUserManagerController().handle)
  .delete("/:id", ensureAthenticated, new DeleteUserManagerController().handle);

export { userManagerRoutes };
