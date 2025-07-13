import z from 'zod/v4';

export const registrationSchema = z.object({
	email: z.email({ message: 'Некорректный email' }),
	password: z.string().trim().min(6, 'Пароль должен быть минимум 6 символов'),
	fullname: z.string().trim().min(6, 'Введите свое полное имя'),
});
