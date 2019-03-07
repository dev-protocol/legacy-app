import { Sponsor } from '../sponsors'
import { utc } from '../../lib/utc'

export const example: Sponsor = {
	id: 'example',
	tier: 10,
	start_date: utc(2019, 1, 1),
	expiry_date: utc(9999, 12, 31),
	name: 'Your Name',
	messages: [
		{
			locale: 'en',
			text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`
		},
		{
			locale: 'ja',
			text: `親譲りの無鉄砲で小供の時から損ばかりしている。小学校に居る時分学校の二階から飛び降りて一週間ほど腰を抜かした事がある。なぜそんな無闇をしたと聞く人があるかも知れぬ。別段深い理由でもない。`
		}
	],
	link: 'https://devtoken.rocks/',
	image: {
		url: 'https://asset.devtoken.rocks/og.png',
		width: 1200,
		height: 630
	},
	unlisted: true
}
