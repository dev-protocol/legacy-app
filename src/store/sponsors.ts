export interface Sponsor {
	readonly id: string
	readonly start_date: Date
	readonly expiry_date: Date
	readonly name: string
}

export type Sponsors = ReadonlyArray<Sponsor>

const utc = (yaer: number, month: number, date: number) =>
	new Date(Date.UTC(yaer, month - 1, date, 0, 0, 0, 0))

const s: Sponsors = []

export const sponsors: Sponsors = [
	...s,
	...[
		{
			id: 'example',
			start_date: utc(2019, 1, 1),
			expiry_date: utc(9999, 12, 31),
			name: 'Your Name'
		}
	]
]
