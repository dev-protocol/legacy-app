import { send } from 'micro'
import { IncomingMessage, ServerResponse } from 'http'
import { parse } from 'url'
import { error } from './page/error'
import { packageR } from './route/package-r'
import { doc } from './route/doc'
import { api } from './route/api'
import { root } from './route/root'
import { oss } from './route/oss'
import { setHeader } from './lib/set-header'
import { badge } from './route/badge'

interface Result {
	readonly body?: string | Error | false
	readonly status: number
}

export const app = async (request: IncomingMessage, res: ServerResponse) => {
	const { url = '' } = request
	const parsed = parse(url)
	const { pathname = '' } = parsed
	const [, route] = pathname.split('/')
	const { body: originalBody = false, status }: Result =
		route === 'package'
			? await packageR(pathname, request)
			: route === 'doc'
			? await doc(pathname, request)
			: route === 'api'
			? await api(pathname, request)
			: route === 'oss'
			? await oss(pathname, request)
			: route === 'badge'
			? await badge(pathname, res)
			: route === ''
			? await root(pathname, request)
			: { status: 404 }
	const body = originalBody ? originalBody : await error({ status, request })
	return send(setHeader(res), status, body)
}
