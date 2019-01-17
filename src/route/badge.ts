import { certification } from '../page/badge/certification'
import { ServerResponse } from 'http'
import { setHeader } from '../lib/set-header'

export const badge = async (pathname: string, res: ServerResponse) => {
	const [, , feature] = pathname.split('/')
	const body =
		feature === 'certification' ? await certification({ pathname }) : false
	return typeof body === 'string'
		? (b => {
				// tslint:disable-next-line:no-expression-statement
				setHeader(res, {
					'content-type': 'image/svg+xml'
				})
				return b
		  })(body)
		: body
}
