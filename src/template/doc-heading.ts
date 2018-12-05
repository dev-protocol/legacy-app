import { html } from '../lib/html'
import { container } from './container'
import { style } from '../lib/style'

interface Opts {
	readonly className?: string
	readonly title: string
}

export const docHeading = async (
	{ title, className = 'doc-heading' }: Opts = { title }
) => html`
	${
		await style`
			.${className} {
				text-align: center;
			}
	`
	}
	${
		await container(
			await html`
				<div class="${className}"><h1>${title}</h1></div>
			`
		)
	}
`
