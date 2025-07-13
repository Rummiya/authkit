import type { NextFunction, Request, Response } from 'express';

import bcrypt from 'bcryptjs';

import { prisma } from '../../lib/prisma-client';

export const authController = {
	registration: async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { fullname, email, password, birthday } = req.body;

			const existingUser = await prisma.user.findUnique({ where: { email } });

			if (existingUser) {
				res.status(400).json({ error: 'Пользователь уже существует' });
				return;
			}

			const hashedPassword = await bcrypt.hash(password, 10);

			const user = await prisma.user.create({
				data: {
					email,
					password: hashedPassword,
					birthday,
					fullname,
				},
			});

			res.json({ data: user, message: 'Вы успешно зарегистрированы!' });
		} catch (error) {
			next(error);
		}
	},
};
