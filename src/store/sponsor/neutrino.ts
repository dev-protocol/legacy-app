import { Sponsor } from '../sponsors'
import { utc } from '../../lib/utc'

export const neutrino: Sponsor = {
	id: 'neutrino',
	tier: 10,
	start_date: utc(2019, 3, 2),
	expiry_date: utc(2019, 12, 31),
	name: 'Neutrino',
	messages: [
		{
			locale: 'en',
			text: `Neutrino aims to provide an inspiring, collaborative, and productive developer friendly environment to build the blockchain projects of the future. Let's take part in a growing blockchain community.`
		},
		{
			locale: 'ja',
			text: `Neutrinoは未来のブロックチェーンプロジェクトを輩出するためのコワーキングスペースであり、コラボレーションを創出する開発者中心の環境を提供しています。Neutrinoコミュニティで共に学び合い、イノベーションをドライブしましょう。`
		}
	],
	link: 'https://www.neutrino.global/',
	image: {
		url: 'https://asset.devtoken.rocks/sponsor/neutrino.png',
		width: 1280,
		height: 384,
		visualControl: {
			maxWidth: 430,
			margin: '50px 0'
		}
	}
}
