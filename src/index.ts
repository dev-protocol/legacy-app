import { send } from 'micro'
import { IncomingMessage, ServerResponse } from 'http'
import { parse } from 'url'
import { getPackage } from './lib/get-package'
import { getTokens } from './lib/get-tokens'
import { packagePage } from './page/package-page'

// [GET] /package-name
export default async (request: IncomingMessage, res: ServerResponse) => {
	const { url = '' } = request
	const parsed = parse(url)
	const { pathname = '' } = parsed
	const pkg = pathname.replace(/^\//, '')
	const packageInfo = await getPackage(pkg)
	const account = await getTokens(
		packageInfo ? packageInfo.address : packageInfo
	)
	const body =
		packageInfo && account
			? await packagePage({ package: packageInfo, account, request })
			: ''
	const status = body ? 200 : 404
	// tslint:disable-next-line:no-expression-statement
	send(res, status, body)
}
