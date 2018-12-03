import { html } from '../lib/html'
import { style } from '../lib/style'
import { container } from './container'

interface Opts {
	readonly className?: string
}

export const participation = async ({
	className = 'participation'
}: Opts = {}) =>
	html`
		${await style`
			.${className} {
			}
		`}

		${container(
			await html`
			<div class='${className}'>
				<h2>Participation you too!</h2>
				<p>...</p>
			</div>
		`
		)}
	`
