import { get as _get } from 'request'
import { IncomingHttpHeaders } from 'http'

interface Response<T> {
	readonly body: T
	readonly headers: IncomingHttpHeaders
	readonly statusCode: number
}

export const get = <T>(url: string, opts = { json: true }, proto = 'https') =>
	new Promise<Response<T>>(resolve =>
		_get(`${proto}:${url}`, opts, (_, res, body) =>
			resolve({
				body,
				headers: res.headers,
				statusCode: res.statusCode
			})
		)
	)
