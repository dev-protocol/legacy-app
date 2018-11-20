import { amp as html } from '../lib/amp'
import { DistributionTarget, AddressBalance } from 'dev-distribution/src/types'
import { packageInfo } from '../template/package-widget'

interface Opts {
	readonly package: DistributionTarget
	readonly account: AddressBalance
}

export const packagePage = async ({ package: pkg, account }: Opts) => html`
			<!doctype html>
			<html ⚡>
				<head>
					<meta charset="utf-8">
					<link rel="canonical" href="">
					<meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">
				</head>
				<body>
					${await packageInfo(pkg, account)}
				</body>
			</html>
			`
