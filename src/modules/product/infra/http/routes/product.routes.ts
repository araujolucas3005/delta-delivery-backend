import { Router } from "express";
import { multerInstance } from "../../../../../shared/infra/http/config/multerConfig";
import { CreateProductController } from "../../../use-cases/create-product/CreateProductController";
import { DeleteProductController } from "../../../use-cases/delete-product/DeleteProductController";
import { FindSingleProductController } from "../../../use-cases/find-single-product/FindSingleProductController";
import { ListProductsController } from "../../../use-cases/list-product/ListProductTypesController";
import { UpdateProductController } from "../../../use-cases/update-product/UpdateProductController";

const productRoutes = Router();

const uploadConfig = multerInstance.fields([
  { name: "image", maxCount: 1 },
  { name: "json", maxCount: 1 },
]);

productRoutes
  .post("", uploadConfig, new CreateProductController().handle)
  .get("", new ListProductsController().handle)
  .get("/:id", new FindSingleProductController().handle)
  .patch("/:id", uploadConfig, new UpdateProductController().handle)
  .delete("/:id", new DeleteProductController().handle);

export { productRoutes };
