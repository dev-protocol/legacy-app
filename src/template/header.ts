import { html } from '../lib/html'
import { style } from '../lib/style'
import { imageLogo } from './image-logo'
import { large } from '../style/large'

interface Opts {
	readonly className?: string
}

export const header = async ({ className = 'header' }: Opts = {}) =>
	html`
		${await style`
			.${className} {
				padding: 1rem;
				border-bottom: .5px solid #ffffff1f;
				${large(`
					padding: 2rem;
				`)}
				& a {
					display: inline-block;
					width: 50px;
					${large(`
						width: 70px;
					`)}
				}
			}
		`}

		<header class='${className}'>
			<a href='//devtoken.rocks/alpha/en'>${imageLogo()}</a>
		</header>
	`
