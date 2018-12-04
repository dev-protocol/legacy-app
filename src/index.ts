import { send } from 'micro'
import { IncomingMessage, ServerResponse } from 'http'
import { parse } from 'url'
import { error } from './page/error'
import { packages } from './route/packages'
import { badge } from './route/badge'

export default async (request: IncomingMessage, res: ServerResponse) => {
	const { url = '' } = request
	const parsed = parse(url)
	const { pathname = '' } = parsed
	const [, route] = pathname.split('/')
	const body =
		route === 'package'
			? await packages(pathname, request)
			: route === 'badge'
				? await badge(pathname, res)
				: false
	const status = body ? 200 : 404
	return send(res, status, body || (await error({ status, request })))
}
