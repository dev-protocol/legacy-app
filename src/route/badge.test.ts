// tslint:disable:no-expression-statement no-unsafe-any
// tslint:disable-next-line:no-require-imports
import listen = require('test-listen')
import test from 'ava'
import micro from 'micro'
import { app } from '../app'
import { get } from '../lib/get'
import { sponsors, Sponsor } from '../store/sponsors'
import { svg } from '../page/badge/certification/sponsor/svg'
import { svg as emptySVG } from '../template/empty'

// tslint:disable-next-line:no-let
let url = ''
const server = micro(app)

test.before(async () => {
	url = await listen(server)
	url = url.replace(/https?:/, '')
})

test('Request invalid routes returns 404', async t => {
	const empty = await emptySVG()
	;(res => {
		t.is(res.body, empty)
		t.is(res.statusCode, 404)
	})(await get<string>(`${url}/badge`, 'http'))
	;(res => {
		t.is(res.body, empty)
		t.is(res.statusCode, 404)
	})(await get<string>(`${url}/badge/x`, 'http'))
	;(res => {
		t.is(res.body, empty)
		t.is(res.statusCode, 404)
	})(await get<string>(`${url}/badge/certification`, 'http'))
	;(res => {
		t.is(res.body, empty)
		t.is(res.statusCode, 404)
	})(await get<string>(`${url}/badge/certification/x`, 'http'))
	;(res => {
		t.is(res.body, empty)
		t.is(res.statusCode, 404)
	})(await get<string>(`${url}/badge/certification/sponsor`, 'http'))
	;(res => {
		t.is(res.body, empty)
		t.is(res.statusCode, 404)
	})(await get<string>(`${url}/badge/certification/sponsor/x`, 'http'))
})

test('Get certification badge', async t => {
	const expected = await svg(sponsors[sponsors.length - 1] as Sponsor)
	const res = await get(`${url}/badge/certification/sponsor/example`, 'http')
	t.is(res.body, expected)
})

test.after(() => {
	server.close()
})
