import { Router } from "express";
import { CreateOrderController } from "../../use-cases/create-order/CreateOrderController";
import { DeleteOrderController } from "../../use-cases/delete-order/DeleteOrderController";
import { FindSingleOrderController } from "../../use-cases/find-single-order/FindSingleOrderController";
import { ListOrdersController } from "../../use-cases/list-order/ListOrdersController";
import { UpdateOrderController } from "../../use-cases/update-order/UpdateOrderController";

const orderRoutes = Router()
  .get("", new ListOrdersController().handle)
  .get("/:id", new FindSingleOrderController().handle)
  .post("", new CreateOrderController().handle)
  .patch("/:id", new UpdateOrderController().handle)
  .delete("/:id", new DeleteOrderController().handle);

export { orderRoutes };
