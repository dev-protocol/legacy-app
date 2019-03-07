export const utc = (yaer: number, month: number, date: number) =>
	new Date(Date.UTC(yaer, month - 1, date, 0, 0, 0, 0))
