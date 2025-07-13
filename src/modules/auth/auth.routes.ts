import { Router } from 'express';

import { validateBody } from '../../middlewares/validate.body';
import { authController } from './auth.controller';
import { registrationSchema } from './auth.schema';

const authRouter = Router();

authRouter.post(
	'/auth/registration',
	validateBody(registrationSchema),
	authController.registration
);

export default authRouter;
