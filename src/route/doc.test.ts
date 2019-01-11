// tslint:disable:no-expression-statement
// tslint:disable-next-line:no-require-imports
import listen = require('test-listen')
import test from 'ava'
import micro from 'micro'
import * as amphtmlValidator from 'amphtml-validator'
import { app } from '../app'
import { get } from '../lib/get'

// tslint:disable-next-line:no-let
let url = ''
const server = micro(app)

test.before(async () => {
	url = await listen(server)
	url = url.replace(/https?:/, '')
})

test('Request invalid routes returns 404', async t => {
	t.is((await get<string>(`${url}/doc/x`, 'http')).statusCode, 404)

	t.is((await get<string>(`${url}/doc`, 'http')).statusCode, 404)
})

test('Request document: how-to-use-markdown-badge', async t => {
	const res = await get<string>(`${url}/doc/how-to-use-markdown-badge`, 'http')
	t.is(res.statusCode, 200)

	const validator = await amphtmlValidator.getInstance()
	const result = validator.validateString(res.body)
	t.is(result.status, 'PASS')
})

test('Request document: what-is-dev', async t => {
	const res = await get<string>(`${url}/doc/what-is-dev`, 'http')
	t.is(res.statusCode, 200)

	const validator = await amphtmlValidator.getInstance()
	const result = validator.validateString(res.body)
	t.is(result.status, 'PASS')
})

test('Request document: start', async t => {
	const res = await get<string>(`${url}/doc/start`, 'http')
	t.is(res.statusCode, 200)

	const validator = await amphtmlValidator.getInstance()
	const result = validator.validateString(res.body)
	t.is(result.status, 'PASS')
})

test.after(() => {
	server.close()
})
