import { Router } from "express";
import { unitiesController } from "../../controller/UnitiesController";

const unitiesRouter = Router();

unitiesRouter.post("/:id", unitiesController.registerNewUnity);
unitiesRouter.get("/", unitiesController.getAll);
unitiesRouter.get("/:id", unitiesController.getUnityById);
unitiesRouter.delete("/:id", unitiesController.deleteUnity);
//unitiesRouter.patch("/:id", unitiesController.updateUnity);

export default unitiesRouter;
