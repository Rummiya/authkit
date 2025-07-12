import { Router } from "express";

import { userController } from "./user.controller";

const userRouter = Router();

userRouter.get("/users", userController.getAllUsers);
userRouter.get("/users/:id", userController.getUserById);

export default userRouter;
