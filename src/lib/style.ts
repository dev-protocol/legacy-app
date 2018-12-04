import { createStyle } from 'lit-style'
import * as preset from 'postcss-preset-env'
import * as nested from 'postcss-nested'
import * as cssnano from 'cssnano'
import { html } from './html'

export const style = createStyle({
	// tslint:disable-next-line:readonly-array
	plugins: [
		nested(),
		preset({
			stage: 0,
			browsers: 'last 2 versions',
			autoprefixer: { grid: true }
		}),
		cssnano()
	],
	build: async css =>
		html`
			<style>
				${css}
			</style>
		`
})
