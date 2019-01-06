import { IncomingMessage } from 'http'
import { oss as _oss } from '../page/oss'

export const oss = async (pathname: string, request: IncomingMessage) => {
	return pathname === '/oss' ? _oss({ request }) : false
}
