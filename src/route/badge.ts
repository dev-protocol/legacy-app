import { certification } from '../page/badge/certification'
import { ServerResponse } from 'http'
import { setHeader } from '../lib/set-header'
import { svg } from '../template/empty'

export const badge = async (pathname: string, res: ServerResponse) => {
	const [, , feature] = pathname.split('/')
	const body =
		feature === 'certification' ? await certification({ pathname }) : false
	// tslint:disable-next-line:no-expression-statement
	setHeader(res, {
		'content-type': 'image/svg+xml'
	})
	const empty = await svg()
	return body
		? {
				body,
				status: body === empty ? 404 : 200
		  }
		: {
				body: empty,
				status: 404
		  }
}
