import { Router } from 'express';

import { validateBody } from '../../middlewares';
import { authController } from './auth.controller';
import { loginSchema, registrationSchema } from './auth.schema';

const authRouter = Router();

authRouter.post(
	'/auth/registration',
	validateBody(registrationSchema),
	authController.registration
);
authRouter.post('/auth/login', validateBody(loginSchema), authController.login);

export default authRouter;
