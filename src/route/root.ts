import { IncomingMessage } from 'http'
import { root as _root } from '../page/root'

export const root = async (pathname: string, request: IncomingMessage) => {
	const body = pathname === '/' ? await _root({ request }) : false
	return body
		? {
				body,
				status: 200
		  }
		: { status: 404 }
}
