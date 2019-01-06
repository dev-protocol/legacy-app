// tslint:disable:no-expression-statement
// tslint:disable-next-line:no-require-imports
import listen = require('test-listen')
import test from 'ava'
import micro from 'micro'
import { app } from '../../src/app'
import { get } from '../../src/lib/get'
import * as amphtmlValidator from 'amphtml-validator'

// tslint:disable-next-line:no-let
let url = ''
const server = micro(app)

test.before(async () => {
	url = await listen(server)
	url = url.replace(/https?:/, '')
})

test('Request document: start', async t => {
	const res = await get<string>(`${url}/doc/start`, 'http')
	t.is(res.statusCode, 200)
})

test('Valid AMP HTML', async t => {
	const res = await get<string>(`${url}/doc/start`, 'http')
	const validator = await amphtmlValidator.getInstance()
	const result = validator.validateString(res.body)
	t.is(result.status, 'PASS')
})

test.after(() => {
	server.close()
})
