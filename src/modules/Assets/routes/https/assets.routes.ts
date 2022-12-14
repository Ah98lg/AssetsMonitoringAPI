import { Router } from "express";
import assetsController from "../../controller/AssetsController";

const assetsRouter = Router();

assetsRouter.post("/:company_id/:unity_id", assetsController.registerNewAsset);
assetsRouter.delete(
  "/:company_id/:unity_id/:asset_id",
  assetsController.deleteAsset
);
assetsRouter.patch(
  "/:company_id/:unity_id/:asset_id/:assetIndex",
  assetsController.updateAsset
);
assetsRouter.get("/", assetsController.getAll);

export default assetsRouter;
