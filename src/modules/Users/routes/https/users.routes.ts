import { Router } from "express";
import { usersController } from "../../controller/UsersController";

const usersRouter = Router();

usersRouter.post("/:id", usersController.registerNewUser);
usersRouter.delete("/:company_id/:user_id", usersController.deleteUser);
usersRouter.patch("/:company_id/:user_id", usersController.updateUser);
usersRouter.get("/", usersController.getAll);

export default usersRouter;
