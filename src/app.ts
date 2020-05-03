import { send } from 'micro'
import { IncomingMessage, ServerResponse } from 'http'
import { parse } from 'url'
import { error } from './page/error'
import { packageR } from './route/package-r'
import { oss } from './route/oss'
import { cacheControl, CacheControl } from './lib/cache-control'
import { setHeader } from './lib/set-header'

export interface Result {
	readonly body?: string | Error | false
	readonly status: number
	readonly cache?: CacheControl
}

export const app = async (request: IncomingMessage, res: ServerResponse) => {
	const { url = '' } = request
	const parsed = parse(url)
	const { pathname = '' } = parsed
	const [, route] = pathname!.split('/')
	const {
		status,
		body: originalBody = false,
		cache = { public: true, sMaxage: 86400 },
	}: Result =
		route === 'package'
			? await packageR(pathname!, request)
			: route === 'oss'
			? await oss(pathname!, request)
			: { status: 404 }
	const body = originalBody ? originalBody : await error({ status, request })
	return send(setHeader(res, cacheControl(cache)), status, body)
}
