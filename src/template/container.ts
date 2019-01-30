import { html } from '../lib/html'
import { style } from '../lib/style'
import { large } from '../style/large'

const className = 'container'

export const container = async (content: string | Promise<string>) => html`
	${
		style`
		.${className} {
			max-width: 900px;
			margin: auto;
			padding: 5rem 2rem;
			${large(`
				padding: 5rem;
			`)}
		}
	`
	}
	<div class="${className}">${content}</div>
`
