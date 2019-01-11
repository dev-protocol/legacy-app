// tslint:disable:no-expression-statement
// tslint:disable:type-literal-delimiter
// tslint:disable-next-line:no-require-imports
import listen = require('test-listen')
import test from 'ava'
import micro from 'micro'
import { app } from '../../app'
import { lsPackages } from 'libnpmaccess'
import { get } from '../../lib/get'
import { config } from 'dotenv'

config()

const { TEST_NPM_USER, TEST_NPM_READ_TOKEN } = process.env

// tslint:disable-next-line:no-let
let url = ''
const server = micro(app)

test.before(async () => {
	url = await listen(server)
	url = url.replace(/https?:/, '')
})

test('Get user owned packages', async t => {
	const expected = await lsPackages(TEST_NPM_USER, {
		token: TEST_NPM_READ_TOKEN
	})
	const res = await get(`${url}/api/package/own/npm/${TEST_NPM_USER}`, 'http', {
		auth: {
			bearer: TEST_NPM_READ_TOKEN
		},
		json: true
	})
	t.deepEqual(res.body, expected)
})

test('Invalid user', async t => {
	const res = await get<{ readonly message: string }>(
		`${url}/api/package/own/npm/${TEST_NPM_USER}____________`,
		'http',
		{
			auth: {
				bearer: TEST_NPM_READ_TOKEN
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
		`${url}/api/package/own/npm/${TEST_NPM_USER}`,
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
