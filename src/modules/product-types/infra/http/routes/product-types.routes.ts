import { Router } from "express";
import { CreateProductTypeController } from "../../../use-cases/create-product-type/CreateProductTypeController";
import { ListProductTypesController } from "../../../use-cases/list-product-types/ListProductTypesController";

const productTypeRoutes = Router();

productTypeRoutes.post("", new CreateProductTypeController().handle);
productTypeRoutes.get("", new ListProductTypesController().handle);

export { productTypeRoutes };
