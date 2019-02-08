import { IncomingMessage } from 'http'
import { confirm as _confirm } from '../page/confirm'

export const confirm = async (pathname: string, request: IncomingMessage) => {
	const body = pathname === '/confirm' ? await _confirm({ request }) : false
	return body
		? {
				body,
				status: 200
		  }
		: { status: 404 }
}
