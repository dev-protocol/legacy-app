import { get as _get } from 'request'

export const get = <T>(url: string, opts = { json: true }, proto = 'https') =>
	new Promise<T>(resolve =>
		_get(`${proto}:${url}`, opts, (_, __, body) => resolve(body))
	)
