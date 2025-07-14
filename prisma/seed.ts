import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function createAdmin() {
	const hashedPassword = await bcrypt.hash('123123', 10);

	await prisma.user.upsert({
		where: { email: 'admin@admin.com' },
		update: {},
		create: {
			email: 'admin@admin.com',
			fullname: 'Admin',
			password: hashedPassword,
			role: 'ADMIN',
			birthday: '2012-12-12T00:00:00.000Z',
		},
	});

	/* eslint-disable no-console */
	console.log('✔ Админ создан');
}

createAdmin()
	.catch(e => {
		console.error(e);
		process.exit(1);
	})
	.finally(() => prisma.$disconnect());
