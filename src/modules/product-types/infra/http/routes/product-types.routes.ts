import { Router } from "express";
import { CreateProductTypeController } from "../../../use-cases/create-product-type/CreateProductTypeController";
import { DeleteProductTypeController } from "../../../use-cases/delete-product-type/DeleteProductTypeController";
import { FindSingleProductTypeController } from "../../../use-cases/find-single-product-type/FindSingleProductTypeController";
import { ListProductTypesController } from "../../../use-cases/list-product-types/ListProductTypesController";
import { UpdateProductTypeController } from "../../../use-cases/update-product-type/UpdateProductTypeController";

const productTypeRoutes = Router()
  .post("", new CreateProductTypeController().handle)
  .get("", new ListProductTypesController().handle)
  .get("/:id", new FindSingleProductTypeController().handle)
  .patch("/:id", new UpdateProductTypeController().handle)
  .delete("/:id", new DeleteProductTypeController().handle);

export { productTypeRoutes };
