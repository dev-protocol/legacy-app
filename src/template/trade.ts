import { html } from '../lib/html'
import { style } from '../lib/style'
import { container } from './container'

interface Opts {
	readonly className?: string
}

export const trade = async ({ className = 'trade' }: Opts = {}) =>
	html`
		${
			await style`
			.${className} {
				display: grid;
				grid-auto-flow: column;
				justify-content: center;
			}
		`
		}
		${
			container(
				await html`
			<div class='${className}'>
				<a class='${className}__link' href=//etherdelta.com/#0x98626e2c9231f03504273d55f397409defd4a093-ETH target=_blank rel=noopener>Buy or Sell order with EtherDelta.</a>
			</div>
		`
			)
		}
	`
