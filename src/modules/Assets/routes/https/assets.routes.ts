import { Router } from "express";
import assetsController from "../../controller/AssetsController";

const assetsRouter = Router()

assetsRouter.post('/', assetsController.RegisterNewAsset)

export default assetsRouter;