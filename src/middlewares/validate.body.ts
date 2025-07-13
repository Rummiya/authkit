import type { NextFunction, Request, Response } from 'express';
import type { ZodObject } from 'zod/v4';

import { ZodError } from 'zod/v4';

export function validateBody(schema: ZodObject) {
	return (req: Request, res: Response, next: NextFunction) => {
		try {
			req.body = schema.parse(req.body); // Валидация и преобразование
			next();
		} catch (error) {
			if (error instanceof ZodError) {
				res.status(400).json({ error: error.issues[0].message });
				return;
			}
			res.status(400).json({ error: 'Некорректные данные' });
		}
	};
}
