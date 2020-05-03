import { process, directive } from 'lit-style'
import * as preset from 'postcss-preset-env'
import * as nested from 'postcss-nested'
import { html } from './html'

const processor = process({
	// tslint:disable-next-line:readonly-array
	plugins: [
		// tslint:disable-next-line:no-unsafe-any
		nested(),
		// tslint:disable-next-line:no-unsafe-any
		preset({
			stage: 0,
			browsers: 'last 2 versions',
			autoprefixer: { grid: true },
		}),
	],
})

export const style = directive(
	processor,
	async (css) =>
		html`
			<style>
				${css}
			</style>
		`
)
