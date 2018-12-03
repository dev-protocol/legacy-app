import { createStyle } from 'lit-style'
import * as preset from 'postcss-preset-env'
import * as nested from 'postcss-nested'
import { html } from './html'

const cssSet = new Set<string>()

export const style = createStyle({
	plugins: [
		nested(),
		preset({
			stage: 0,
			browsers: 'last 2 versions',
			autoprefixer: { grid: true }
		})
	],
	// tslint:disable-next-line:typedef
	build(css) {
		return cssSet.has(css)
			? ''
			: (() => {
					// tslint:disable-next-line:no-expression-statement
					cssSet.add(css)
					return html`<style>${css}</style>`
			  })()
	}
})
