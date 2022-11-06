import { Router } from "express";
import { productTypeRoutes } from "../../../../modules/product-types/infra/http/routes/product-types.routes";
import { paymentMethodRoutes } from "../../../../modules/payment-method/infra/http/payment-method.routes";
import { productRoutes } from "../../../../modules/product/infra/http/routes/product.routes";
import { userManagerRoutes } from "../../../../modules/user-manager/infra/http/routes/user-manager.routes";
import { productSizeRoutes } from "../../../../modules/product-size/infra/http/routes/product-sizes.routes";
import { orderStatusRoutes } from "../../../../modules/order-status/infra/http/order-status.routes";
import { orderRoutes } from "../../../../modules/order/infra/http/order.routes";
import { storeStatusRoutes } from "../../../../modules/store-status/infra/http/routes/store-status-routes";

const routes = Router();

routes
  .use("/product-types", productTypeRoutes)
  .use("/payment-methods", paymentMethodRoutes)
  .use("/products", productRoutes)
  .use("/payment-methods", paymentMethodRoutes)
  .use("/user-manager", userManagerRoutes);
  .use("/product-sizes", productSizeRoutes)
  .use("/order-status", orderStatusRoutes)
  .use("/orders", orderRoutes)
  .use("/store-status", storeStatusRoutes);

export { routes };
