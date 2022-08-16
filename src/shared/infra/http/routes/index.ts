import { Router } from "express";
import { productTypeRoutes } from "../../../../modules/product-types/infra/http/routes/product-types.routes";
import { paymentMethodRoutes } from "../../../../modules/payment-method/infra/http/payment-method.routes";

const routes = Router();

routes
  .use("/product-types", productTypeRoutes)
  .use("/payment-methods", paymentMethodRoutes);

export { routes };
