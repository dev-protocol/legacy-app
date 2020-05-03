// tslint:disable:no-expression-statement no-object-mutation no-unsafe-any
import test from 'ava'
import { get as _get } from 'request'
import { get } from './get'
import { IncomingHttpHeaders } from 'http'

const formatting = (head: IncomingHttpHeaders) => ({
	'content-type': head['content-type'],
})

test('When passed first args only, get JSON API', async (t) => {
	const [expected, result] = await Promise.all([
		new Promise<any>((resolve) =>
			_get(
				{ uri: 'https://jsonplaceholder.typicode.com/todos/1', json: true },
				(_, { headers, statusCode }, body) => {
					resolve({
						body,
						headers,
						statusCode,
					})
				}
			)
		),
		get('//jsonplaceholder.typicode.com/todos/1'),
	])
	expected.headers = formatting(expected.headers)
	result.headers = formatting(result.headers)
	t.deepEqual(expected, result)
})

test('When passed first and second args, get JSON API using second args as protocol', async (t) => {
	const [expected, result] = await Promise.all([
		new Promise<any>((resolve) =>
			_get(
				// tslint:disable-next-line:no-http-string
				{ uri: 'http://jsonplaceholder.typicode.com/todos/1', json: true },
				(_, { headers, statusCode }, body) => {
					resolve({
						body,
						headers,
						statusCode,
					})
				}
			)
		),
		get('//jsonplaceholder.typicode.com/todos/1', 'http'),
	])
	expected.headers = formatting(expected.headers)
	result.headers = formatting(result.headers)
	t.deepEqual(expected, result)
})

test('When passed full args, get request using third args as options of "request" package', async (t) => {
	const [expected, result] = await Promise.all([
		new Promise<any>((resolve) =>
			_get(
				// tslint:disable-next-line:no-http-string
				{ uri: 'http://example.com', json: false },
				(_, { headers, statusCode }, body) => {
					resolve({
						body,
						headers,
						statusCode,
					})
				}
			)
		),
		get('//example.com', 'http', {
			json: false,
		}),
	])
	expected.headers = formatting(expected.headers)
	result.headers = formatting(result.headers)
	t.deepEqual(expected, result)
})
