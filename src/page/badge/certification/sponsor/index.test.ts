// tslint:disable:no-expression-statement
import test from 'ava'
import { sponsor } from '.'
import { Sponsors } from '../../../../store/sponsors'
import { svg } from './svg'

test('Returns false if not exist sponsor ID', async t => {
	const id = '_____'
	t.is(await sponsor({ id }), false)
})

test('Returns false if before the sponsorship start date', async t => {
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
			name: 'example'
		}
	]
	t.is(await sponsor({ id }, sponsors), false)
})

test('Returns false if after the sponsorship expiry date', async t => {
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
			name: 'example'
		}
	]
	t.is(await sponsor({ id }, sponsors), false)
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
			name: 'example'
		}
	]
	t.is(await sponsor({ id }, sponsors), await svg(sponsors[0]))
})
