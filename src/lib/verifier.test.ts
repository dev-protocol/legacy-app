// tslint:disable:no-expression-statement
import test from 'ava'
import { Sponsors, sponsors as sponsorsStore } from '../store/sponsors'
import { verifier } from './verifier'

test('Returns undefined if not exist sponsor ID', async t => {
	const id = '_____'
	t.is(verifier(new Date(), sponsorsStore)(id), undefined)
})

test('Returns undefined if before the sponsorship start date', async t => {
	const id = 'example'
	const date = new Date()
	date.setDate(date.getDate() + 1)
	const sponsors: Sponsors = [
		{
			id,
			start_date: new Date(
				Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
			),
			expiry_date: new Date(
				Date.UTC(date.getFullYear() + 1, date.getMonth() - 1, date.getDate())
			),
			name: 'example',
			messages: [],
			link: 'https://devtoken.rocks/',
			image: {
				url: 'https://asset.devtoken.rocks/og.png',
				width: 1200,
				height: 630
			}
		}
	]
	t.is(verifier(new Date(), sponsors)(id), undefined)
})

test('Returns undefined if after the sponsorship expiry date', async t => {
	const id = 'example'
	const date = new Date()
	date.setDate(date.getDate() - 1)
	const sponsors: Sponsors = [
		{
			id,
			start_date: new Date(
				Date.UTC(date.getFullYear() - 1, date.getMonth() - 1, date.getDate())
			),
			expiry_date: new Date(
				Date.UTC(date.getFullYear(), date.getMonth() - 1, date.getDate())
			),
			name: 'example',
			messages: [],
			link: 'https://devtoken.rocks/',
			image: {
				url: 'https://asset.devtoken.rocks/og.png',
				width: 1200,
				height: 630
			}
		}
	]
	t.is(verifier(new Date(), sponsors)(id), undefined)
})

test('When all the conditions are satisfied, the SVG badge is returned', async t => {
	const id = 'example'
	const date = new Date()
	const sponsors: Sponsors = [
		{
			id,
			start_date: new Date(
				Date.UTC(date.getFullYear() - 1, date.getMonth() - 1, date.getDate())
			),
			expiry_date: new Date(
				Date.UTC(date.getFullYear() + 1, date.getMonth() - 1, date.getDate())
			),
			name: 'example',
			messages: [],
			link: 'https://devtoken.rocks/',
			image: {
				url: 'https://asset.devtoken.rocks/og.png',
				width: 1200,
				height: 630
			}
		}
	]
	t.is(verifier(new Date(), sponsors)(id), sponsors[0])
})
