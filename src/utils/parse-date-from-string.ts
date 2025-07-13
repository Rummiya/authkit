export function parseDateFromString(value: unknown): Date | undefined {
	if (typeof value !== 'string') return undefined;

	const [day, month, year] = value.split('.');
	if (!day || !month || !year) return undefined;

	// Преобразуем двухзначный год в 20xx (например, 25 -> 2025)
	const fullYear = Number.parseInt(year, 10) + 2000;

	const isoString = `${fullYear}-${month}-${day}`; // "2025-09-12"
	const date = new Date(isoString);

	return Number.isNaN(date.getTime()) ? undefined : date;
}
