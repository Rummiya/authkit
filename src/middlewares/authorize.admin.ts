import type { NextFunction, Request, Response } from 'express';

export function authorizeAdmin(
	req: Request,
	res: Response,
	next: NextFunction
) {
	if (req.user?.role !== 'ADMIN') {
		res.status(403).json({ error: 'У вас недостаточно прав' });
		return;
	}
	next();
}
