import * as escape from 'escape-html'
import { html } from '../lib/html'
import { container } from './container'
import { style } from '../lib/style'

interface Opts {
	readonly className?: string
}

const placeholder = html`
	<span [text]="name">{package}</span>
`

export const sampleCode = async ({
	className = 'sample-code'
}: Opts = {}) => html`
	${await style`
			.${className} {
				display: grid;
				grid-gap: 2rem;
				& input {
					padding: 0.9rem 1rem;
					font-size: 1rem;
					background: transparent;
					border: 0;
					border-bottom: 0.5px solid;
					color: white;
				}
				&__code {
					display: grid;
					grid-gap: 1rem;
				}
				& code {
					word-break: break-all;
					color: aqua;
				}
			}
	`}
	${await container(
		await html`
			<div class="${className}">
				<input
					placeholder="Enter a your OSS(package) name"
					on="input-throttled:AMP.setState({name: event.value})"
				/>
				<div class="${className}__code">
					<p>GitHub Flavored Markdown</p>
					<code>
						[![<span [text]="name">{package}</span> Dev
						Token](https://badge.devtoken.rocks/<span [text]="name"
							>{package}</span
						>)](https://devtoken.rocks/package/<span [text]="name"
							>{package}</span
						>)
					</code>
				</div>
				<div class="${className}__code">
					<p>HTML</p>
					<code>
						${escape(
							await html`
								<a href="https://devtoken.rocks/package/-"
									>${`<img src="https://badge.devtoken.rocks/-" alt="- Dev Token"/>`}</a
								>
							`
						)
							.replace(/-/g, await placeholder)
							.replace(/[\n\t]/g, '')}
					</code>
				</div>
			</div>
		`
	)}
`
