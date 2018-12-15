import { IncomingMessage } from 'http'
import { packages } from '../page/api/packages'

export const api = async (pathname: string, request: IncomingMessage) => {
	const [, , feature] = pathname.split('/')
	return feature === 'packages' ? packages({ pathname, request }) : false
}
