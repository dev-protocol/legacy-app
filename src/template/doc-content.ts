import { html } from '../lib/html'
import { container } from './container'

interface Opts {
	readonly content: string | Promise<string>
	readonly className?: string
}

export const docContent = async (
	{ content, className = 'doc-content' }: Opts = { content }
) => html`
	${await container(await html` <div class="${className}">${content}</div> `)}
`
