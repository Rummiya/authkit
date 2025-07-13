import { Router } from 'express';

import { authenticate } from '../../middlewares';
import { userController } from './user.controller';

const userRouter = Router();

userRouter.get('/users', authenticate, userController.getAllUsers);
userRouter.get('/users/:id', authenticate, userController.getUserById);

export default userRouter;
