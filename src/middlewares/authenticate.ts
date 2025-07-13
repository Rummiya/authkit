import type { User } from '@prisma/client';
import type { NextFunction, Request, Response } from 'express';

import jwt from 'jsonwebtoken';

import { prisma } from '../lib/prisma-client';

export async function authenticate(
	req: Request,
	res: Response,
	next: NextFunction
) {
	const authHeader = req.headers.authorization;
	const token = authHeader && authHeader.split(' ')[1];

	if (!token) {
		res.status(401).json({ error: 'Вы не зарегистрированы' });
		return;
	}

	try {
		const decoded = jwt.verify(
			token,
			process.env.SECRET_KEY || 'secret_key'
		) as User;

		// Проверка, существует ли пользователь в базе
		const user = await prisma.user.findUnique({
			where: { id: decoded.id },
		});

		if (!user) {
			res
				.status(401)
				.json({ error: 'Токен действителен, но пользователь не найден' });
			return;
		}

		req.user = decoded;
		next();
	} catch (err) {
		console.error('JWT error:', err);
		res.status(403).json({ error: 'Недействительный или просроченный токен' });
	}
}
