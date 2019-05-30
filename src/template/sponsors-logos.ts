import { html } from '../lib/html'
import { style } from '../lib/style'
import { asyncMap } from '../lib/async-map'
import { sortBy } from 'lodash'
import { sponsors as spons } from '../store/sponsors'
import { verifier } from '../lib/verifier'
import { large } from '../style/large'
import { ampImage } from './amp/amp-image'
import * as escapeHTML from 'escape-html'
import { siosTechnology } from '../store/sponsor/sios-technology'
import { cryptobowl } from '../store/sponsor/cryptobowl'

interface Opts {
	readonly className?: string
}

const verify = verifier(new Date(), spons)
const valid = spons.filter(s => verify(s.id) && !s.unlisted)

export const sponsorsLogos = async ({
	className = 'sponsors-logos'
}: Opts = {}) => html`
	${style`
			.${className} {
				display: grid;
				grid-template-columns: repeat(2, 0.5fr);
				align-items: center;
				grid-gap: 1rem;
				${large(`
					grid-template-columns: repeat(3, 1fr);
				`)}
				&__item {
					display: grid;
					align-items: center;
					justify-items: center;
				}
				&__image {
					width: 100%;
					max-width: 320px;
					&--tier {
						&_50 {
							overflow: hidden;
							border-radius: 50%;
							max-width: 70px;
							${large(`
								max-width: 80px;
							`)}
						}
					}
					&--name {
						&_${siosTechnology.id} {
							max-width: 150px;
						}
						&_${cryptobowl.id} {
							max-width: 200px;
						}
					}
				}
			}
			`}
	<div class="${className}">
		${asyncMap(
			sortBy(valid, 'tier').map(
				async ({ id, image, link, name, tier }) => html`
					<div class="${className}__item">
						<div
							class="${className}__image ${className}__image--tier_${tier} ${className}__image--name_${id}"
						>
							<a href="${link}" target="_blank" rel="noopener">
								${ampImage({
									alt: escapeHTML(name),
									src: image.url,
									width: image.width,
									height: image.height,
									layout: 'responsive'
								})}
							</a>
						</div>
					</div>
				`
			)
		)}
	</div>
`
