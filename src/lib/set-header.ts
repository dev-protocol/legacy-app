// tslint:disable:no-expression-statement
import { ServerResponse } from 'http'

export const setHeader = (res: ServerResponse) => {
	res.setHeader(
		'cache-control',
		'public, s-maxage=86400, stale-while-revalidate=3600, must-revalidate'
	)
	return res
}
