import { html } from '../lib/html'
import { style } from '../lib/style'

interface Opts {
	readonly content: string
	readonly link: string
	readonly target?: '_self' | '_blank'
	readonly className?: string
}

export const button = async ({
	content,
	link,
	target = '_self',
	className = 'button'
}: Opts) => html`
	${
		await style`
		.${className} {
			padding: 1rem 2rem;
			border-radius: 99px;
			background: #607D8B;
			text-decoration: none;
		}
	`
	} <a class="${className}" href="${link}" target="${target}">${content}</a>
`
