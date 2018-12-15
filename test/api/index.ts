// tslint:disable:no-expression-statement
// tslint:disable-next-line:no-require-imports
import listen = require('test-listen')
import test from 'ava'
import micro from 'micro'
import { app } from '../../src/app'
import { get } from '../../src/lib/get'

// tslint:disable-next-line:no-let
let url = ''
const server = micro(app)

test.before(async () => {
	url = await listen(server)
	url = url.replace(/https?:/, '')
})

test('Request invalid routes, returns 404', async t => {
	t.is((await get<string>(`${url}/api/x`, 'http')).statusCode, 404)

	t.is((await get<string>(`${url}/api`, 'http')).statusCode, 404)
})

test.after(() => {
	server.close()
})
