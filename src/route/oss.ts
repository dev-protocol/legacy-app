import { IncomingMessage } from 'http'
import { oss as _oss } from '../page/oss'

export const oss = async (pathname: string, request: IncomingMessage) => {
	const body = pathname === '/oss' ? await _oss({ request }) : false
	return body
		? {
				body,
				status: 200
		  }
		: { status: 404 }
}
