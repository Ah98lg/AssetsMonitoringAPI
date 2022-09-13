import { Router } from "express";
import { unitiesController } from "../../controller/UnitiesController";

const unitiesRouter = Router();

unitiesRouter.post("/:id", unitiesController.registerNewUnity);
unitiesRouter.delete("/:company_id/:unity_id", unitiesController.deleteUnity);
unitiesRouter.patch("/:company_id/:unity_id", unitiesController.updateUnity);
unitiesRouter.get("/", unitiesController.getAll);

export default unitiesRouter;
