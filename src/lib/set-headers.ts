import { IncomingHttpHeaders, ServerResponse } from 'http'

export const setHeaders = (headers: IncomingHttpHeaders, res: ServerResponse) =>
	Object.keys(headers).map(header => {
		// tslint:disable-next-line:no-expression-statement
		res.setHeader(header, headers[header] || '')
	})
