// tslint:disable:no-expression-statement
// tslint:disable-next-line:no-require-imports
import listen = require('test-listen')
import test from 'ava'
import micro from 'micro'
import { app } from '../app'
import { get } from '../lib/get'
import * as amphtmlValidator from 'amphtml-validator'

// tslint:disable-next-line:no-let
let url = ''
const server = micro(app)

test.before(async () => {
	url = await listen(server)
	url = url.replace(/https?:/, '')
})

test('Valid AMP HTML', async t => {
	const res = await get<string>(`${url}/confirm`, 'http')
	const validator = await amphtmlValidator.getInstance()
	const result = validator.validateString(res.body)
	t.is(result.status, 'PASS')
})

test('Request invalid routes returns 404', async t => {
	t.is((await get<string>(`${url}/confirm/x`, 'http')).statusCode, 404)
})

test.after(() => {
	server.close()
})
