// tslint:disable:no-expression-statement
// tslint:disable:type-literal-delimiter
// tslint:disable-next-line:no-require-imports
import listen = require('test-listen')
import test from 'ava'
import micro from 'micro'
import { app } from '../../src/app'
import { lsPackages } from 'libnpmaccess'
import { get } from '../../src/lib/get'

// tslint:disable-next-line:no-let
let url = ''
const server = micro(app)

test.before(async () => {
	url = await listen(server)
	url = url.replace(/https?:/, '')
})

test('Get user owned packages', async t => {
	const token = '46909224-b9c8-4cec-8193-986ae9b0f5c6'
	const expected = await lsPackages('aggre', {
		token
	})
	const res = await get(`${url}/api/packages/aggre`, 'http', {
		auth: {
			bearer: token
		},
		json: true
	})
	t.deepEqual(res.body, expected)
})

test('Invalid user', async t => {
	const token = '46909224-b9c8-4cec-8193-986ae9b0f5c6'
	const res = await get<{ readonly message: string }>(
		`${url}/api/packages/aggre____________`,
		'http',
		{
			auth: {
				bearer: token
			},
			json: true
		}
	)
	t.regex(res.body.message, /Scope not found/)
	t.is(res.statusCode, 400)
})

test('Invalid token', async t => {
	const token = '000000'
	const res = await get<{ readonly message: string }>(
		`${url}/api/packages/aggre`,
		'http',
		{
			auth: {
				bearer: token
			},
			json: true
		}
	)
	t.regex(res.body.message, /You must be logged in to publish packages/)
	t.is(res.statusCode, 400)
})

test.after(() => {
	server.close()
})
