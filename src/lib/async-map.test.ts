// tslint:disable:no-expression-statement
import test from 'ava'
import { asyncMap } from './async-map'
import { html } from './html'

test('Receive `Promise<string>[]` and return it as one string', async t => {
	const result = await asyncMap([
		html`
			<p>1</p>
		`,
		html`
			<p>2</p>
		`,
		html`
			<p>3</p>
		`
	])
	t.is(result, '<p>1</p><p>2</p><p>3</p>')
})
