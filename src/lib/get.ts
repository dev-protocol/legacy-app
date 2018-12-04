import { get as _get } from 'request'
import { IncomingHttpHeaders } from 'http'

export const get = <T>(url: string, opts = { json: true }, proto = 'https') =>
	new Promise<{ readonly body: T; readonly headers: IncomingHttpHeaders }>(
		resolve =>
			_get(`${proto}:${url}`, opts, (_, res, body) =>
				resolve({
					body,
					headers: res.headers
				})
			)
	)
