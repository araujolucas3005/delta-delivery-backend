import { Router } from "express";
import { productTypeRoutes } from "../../../../modules/product-types/infra/http/routes/product-types.routes";
import { paymentMethodRoutes } from "../../../../modules/payment-method/infra/http/payment-method.routes";
import { productRoutes } from "../../../../modules/product/infra/http/routes/product.routes";

const routes = Router();

routes
  .use("/product-types", productTypeRoutes)
  .use("/payment-methods", paymentMethodRoutes)
  .use("/products", productRoutes)
  .use("/payment-methods", paymentMethodRoutes);

export { routes };
