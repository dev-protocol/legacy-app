// tslint:disable:no-expression-statement
import test from 'ava'
import { getBalanceDev } from 'dev-distribution/src/libs'
import { getTokens } from './get-tokens'

test('Get a wallet address information', async t => {
	const [expected, result] = await Promise.all([
		getBalanceDev('0xE23fe51187A807d56189212591F5525127003bdf'),
		getTokens('0xE23fe51187A807d56189212591F5525127003bdf')
	])
	t.deepEqual(expected, result)
})

test('Request undefined, returns undefined', async t => {
	const result = await getTokens()
	t.is(undefined, result)
})
