export const asyncMap = async (data: ReadonlyArray<Promise<string>>) =>
	((items) => items.reduce((result, current) => `${result}${current}`, ''))(
		await Promise.all(data)
	)
