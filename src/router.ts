import { Router } from "express";

import userRouter from "./modules/user/user.routes";

const router = Router();

router.use(userRouter);

export default router;
