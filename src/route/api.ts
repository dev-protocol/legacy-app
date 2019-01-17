import { IncomingMessage } from 'http'
import { pkg } from '../page/api/package'

export const api = async (pathname: string, request: IncomingMessage) => {
	const [, , feature] = pathname.split('/')
	const body = feature === 'package' ? await pkg({ pathname, request }) : false
	return body instanceof Error
		? {
				body: JSON.stringify({ message: body.message }),
				status: 400
		  }
		: body
		? {
				body: JSON.stringify(body),
				status: 200
		  }
		: {
				status: 404
		  }
}
