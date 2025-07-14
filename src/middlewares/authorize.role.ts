import type { NextFunction, Request, Response } from 'express';

export function authorizeRole(role: 'ADMIN') {
	return (req: Request, res: Response, next: NextFunction) => {
		if (req.user?.role !== role) {
			res.status(403).json({ error: 'Forbidden' });
			return;
		}
		next();
	};
}
