import { Router } from "express";
import { GetStoreStatusController } from "../../../use-cases/get-store-status/GetStoreStatusController";
import { UpdateStoreStatusController } from "../../../use-cases/update-store-status/UpdateStoreStatusController";

const storeStatusRoutes = Router()
  .get("", new GetStoreStatusController().handle)
  .put("", new UpdateStoreStatusController().handle);

export { storeStatusRoutes };
