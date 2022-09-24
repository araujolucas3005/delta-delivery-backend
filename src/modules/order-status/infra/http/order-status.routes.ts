import { Router } from "express";
import { CreateOrderStatusController } from "../../use-cases/create-order-status/CreateOrderStatusController";
import { DeleteOrderStatusController } from "../../use-cases/delete-order-status/DeleteOrderStatusController";
import { ListOrderStatusController } from "../../use-cases/list-order-status/ListOrderStatusController";
import { UpdateOrderStatusController } from "../../use-cases/update-order-status/UpdateOrderStatusController";

const orderStatusRoutes = Router()
  .post("", new CreateOrderStatusController().handle)
  .get("", new ListOrderStatusController().handle)
  .patch("/:id", new UpdateOrderStatusController().handle)
  .delete("/:id", new DeleteOrderStatusController().handle);

export { orderStatusRoutes };
