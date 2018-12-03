import { html } from '../lib/html'
import { style } from '../lib/style'
import { large } from '../style/large'
import { imageLogo } from './image-logo'
import { container } from './container'

interface Opts {
	readonly className?: string
}

export const footer = async ({ className = 'footer' }: Opts = {}) =>
	html`
		${await style`
			.${className} {
				display: grid;
				grid-gap: 1rem;
				justify-content: center;
				p {
					margin: 0;
				}
			}
		`}

		${container(
			await html`
			<footer class='${className}'>
				<p><a href='//devtoken.rocks/alpha/en'>${imageLogo()}</a></p>
				<p>Token for OSS sustainability</p>
			</footer>
		`
		)}
	`
