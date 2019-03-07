// tslint:disable:no-expression-statement
import test from 'ava'
import { utc } from './utc'

test('Create Date object with UTC', t => {
	t.deepEqual(utc(2019, 1, 1), new Date(Date.UTC(2019, 0, 1, 0, 0, 0)))
	t.deepEqual(utc(2019, 12, 31), new Date(Date.UTC(2019, 11, 31, 0, 0, 0)))
	t.deepEqual(utc(2019, 3, 1), new Date(Date.UTC(2019, 2, 1, 0, 0, 0)))
})
