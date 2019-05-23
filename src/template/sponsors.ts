import { html } from '../lib/html'
import { style } from '../lib/style'
import { asyncMap } from '../lib/async-map'
import { sortBy } from 'lodash'
import {
	sponsors as spons,
	SponsorMessages,
	SponsorImage
} from '../store/sponsors'
import * as escapeHTML from 'escape-html'
import { Marked } from 'marked-ts'
import { verifier } from '../lib/verifier'
import { ampImage } from './amp/amp-image'
import { tierToSymbol } from '../lib/tier-to-symbol'
import { large } from '../style/large'
import { bronze, gold, silver } from '../style/color'

interface Opts {
	readonly locales: ReadonlyArray<string>
	readonly className?: string
}

const verify = verifier(new Date(), spons)
const valid = spons.filter(s => verify(s.id) && !s.unlisted)
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
const classified = (tiers =>
	Array.from(tiers).map(tier => ({
		tier,
		items: valid.filter(v => v.tier === tier)
	})))(new Set(valid.map(({ tier }) => tier)))
const visualDirective = (image: SponsorImage) =>
	image.visualControl
		? `style="${
				image.visualControl.maxWidth
					? `max-width: ${image.visualControl.maxWidth}px;`
					: ''
		  }${
				image.visualControl.margin
					? `margin: ${image.visualControl.margin}`
					: ''
		  }"`
		: ''

export const sponsors = async ({ className = 'sponsors', locales }: Opts) =>
	(async find => html`
		${style`
			.${className} {
				&__tiers {
					display: grid;
					grid-auto-flow: row;
					grid-gap: 3rem;
					& h3 {
						margin: 0;
						text-transform: capitalize;
					}
				}
				&__tier {
					&--gold {
						color: ${gold};
					}
					&--silver {
						color: ${silver};
					}
					&--bronze {
						color: ${bronze};
					}
				}
				&__list {
					display: grid;
					grid-gap: 5rem;
					${large(`
						grid-gap: 9rem;
					`)}
					&--silver {
						grid-template-columns: repeat(2, 1fr);
						.${className}__message {
							font-size: 0.8rem;
						}
					}
					&--bronze {
						grid-template-columns: repeat(2, 1fr);
						${large(`
							grid-template-columns: repeat(3, 1fr);
						`)}
						.${className}__message {
							font-size: 0.6rem;
						}
					}
					&--supporters {
						grid-gap: 2rem;
						grid-template-columns: repeat(4, 1fr);
						${large(`
							grid-template-columns: repeat(8, 1fr);
						`)}
						.${className}__image {
							position:relative;
							amp-img {
								border-radius: 50%;
							}
							&::after {
								content: '';
								display: block;
								padding-top: 100%;
							}
						}
						.${className}__link {
							font-size: 0.5rem;
						}
					}
				}
				&__link {
					word-break: break-all;
				}
				&__item {
					display: grid;
					justify-content: stretch;
					grid-gap: 1rem;
					justify-items: center;
				}
				&__image {
					width: 100%;
					max-width: 320px;
				}
			}
			`}
		<div class="${className}">
			<div class="${className}__tiers">
				${asyncMap(
					sortBy(classified, 'tier').map(
						async ({ tier, items }) => html`
							<h3 class="${className}__tier--${tierToSymbol(tier)}">
								${tierToSymbol(tier)}
							</h3>
							<div
								class="${className}__list ${className}__list--${tierToSymbol(
									tier
								)}"
							>
								${asyncMap(
									sortBy(items, 'start_date').map(
										async s => html`
											<div class="${className}__item">
												<div
													class="${className}__image"
													${visualDirective(s.image)}
												>
													<a href="${s.link}" target="_blank" rel="noopener">
														${ampImage({
															alt: escapeHTML(s.name),
															src: s.image.url,
															width: s.image.width,
															height: s.image.height,
															layout: s.tier < 50 ? 'responsive' : 'fill'
														})}
													</a>
												</div>
												${'messages' in s
													? html`
															<div class="${className}__message">
																${Marked.parse(
																	(find(s.messages) || selectFirst(s.messages))
																		.text
																)}
															</div>
													  `
													: ''}
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
								)}
							</div>
						`
					)
				)}
			</div>
		</div>
	`)(finder(locales))
