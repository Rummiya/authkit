import { Router } from 'express';

import {
	authenticate,
	authorizeAdmin,
	authorizeSelfOrAdmin,
} from '../../middlewares';
import { userController } from './user.controller';

const userRouter = Router();

userRouter.get(
	'/users',
	authenticate,
	authorizeAdmin,
	userController.getAllUsers
);
userRouter.get('/users/:id', authenticate, userController.getUserById);
userRouter.put(
	'/users/ban/:id',
	authenticate,
	authorizeSelfOrAdmin,
	userController.disableUser
);

export default userRouter;
