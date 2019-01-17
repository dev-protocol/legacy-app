// tslint:disable:no-expression-statement
// tslint:disable:no-for-in
import { ServerResponse } from 'http'

interface Headers {
	readonly [key: string]: string
}

const defaultHeaders: Headers = {
	'cache-control':
		'public, s-maxage=86400, stale-while-revalidate=3600, must-revalidate'
}

export const setHeader = (res: ServerResponse, headers?: Headers) => {
	const properties = { ...defaultHeaders, ...(headers || {}) }
	for (const key in properties) {
		res.setHeader(key, properties[key])
	}
	return res
}
