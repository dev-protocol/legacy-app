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
	target,
	className = 'button'
}: Opts) => html`
	${await style`
		.${className} {
			display: inline-block;
			padding: 1rem 2rem;
			border-radius: 99px;
			background: #607D8B;
			text-decoration: none;
			text-align: center;
			font-weight: 700;
		}
	`}
	<a class="${className}" href="${link}" ${target ? `target="${target}"` : ''}
		>${content}</a
	>
`
