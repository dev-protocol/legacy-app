import { html } from '../../lib/html'
import { asyncMap } from '../../lib/async-map'

interface Opts {
	readonly alt: string
	readonly src: string
	readonly width?: number
	readonly height?: number
	readonly layout: 'fill' | 'responsive' | 'fixed'
	readonly attributes?: ReadonlyArray<string>
}

export const ampImage = async ({
	alt,
	src,
	width,
	height,
	layout,
	attributes
}: Opts) => html`
	<amp-img
		alt="${alt}"
		src="${src}"
		width="${width}"
		height="${height}"
		layout="${layout}"
		${
			attributes
				? asyncMap(
						attributes.map(
							async attr =>
								html`
									${attr}
								`
						)
				  )
				: ''
		}
	>
	</amp-img>
`
