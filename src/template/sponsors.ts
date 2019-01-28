import { html } from '../lib/html'
import { style } from '../lib/style'
import { asyncMap } from '../lib/async-map'
import { sortBy } from 'lodash'
import { sponsors as spons, SponsorMessages } from '../store/sponsors'
import * as escapeHTML from 'escape-html'
import { Marked } from 'marked-ts'
import { container } from './container'
import { verifier } from '../lib/verifier'
import { ampImage } from './amp/amp-image'

interface Opts {
	readonly locales: ReadonlyArray<string>
	readonly className?: string
}

const verify = verifier(new Date(), spons)
const validSponsors = spons.filter(s => verify(s.id))
const finder = (locales: ReadonlyArray<string>) => (
	messages: SponsorMessages
) =>
	(validLocale =>
		validLocale
			? messages.find(({ locale }) => locale === validLocale)
			: undefined)(
		locales.find(loc => messages.some(({ locale }) => loc === locale))
	)
const selectFirst = (messages: SponsorMessages) => messages[0]

export const sponsors = async ({ className = 'sponsors', locales }: Opts) =>
	(async find => html`
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
										async ({ image, messages, link, name }) => html`
											<div class="${className}__item">
												${
													ampImage({
														alt: escapeHTML(name),
														src: image.url,
														width: image.width,
														height: image.height,
														layout: 'responsive'
													})
												}
												<div class="${className}__message">
													${
														Marked.parse(
															(find(messages) || selectFirst(messages)).text
														)
													}
												</div>
												<a
													class="${className}__link"
													href="${link}"
													target="_blank"
													rel="noopener"
													>${name}</a
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
	`)(finder(locales))
