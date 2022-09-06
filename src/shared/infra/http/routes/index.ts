import { Router } from "express";
import { productTypeRoutes } from "../../../../modules/product-types/infra/http/routes/product-types.routes";
import { paymentMethodRoutes } from "../../../../modules/payment-method/infra/http/payment-method.routes";
import { productRoutes } from "../../../../modules/product/infra/http/routes/product.routes";
import { userManagerRoutes } from "../../../../modules/user-manager/infra/http/routes/user-manager.routes";

const routes = Router();

routes
  .use("/product-types", productTypeRoutes)
  .use("/payment-methods", paymentMethodRoutes)
  .use("/products", productRoutes)
  .use("/payment-methods", paymentMethodRoutes)
  .use("/user-manager", userManagerRoutes);

export { routes };
