import { ampImage } from './amp/amp-image'

export const chart = () =>
	ampImage({
		alt: 'Downloas chart',
		src: '//asset.devtoken.rocks/lp/chart/2019-01.png',
		width: 2632,
		height: 1400,
		layout: 'responsive'
	})
