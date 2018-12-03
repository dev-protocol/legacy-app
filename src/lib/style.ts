import { createStyle } from 'lit-style'
import * as preset from 'postcss-preset-env'
import * as nested from 'postcss-nested'
import * as cssnano from 'cssnano'
import { html } from './html'

export const style = createStyle({
	plugins: [
		nested(),
		preset({
			stage: 0,
			browsers: 'last 2 versions',
			autoprefixer: { grid: true }
		}),
		cssnano()
	],
	// tslint:disable-next-line:typedef
	build(css) {
		return html`<style>${css}</style>`
	}
})
