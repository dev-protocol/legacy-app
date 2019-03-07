import { Sponsor } from '../sponsors'
import { utc } from '../../lib/utc'

export const siosTechnology: Sponsor = {
	id: 'sios-technology',
	tier: 10,
	start_date: utc(2019, 2, 1),
	expiry_date: utc(2019, 12, 31),
	name: 'SIOS Technology, Inc.',
	messages: [
		{
			locale: 'en',
			text: `SIOS Technology has been supporting companies and organizations that use OSS. Why don’t you join us?  If you are interested in OSS or new technologies,Please contact us anytime.`
		},
		{
			locale: 'ja',
			text: `サイオステクノロジーは、OSSを利活⽤している企業や団体を積極的に⽀援しています。そんな私たちと一緒に働きませんか？OSSや新しい技術分野にチャレンジをしていきたいという⽅はぜひお問い合わせください。`
		}
	],
	link: 'https://tech-lab.sios.jp/pr/sponsor-dev2019',
	image: {
		url: 'https://asset.devtoken.rocks/sponsor/sios_logo_white.png',
		width: 660,
		height: 682
	}
}
