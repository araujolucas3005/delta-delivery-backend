import { Router } from "express";
import { CreateProductSizeController } from "../../../use-cases/create-product-size/CreateProductSizeController";
import { DeleteProductSizeController } from "../../../use-cases/delete-product-size/DeleteProductSizeController";
import { FindSingleProductSizeController } from "../../../use-cases/find-single-product-size/FindSingleProductSizeController";
import { ListProductSizesController } from "../../../use-cases/list-product-sizes/ListProductSizesController";
import { UpdateProductSizeController } from "../../../use-cases/update-product-size/UpdateProductSizeController";

const productSizeRoutes = Router()
  .post("", new CreateProductSizeController().handle)
  .get("", new ListProductSizesController().handle)
  .get("/:id", new FindSingleProductSizeController().handle)
  .patch("/:id", new UpdateProductSizeController().handle)
  .delete("/:id", new DeleteProductSizeController().handle);

export { productSizeRoutes };
