import type { NextFunction, Request, Response } from 'express';

export function authorizeSelfOrAdmin(
	req: Request,
	res: Response,
	next: NextFunction
) {
	const userIdFromToken = req.user?.userId;
	const userIdFromParams = req.params.id;

	if (req.user?.role === 'ADMIN' || userIdFromToken === userIdFromParams) {
		next();
		return;
	}

	res.status(403).json({ error: 'У вас недостаточно прав' });
}
