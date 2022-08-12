import { Router } from "express";
import { productTypeRoutes } from "../../../../modules/product-types/infra/http/routes/product-types.routes";

const routes = Router();

routes.use("/product-types", productTypeRoutes);

export { routes };
