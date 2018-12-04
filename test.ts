// tslint:disable:no-expression-statement
// tslint:disable-next-line:no-require-imports
import listen = require('test-listen')
import test from 'ava'
import micro from 'micro'
import { app } from './src/app'
import { get } from './src/lib/get'

// tslint:disable-next-line:no-let
let url = Map
const server = micro(app)

test.before(async () => {
	url = await listen(server)
})

test('Request package information', async t => {
	const res = await get<string>(`${url}/package/chalk`)
	t.is(res.statusCode, 200)
})

test('Request SVG badge', async t => {
	const res = await get<string>(`${url}/badge/chalk`)
	t.is(res.statusCode, 200)
	t.is(res.headers['content-type'], 'image/svg+xml')
})
