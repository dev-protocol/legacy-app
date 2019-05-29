import { IncomingMessage } from 'http'
import { challenge as _challenge } from '../page/challenge'

export const challenge = async (pathname: string, request: IncomingMessage) => {
	const body =
		pathname === '/challenge' || pathname === '/challenge/'
			? await _challenge({ request })
			: false
	return body
		? {
				body,
				status: 200
		  }
		: { status: 404 }
}
