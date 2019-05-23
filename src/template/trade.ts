import { html } from '../lib/html'
import { style } from '../lib/style'
import { container } from './container'

interface Opts {
	readonly className?: string
}

export const trade = async ({ className = 'trade' }: Opts = {}) =>
	html`
		${style`
			.${className} {
				display: grid;
				grid-auto-flow: column;
				justify-content: center;
			}
		`}
		${container(
			html`
			<div class='${className}'>
				<a class='${className}__link' href=//uniswap.exchange/swap target=_blank rel=noopener>Buy or Sell order with Uniswap.</a>
			</div>
		`
		)}
	`
