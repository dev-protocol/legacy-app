import { html } from '../lib/html'
import { style } from '../lib/style'
import { asyncMap } from '../lib/async-map'
import { sortBy } from 'lodash'
import { sponsors as spons } from '../store/sponsors'
import * as escapeHTML from 'escape-html'
import { Marked } from 'marked-ts'
import { container } from './container'

interface Opts {
	readonly className?: string
}

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
						${
							await asyncMap(
								sortBy(spons, 'start_date').map(
									async s => html`
										<div class="${className}__item">
											<amp-img
												alt=${escapeHTML(s.name)}
												src=${s.image.url}
												width=${s.image.width}
												height=${s.image.height}
												layout="responsive"
											>
											</amp-img>
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
				`
			)
		}
	`
