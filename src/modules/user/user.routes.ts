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
userRouter.get(
	'/users/:id',
	authenticate,
	authorizeSelfOrAdmin,
	userController.getUserById
);
userRouter.patch(
	'/users/ban/:id',
	authenticate,
	authorizeSelfOrAdmin,
	userController.disableUser
);
userRouter.patch(
	'/users/unban/:id',
	authenticate,
	authorizeSelfOrAdmin,
	userController.enableUser
);

export default userRouter;
