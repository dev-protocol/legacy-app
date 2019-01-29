import { IncomingMessage } from 'http'
import { sponsor as _sponsor } from '../page/sponsor'

export const sponsor = async (pathname: string, request: IncomingMessage) => {
	const body = pathname === '/sponsor' ? await _sponsor({ request }) : false
	return body
		? {
				body,
				status: 200
		  }
		: { status: 404 }
}
