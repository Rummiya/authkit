import type { NextFunction, Request, Response } from 'express';

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { prisma } from '../../lib/prisma-client';
import { authService } from './auth.service';

export const authController = {
	registration: async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { fullname, email, password, birthday } = req.body;

			const existingUser = await authService.getByEmail(email);

			if (existingUser) {
				res.status(400).json({ error: 'Пользователь уже существует' });
				return;
			}

			const hashedPassword = await bcrypt.hash(password, 10);

			const user = await authService.register({
				email,
				fullname,
				birthday,
				password: hashedPassword,
			});

			res.json({ data: user, message: 'Вы успешно зарегистрированы!' });
		} catch (error) {
			next(error);
		}
	},
	login: async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { email, password } = req.body;

			if (!email || !password) {
				res.status(400).json({ error: 'Заполните все поля' });
				return;
			}

			const user = await authService.getByEmail(email);

			if (!user) {
				res.status(400).json({ error: 'Неверный логин или пароль' });
				return;
			}

			const isPasswordCompare = await bcrypt.compare(password, user.password);

			if (!isPasswordCompare) {
				res.status(400).json({ error: 'Неверный логин или пароль' });
				return;
			}

			const token = jwt.sign(
				{ userId: user.id, role: user.role },
				process.env.SECRET_KEY || '123'
			);

			res.json({
				data: {
					token,
					user,
				},
				message: 'Вы успешно вошли!',
			});
		} catch (error) {
			next(error);
		}
	},
};
