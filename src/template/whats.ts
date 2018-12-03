import { html } from '../lib/html'
import { style } from '../lib/style'
import { container } from './container'

interface Opts {
	readonly className?: string
}

export const whats = async ({ className = 'whats' }: Opts) =>
	html`
		${await style`
			.${className} {
			}
		`}

		${container(
			await html`
			<div class='${className}'>
				<h2>What’s Dev(Token)?</h2>
				<p>"Dev" is an ERC20 token for open source software (OSS) sustainability.</p>
				<p>After fairly evaluating OSS's influence, we will distribute a token proportionate to that value.</p>
				<p>We will transform the development of OSS — viewed as having a sustainability problem due to the difficulty of monetization — into something sustainable.</p>
				<p>Anyone can buy and sell tokens on EtherDelta.</p>
			</div>
		`
		)}
	`
