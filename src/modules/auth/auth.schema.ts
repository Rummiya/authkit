import z from 'zod/v4';

import { parseDateFromString } from '../../utils/parse-date-from-string';

export const registrationSchema = z.object({
	email: z.email({ message: 'Некорректный email' }),
	password: z.string().trim().min(6, 'Пароль должен быть минимум 6 символов'),
	fullname: z.string().trim().min(6, 'Введите свое полное имя'),
	birthday: z
		.preprocess(
			parseDateFromString,
			z.date({
				error: 'Укажите дату рождения',
			})
		)
		.refine(d => d >= new Date('1900-01-01') && d <= new Date(), {
			message: 'Дата рождения должна быть в пределах от 1900 года до сегодня',
		}),
});
