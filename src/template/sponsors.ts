import { html } from '../lib/html'
import { style } from '../lib/style'
import { asyncMap } from '../lib/async-map'
import { sortBy } from 'lodash'
import { sponsors as spons } from '../store/sponsors'
import * as escapeHTML from 'escape-html'
import { Marked } from 'marked-ts'
import { container } from './container'
import { verifier } from '../lib/verifier'
import { ampImage } from './amp/amp-image'

interface Opts {
	readonly className?: string
}

const verify = verifier(new Date(), spons)
const validSponsors = spons.filter(s => verify(s.id))

export const sponsors = async ({ className = 'sponsors' }: Opts = {}) =>
	html`
		${
			await style`
				.${className} {
					display: grid;
					grid-template-columns: repeat(2, 1fr);
					grid-gap: 3rem;
				}
			`
		}
		${
			container(
				await html`
					<div class="${className}">
						<h2>Sponsors</h2>
						<div class="${className}__list">
							${
								await asyncMap(
									sortBy(validSponsors, 'start_date').map(
										async s => html`
											<div class="${className}__item">
												${
													ampImage({
														alt: escapeHTML(s.name),
														src: s.image.url,
														width: s.image.width,
														height: s.image.height,
														layout: 'responsive'
													})
												}
												<div class="${className}__message">
													${Marked.parse(s.message)}
												</div>
												<a
													class="${className}__link"
													href="${s.link}"
													target="_blank"
													rel="noopener"
													>${s.name}</a
												>
											</div>
										`
									)
								)
							}
						</div>
					</div>
				`
			)
		}
	`
