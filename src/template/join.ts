import { html } from '../lib/html'
import { style } from '../lib/style'
import { container } from './container'
import { large } from '../style/large'

interface Opts {
	readonly className?: string
}

export const join = async ({ className = 'join' }: Opts = {}) =>
	html`
		${
			await style`
			.${className} {
				display: grid;
				grid-auto-flow: row;
				justify-content: center;
				grid-gap: 1rem;
				${large(`
					grid-auto-flow: column;
					grid-template-columns: 1fr auto;
					justify-content: baseline;
					align-items: center;
				`)}
				& h2 {
					margin: 0;
				}
				&__button {
					text-decoration: none;
					background-image: linear-gradient(135deg,#00fff5,#6100f2 35%,#ff0052);
					padding: 1.2rem 2rem;
					border-radius: 99px;
					font-weight: 700;
				}
			}
		`
		}
		${
			container(
				await html`
			<div class='${className}'>
				<h2 class='${className}__heading'>Now join the Dev</h2>
				<a class='${className}__button' href=/doc/start>Register your OSS</a>
			</div>
		`
			)
		}
	`
