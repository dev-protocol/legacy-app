import { get } from '../lib/get'
import { ServerResponse } from 'http'
import { setHeaders } from '../lib/set-headers'

export const badge = async (pathname: string, res: ServerResponse) => {
	const pkg = pathname.replace(/^\/badge\//, '')
	return pkg
		? (proxy => {
				// tslint:disable-next-line:no-expression-statement
				setHeaders(proxy.headers, res)
				return proxy.body
		  })(await get<string>(`//dev-badge.now.sh/${pkg}`))
		: false
}
