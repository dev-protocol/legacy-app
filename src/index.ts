import { createError } from 'micro'
import { IncomingMessage } from 'http'
import { parse } from 'url'
import { getPackage } from './lib/get-package'
import { getTokens } from './lib/get-tokens'
import { app } from './template/app'

const error = (status = 404, body = '') => createError(status, body)

// [GET] /package-name
export default async (req: IncomingMessage) => {
	const { url = '' } = req
	const parsed = parse(url)
	const { pathname = '' } = parsed
	const pkg = pathname.replace(/^\//, '')
	const packageInfo = await getPackage(pkg)
	const tokens = await getTokens(
		packageInfo ? packageInfo.address : packageInfo
	)
	return packageInfo && tokens ? app(packageInfo, tokens) : error()
}
