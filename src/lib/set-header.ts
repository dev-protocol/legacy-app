// tslint:disable:no-expression-statement
// tslint:disable:no-for-in
import { ServerResponse } from 'http'

interface Headers {
	readonly [key: string]: string
}

export const setHeader = (res: ServerResponse, properties?: Headers) => {
	for (const key in properties) {
		res.setHeader(key, properties[key])
	}
	return res
}
