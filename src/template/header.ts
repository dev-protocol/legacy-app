import { html } from '../lib/html'
import { style } from '../lib/style'
import { imageLogo } from './image-logo'
import { large } from '../style/large'
import { button } from './button'
import { gradientDev } from '../style/color'

interface Opts {
	readonly className?: string
}

export const header = async ({ className = 'header' }: Opts = {}) =>
	html`
		${
			await style`
			.${className} {
				display: grid;
				grid-auto-flow: column;
				align-items: center;
				justify-content: space-between;
				padding: 1rem;
				border-bottom: .5px solid #ffffff1f;
				${large(`
					padding: 2rem;
				`)}
				nav {

				}
				&__brand {
					display: inline-block;
					width: 50px;
					${large(`
						width: 70px;
					`)}
				}
				& &__start {
					padding: 0.5rem 1rem;
					background-image: ${gradientDev};
				}
			}
		`
		}

		<header class="${className}">
			<a class="${className}__brand" href="/">${imageLogo()}</a>
			<nav>
				${
					await button({
						link: '/doc/start',
						content: 'Start Now',
						className: `${className}__start`
					})
				}
			</nav>
		</header>
	`
