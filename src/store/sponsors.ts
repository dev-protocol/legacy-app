interface SponsorImage {
	readonly url: string
	readonly width: number
	readonly height: number
}
export type MessageLocale = 'en-US' | 'ja-JP'
export interface SponsorMessage {
	readonly locale: MessageLocale
	readonly text: string
}
export type SponsorMessages = ReadonlyArray<SponsorMessage>
export interface Sponsor {
	readonly id: string
	readonly start_date: Date
	readonly expiry_date: Date
	readonly name: string
	readonly messages: SponsorMessages
	readonly link: string
	readonly image: SponsorImage
}
export type Sponsors = ReadonlyArray<Sponsor>

const utc = (yaer: number, month: number, date: number) =>
	new Date(Date.UTC(yaer, month - 1, date, 0, 0, 0, 0))

const s: Sponsors = []
const example: Sponsors = [
	{
		id: 'example',
		start_date: utc(2019, 1, 1),
		expiry_date: utc(9999, 12, 31),
		name: 'Your Name',
		messages: [
			{
				locale: 'en-US',
				text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`
			},
			{
				locale: 'ja-JP',
				text: `親譲りの無鉄砲で小供の時から損ばかりしている。小学校に居る時分学校の二階から飛び降りて一週間ほど腰を抜かした事がある。なぜそんな無闇をしたと聞く人があるかも知れぬ。別段深い理由でもない。`
			}
		],
		link: 'https://devtoken.rocks/',
		image: {
			url: 'https://asset.devtoken.rocks/og.png',
			width: 1200,
			height: 630
		}
	}
]

export const sponsors: Sponsors = [...s, ...example]
