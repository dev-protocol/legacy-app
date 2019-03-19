import { Sponsor } from '../sponsors'
import { utc } from '../../lib/utc'

export const cryptobowl: Sponsor = {
	id: 'cryptobowl',
	tier: 30,
	start_date: utc(2019, 3, 19),
	expiry_date: utc(2019, 12, 31),
	name: 'CryptoBowl',
	messages: [
		{
			locale: 'en',
			text: `CryptoBowl is matching service that specializes in blockchain project. We connect Ordering company and development company / freelance.`
		},
		{
			locale: 'ja',
			text: `"CryptoBowlはブロックチェーン案件を専門に扱う、発注企業と開発企業 /フリーランスのマッチングサービスです。"`
		}
	],
	link: 'https://cryptobowl.net/',
	image: {
		url: 'https://asset.devtoken.rocks/sponsor/cryptobowl.png',
		width: 500,
		height: 98
	}
}
