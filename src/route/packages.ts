import { IncomingMessage } from 'http'
import { getPackage } from '../lib/get-package'
import { getTokens } from '../lib/get-tokens'
import { packagePage } from '../page/package-page'

export const packages = async (pathname: string, request: IncomingMessage) => {
	const pkg = pathname.replace(/^\/package\//, '')
	const packageInfo = await getPackage(pkg)
	const account = await getTokens(
		packageInfo ? packageInfo.address : packageInfo
	)
	return packageInfo && account
		? packagePage({ package: packageInfo, account, request })
		: false
}
