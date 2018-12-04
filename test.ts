// tslint:disable:no-expression-statement
// tslint:disable-next-line:no-require-imports
import listen = require('test-listen')
import test from 'ava'
import micro from 'micro'
import { app } from './src/app'
import { get } from './src/lib/get'
import { getBalanceDev } from 'dev-distribution/src/libs'
import { getPackage } from './src/lib/get-package'
import { DistributionTarget } from 'dev-distribution/src/types'
import * as amphtmlValidator from 'amphtml-validator'

// tslint:disable-next-line:no-let
let url = ''
const server = micro(app)

test.before(async () => {
	url = await listen(server)
	url = url.replace(/https?:/, '')
})

test('Request package information', async t => {
	const pkg = await getPackage('chalk')
	const [dev, res] = await Promise.all([
		getBalanceDev((pkg as DistributionTarget).address),
		get<string>(`${url}/package/chalk`, 'http')
	])
	t.is(res.statusCode, 200)
	t.truthy(res.body.includes(`${dev.address}`))
	t.truthy(res.body.includes(`${dev.balance} DEV`))
})

test('Valid AMP HTML', async t => {
	const res = await get<string>(`${url}/package/chalk`, 'http')
	const validator = await amphtmlValidator.getInstance()
	const result = validator.validateString(res.body)
	t.is(result.status, 'PASS')
})

test('Request invalid routes, returns 404', async t => {
	t.is((await get<string>(`${url}/package`, 'http')).statusCode, 404)

	t.is((await get<string>(`${url}/x`, 'http')).statusCode, 404)

	t.is((await get<string>(`${url}`, 'http')).statusCode, 404)
})

test('Request package names that do not exist, returns 404', async t => {
	t.is((await get<string>(`${url}/package/x`, 'http')).statusCode, 404)
})

test.after(() => {
	server.close()
})
