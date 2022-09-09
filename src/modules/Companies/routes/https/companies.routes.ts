import { Router } from "express";
import { companiesController } from "../../controller/CompaniesController";

const companiesRouter = Router();

companiesRouter.post("/", companiesController.registerNewCompany);
companiesRouter.get("/", companiesController.getAll);
companiesRouter.get("/:id", companiesController.getCompanyById);
companiesRouter.delete("/:id", companiesController.deleteCompany);
companiesRouter.patch("/:id", companiesController.updateCompany);

export default companiesRouter;
