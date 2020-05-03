// tslint:disable:no-expression-statement
import test from 'ava'
import { collapseWhitespace } from './collapse-whitespace'
import { style } from './style'

test('Return preprocessed style tag in PostCSS ', async (t) => {
	const tag = await style`
		body {
			color: blue;
			& > main {
				display: grid;
				grid-gap: 5rem;
				justify-content: center;
				justify-items: center;
			}
		}
	`
	t.is(
		collapseWhitespace(tag),
		collapseWhitespace(`
			<style>
				body {
					color: blue;
				}
				body > main {
					display: -ms-grid;
					display: grid;
					grid-gap: 5rem;
					-webkit-box-pack: center;
					-ms-flex-pack: center;
					justify-content: center;
					justify-items: center;
				}
			</style>
		`)
	)
})
