import { Router } from "express";
import { upload } from "../../../../configs/uploads";
import assetsController from "../../controller/AssetsController";

const assetsRouter = Router();

assetsRouter.post(
  "/:company_id/:unity_id",
  upload.single("image"),
  assetsController.registerNewAsset
);
assetsRouter.delete(
  "/:company_id/:unity_id/:asset_id",
  assetsController.deleteAsset
);

export default assetsRouter;
