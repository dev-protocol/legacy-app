interface SponsorImage {
	readonly url: string
	readonly width: number
	readonly height: number
}

export interface Sponsor {
	readonly id: string
	readonly start_date: Date
	readonly expiry_date: Date
	readonly name: string
	readonly message: string
	readonly link: string
	readonly image: SponsorImage
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
			name: 'Your Name',
			message: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`,
			link: 'https://devtoken.rocks/',
			image: {
				url: 'https://asset.devtoken.rocks/og.png',
				width: 1200,
				height: 630
			}
		}
	]
]
