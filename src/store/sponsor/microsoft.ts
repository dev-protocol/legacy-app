import { Sponsor } from '../sponsors'
import { utc } from '../../lib/utc'

export const microsoft: Sponsor = {
	id: 'microsoft',
	tier: 10,
	start_date: utc(2019, 3, 7),
	expiry_date: utc(2019, 12, 31),
	name: 'Microsoft',
	messages: [
		{
			locale: 'en',
			text: `Microsoft enables digital transformation for the era of an intelligent cloud and an intelligent edge. Its mission is to empower every person and every organization on the planet to achieve more.`,
		},
	],
	link: 'https://azure.microsoft.com/ja-jp/overview/choose-azure-opensource/',
	image: {
		url: '/public/sponsor/Microsoft-logo_rgb_wht.png',
		width: 1280,
		height: 573,
		visualControl: {
			maxWidth: 500,
		},
	},
}
