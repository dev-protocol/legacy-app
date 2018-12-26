import { IncomingMessage } from 'http'
import { root as _root } from '../page/root'

export const root = async (pathname: string, request: IncomingMessage) => {
	return pathname === '/' ? _root({ request }) : false
}
