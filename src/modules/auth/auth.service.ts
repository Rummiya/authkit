import { prisma } from '../../lib/prisma-client';
import { RegisterData } from './auth.schema';

export const authService = {
	register: async (data: RegisterData) => {
		return await prisma.user.create({
			data: data,
		});
	},
	getByEmail: async (email: string) => {
		return await prisma.user.findUnique({
			where: {
				email,
			},
		});
	},
};
