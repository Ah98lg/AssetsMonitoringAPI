import { Router } from "express";
import assetsRouter from "../../../modules/Assets/routes/https/assets.routes";
import companiesRouter from "../../../modules/Companies/routes/https/companies.routes";
import unitiesRouter from "../../../modules/Unities/routes/https/unities.routes";
import usersRouter from "../../../modules/Users/routes/https/users.routes";

const routes = Router();

routes.get("/", function (req, res) {
  res.json({
    health: "OK",
  });
});
routes.use("/assets", assetsRouter);
routes.use("/companies", companiesRouter);
routes.use("/unities", unitiesRouter);
routes.use("/users", usersRouter);

export default routes;
