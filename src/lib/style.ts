import { createStyle } from 'lit-style'
import * as preset from 'postcss-preset-env'
import { html } from './html'

export const style = createStyle({
	plugins: [
		preset({
			stage: 0,
			browsers: 'last 2 versions',
			autoprefixer: { grid: true }
		})
	],
	// tslint:disable-next-line:typedef
	build(css) {
		return html`<style>${css}</style>`
	}
})
