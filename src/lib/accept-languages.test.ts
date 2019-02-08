// tslint:disable:no-expression-statement
import test from 'ava'
import { acceptLanguages } from './accept-languages'

test('Parsing the Accept-Language header string to an array of languages', t => {
	t.deepEqual(acceptLanguages('en-US,en;q=0.9,ja-JP;q=0.8,ja;q=0.7'), [
		'en',
		'ja'
	])
})

test('Returns an empty array if it is undefined', t => {
	t.deepEqual(acceptLanguages(undefined), [])
})
