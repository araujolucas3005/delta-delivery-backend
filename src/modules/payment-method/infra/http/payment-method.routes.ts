import { Router } from "express";
import { CreatePaymentMethodController } from "../../use-cases/create-payment-method/createPaymentMethodController";
import { ListPaymentMethodController } from "../../use-cases/list-payment-method/ListPaymentMethodController";
import { UpdatePaymentMethodController } from "../../use-cases/update-payment-method/UpdatePaymentMethodController";
import { DeletePaymentMethodController } from "../../use-cases/delete-payment-method/DeletePaymentMethodController";

const paymentMethodRoutes = Router()
  .post("", new CreatePaymentMethodController().handle)
  .get("", new ListPaymentMethodController().handle)
  .patch("/:id", new UpdatePaymentMethodController().handle)
  .delete("/:id", new DeletePaymentMethodController().handle);

export { paymentMethodRoutes };
