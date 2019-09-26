import { html } from '../lib/html'
import { style } from '../lib/style'
import { orange } from '../style/color'
import { large } from '../style/large'

interface Opts {
	readonly className?: string
}

export const notifyNewVersion = async ({
	className = 'notice-new-version'
}: Opts = {}) =>
	html`
		${style`
			.${className} {
				background: ${orange};
				color: black;
				padding: 1rem;
				${large(`
					padding: 1rem 2rem;
				`)}
				a {
					display: inline-block;
					text-decoration: none;
					padding: 0.2rem 1rem;
					background: black;
					border-radius: 99px;
				}
			}
		`}
		<div class="${className}">
			<p>
				This website is beta, developing a new version now!
				<a href="//github.com/dev-protocol" target="_blank"
					>➜ See new version repos</a
				>
			</p>
		</div>
	`
