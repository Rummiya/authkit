import { Router } from 'express';

import { authenticate, authorizeAdmin } from '../../middlewares';
import { userController } from './user.controller';

const userRouter = Router();

userRouter.get(
	'/users',
	authenticate,
	authorizeAdmin,
	userController.getAllUsers
);
userRouter.get('/users/:id', authenticate, userController.getUserById);

export default userRouter;
