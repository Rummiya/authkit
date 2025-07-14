import { prisma } from '../../lib/prisma-client';

export const userService = {
	getById: async (id: string) => {
		return await prisma.user.findUnique({
			where: {
				id,
			},
		});
	},
	getAll: async () => await prisma.user.findMany(),
	setStatus: async (id: string, status: 'ACTIVE' | 'DISABLED') => {
		return await prisma.user.update({
			where: { id },
			data: {
				status,
			},
		});
	},
};
