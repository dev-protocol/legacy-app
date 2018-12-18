import { IncomingMessage } from 'http'
import { pkg } from '../page/api/package'

export const api = async (pathname: string, request: IncomingMessage) => {
	const [, , feature] = pathname.split('/')
	return feature === 'package' ? pkg({ pathname, request }) : false
}
