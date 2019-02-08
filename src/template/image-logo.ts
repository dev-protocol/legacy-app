import { ampImage } from './amp/amp-image'

export const imageLogo = async () =>
	ampImage({
		alt: 'Dev',
		src: '//asset.devtoken.rocks/logo--white.svg',
		width: 408,
		height: 228,
		layout: 'responsive'
	})
