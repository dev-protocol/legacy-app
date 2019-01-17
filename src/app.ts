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

export const app = async (request: IncomingMessage, res: ServerResponse) => {
	const { url = '' } = request
	const parsed = parse(url)
	const { pathname = '' } = parsed
	const [, route] = pathname.split('/')
	const result =
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
			: false
	const status = result instanceof Error ? 400 : result ? 200 : 404
	const body =
		result instanceof Error
			? { message: result.message }
			: result
			? result
			: await error({ status, request })
	return send(setHeader(res), status, body)
}
