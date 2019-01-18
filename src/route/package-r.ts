import { IncomingMessage } from 'http'
import { getPackage } from '../lib/get-package'
import { getTokens } from '../lib/get-tokens'
import { packagePage } from '../page/package-page'
import { Result } from '../app'

export const packageR = async (
	pathname: string,
	request: IncomingMessage
): Promise<Result> => {
	const pkg = pathname.replace(/^\/package\//, '')
	const packageInfo = await getPackage(pkg)
	const account = await getTokens(
		packageInfo ? packageInfo.address : packageInfo
	)
	const body =
		packageInfo && account
			? await packagePage({ package: packageInfo, account, request })
			: false
	return body
		? {
				body,
				status: 200
		  }
		: {
				status: 404
		  }
}
