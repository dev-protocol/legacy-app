// tslint:disable:no-expression-statement
// tslint:disable-next-line:no-require-imports
import listen = require('test-listen')
import test from 'ava'
import micro from 'micro'
import { app } from '../app'
import { get } from '../lib/get'
import { getBalanceDev } from 'dev-distribution/src/libs'
import { getPackage } from '../lib/get-package'
import { DistributionTarget } from 'dev-distribution/src/types'
import * as amphtmlValidator from 'amphtml-validator'
import { sponsors, Sponsor, SponsorMessage } from '../store/sponsors'

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

test('When "en-US" is the highest priority in the "Accept-Language" header, the sponsor message is in English', async t => {
	const res = await get<string>(`${url}/package/chalk`, 'http', {
		headers: { 'Accept-Language': 'en-US,en;q=0.9,ja-JP;q=0.8,ja;q=0.7' }
	})
	const en = (sponsors.find(
		({ id }) => id === 'example'
	) as Sponsor).messages.find(({ locale }) => locale === 'en') as SponsorMessage
	t.true(res.body.includes(en.text))
})

test('When "ja-JP" is the highest priority in the "Accept-Language" header, the sponsor message is in Japanese', async t => {
	const res = await get<string>(`${url}/package/chalk`, 'http', {
		headers: { 'Accept-Language': 'ja-JP,ja;q=0.9,en-US;q=0.8,en;q=0.7' }
	})
	const ja = (sponsors.find(
		({ id }) => id === 'example'
	) as Sponsor).messages.find(({ locale }) => locale === 'ja') as SponsorMessage
	t.true(res.body.includes(ja.text))
})

test('When not found matches "Accept-Language" header and sponsor message locale, the first language of sponsor messages as text', async t => {
	const res = await get<string>(`${url}/package/chalk`, 'http', {
		headers: {
			'Accept-Language': 'fr-CH,fr;q=0.9,de;q=0.8,*;q=0.7'
		}
	})
	const first = (sponsors.find(({ id }) => id === 'example') as Sponsor)
		.messages[0]
	t.true(res.body.includes(first.text))
})

test('Request package names that do not exist, returns 404', async t => {
	t.is((await get<string>(`${url}/package/x`, 'http')).statusCode, 404)
})

test('Request invalid routes returns 404', async t => {
	t.is((await get<string>(`${url}/package`, 'http')).statusCode, 404)
})

test.after(() => {
	server.close()
})
