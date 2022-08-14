import { Router } from "express";
import { CreatePaymentMethodController } from "../../use-cases/create-payment-method/createPaymentMethodController";
import { ListPaymentMethodController } from "../../use-cases/list-payment-method/ListPaymentMethodController";

const paymentMethodRoutes = Router();

paymentMethodRoutes.post("", new CreatePaymentMethodController().handle);
paymentMethodRoutes.get("", new ListPaymentMethodController().handle);

export { paymentMethodRoutes };
