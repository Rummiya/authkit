import { Router } from 'express';

import authRouter from './modules/auth/auth.routes';
import userRouter from './modules/user/user.routes';

const router = Router();

router.use(userRouter);
router.use(authRouter);

export default router;
