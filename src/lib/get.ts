import { get as _get, CoreOptions } from 'request'
import { IncomingHttpHeaders } from 'http'

export interface Response<T> {
	readonly body: T
	readonly headers: IncomingHttpHeaders
	readonly statusCode: number
}

export const get = async <T>(
	url: string,
	proto = 'https',
	opts: CoreOptions = { json: true }
) =>
	new Promise<Response<T>>(resolve =>
		_get(`${proto}:${url}`, opts, (_, { headers, statusCode }, body) =>
			resolve({
				body,
				headers,
				statusCode
			})
		)
	)
