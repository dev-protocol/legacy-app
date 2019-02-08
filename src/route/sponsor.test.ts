// tslint:disable:no-expression-statement
// tslint:disable-next-line:no-require-imports
import listen = require('test-listen')
import test from 'ava'
import micro from 'micro'
import { app } from '../app'
import { get } from '../lib/get'
import * as amphtmlValidator from 'amphtml-validator'
import { sponsors, Sponsor, SponsorMessage } from '../store/sponsors'
import { html } from '../lib/html'
import { Marked } from 'marked-ts'

// tslint:disable-next-line:no-let
let url = ''
const server = micro(app)

test.before(async () => {
	url = await listen(server)
	url = url.replace(/https?:/, '')
})

test('Valid AMP HTML', async t => {
	const res = await get<string>(`${url}/sponsor`, 'http')
	const validator = await amphtmlValidator.getInstance()
	const result = validator.validateString(res.body)
	t.is(result.status, 'PASS')
})

test('Request invalid routes returns 404', async t => {
	t.is((await get<string>(`${url}/sponsor/x`, 'http')).statusCode, 404)
})

test('When "en-US" is the highest priority in the "Accept-Language" header, the sponsor message is in English', async t => {
	const res = await get<string>(`${url}/sponsor`, 'http', {
		headers: { 'Accept-Language': 'en-US,en;q=0.9,ja-JP;q=0.8,ja;q=0.7' }
	})
	const en = (sponsors.find(({ messages }) =>
		messages.some(mes => mes.locale === 'en')
	) as Sponsor).messages.find(({ locale }) => locale === 'en') as SponsorMessage
	t.true(
		res.body.includes(
			await html`
				${Marked.parse(en.text)}
			`
		)
	)
})

test('When "ja-JP" is the highest priority in the "Accept-Language" header, the sponsor message is in Japanese', async t => {
	const res = await get<string>(`${url}/sponsor`, 'http', {
		headers: { 'Accept-Language': 'ja-JP,ja;q=0.9,en-US;q=0.8,en;q=0.7' }
	})
	const ja = (sponsors.find(({ messages }) =>
		messages.some(mes => mes.locale === 'ja')
	) as Sponsor).messages.find(({ locale }) => locale === 'ja') as SponsorMessage
	t.true(
		res.body.includes(
			await html`
				${Marked.parse(ja.text)}
			`
		)
	)
})

test('When not found matches "Accept-Language" header and sponsor message locale, the first language of sponsor messages as text', async t => {
	const res = await get<string>(`${url}/sponsor`, 'http', {
		headers: {
			'Accept-Language': 'fr-CH,fr;q=0.9,de;q=0.8,*;q=0.7'
		}
	})
	const first = (sponsors.find(({ messages }) =>
		messages.every(({ locale }) => locale === 'en' || locale === 'ja')
	) as Sponsor).messages[0]
	t.true(
		res.body.includes(
			await html`
				${Marked.parse(first.text)}
			`
		)
	)
})

test.after(() => {
	server.close()
})
