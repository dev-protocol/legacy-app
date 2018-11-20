import { createError } from 'micro'
import { IncomingMessage } from 'http'
import { parse } from 'url'
import { getPackage } from './lib/get-package'
import { getTokens } from './lib/get-tokens'
import { packagePage } from './page/package-page'

const error = (status = 404, body = '') => createError(status, body)

// [GET] /package-name
export default async (request: IncomingMessage) => {
	const { url = '' } = request
	const parsed = parse(url)
	const { pathname = '' } = parsed
	const pkg = pathname.replace(/^\//, '')
	const packageInfo = await getPackage(pkg)
	const account = await getTokens(
		packageInfo ? packageInfo.address : packageInfo
	)
	return packageInfo && account
		? packagePage({ package: packageInfo, account, request })
		: error()
}
