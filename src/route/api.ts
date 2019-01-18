import { IncomingMessage } from 'http'
import { pkg } from '../page/api/package'
import { Result } from '../app'

const cache = {
	private: true,
	noStore: true,
	noCache: true,
	mustRevalidate: true
}

export const api = async (
	pathname: string,
	request: IncomingMessage
): Promise<Result> => {
	const [, , feature] = pathname.split('/')
	const body = feature === 'package' ? await pkg({ pathname, request }) : false
	return body instanceof Error
		? {
				body: JSON.stringify({ message: body.message }),
				status: 400,
				cache
		  }
		: body
		? {
				body: JSON.stringify(body),
				status: 200,
				cache
		  }
		: {
				status: 404,
				cache
		  }
}
