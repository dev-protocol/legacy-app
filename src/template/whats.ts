import { html } from '../lib/html'
import { style } from '../lib/style'
import { container } from './container'

interface Opts {
	readonly className?: string
}

export const whats = async ({ className = 'whats' }: Opts = {}) =>
	html`
		${
			style`
			.${className} {
			}
		`
		}
		${
			container(
				html`
			<div class='${className}'>
				<h2>What’s Dev(Token)?</h2>
				<p>"Dev" is an ERC20 token for open source software (OSS) sustainability.</p>
				<p>After fairly evaluating OSS's influence, we will distribute a token proportionate to that value.</p>
				<p>We will transform the development of OSS — viewed as having a sustainability problem due to the difficulty of monetization — into something sustainable.</p>
				<p>Anyone can buy and sell tokens on <a href=//etherdelta.com/#0x98626e2c9231f03504273d55f397409defd4a093-ETH target=_blank rel=noopener>EtherDelta</a>.</p>
				<h3>Monetization</h3>
				<p>Distribute 10% of the total supply of tokens to OSS.</p>
				<h3>Equity</h3>
				<p>Distribution rate is proportional to monthly download count and token balance.</p>
				<h3>For All</h3>
				<p>You can choose one OSS owner or multiple contributors for distribution.</p>
				<p><small>Currently, Dev is an alpha version, and the distribution-to-contributors feature is yet not released.</small></p>
			</div>
		`
			)
		}
	`
