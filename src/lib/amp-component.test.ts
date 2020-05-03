// tslint:disable:no-expression-statement
import test from 'ava'
import { ampComponent } from './amp-component'
import { collapseWhitespace } from './collapse-whitespace'

test('Return script tag to import AMP component', async (t) => {
	const amp = await ampComponent('amp-iframe')
	t.is(
		collapseWhitespace(amp),
		`<script async custom-element="amp-iframe" src="https://cdn.ampproject.org/v0/amp-iframe-0.1.js" ></script>`
	)
})
