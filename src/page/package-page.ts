import { amp as html } from '../lib/amp'
import { DistributionTarget, AddressBalance } from 'dev-distribution/src/types'
import { packageInfo } from '../template/package-widget'
import { IncomingMessage } from 'http'
import { style } from '../lib/style'
import { large } from '../style/large'
import { header } from '../template/header'

interface Opts {
	readonly request: IncomingMessage
	readonly package: DistributionTarget
	readonly account: AddressBalance
}

const classNames = {
	header: 'header',
	packageInfo: 'package-info'
}

export const packagePage = async ({
	package: pkg,
	account,
	request
}: Opts) => html`
<!doctype html>
<html ⚡>
	<head>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">
		<link rel="canonical" href="${request.url}">
		<link href="https://fonts.googleapis.com/css?family=Montserrat+Alternates:400,700" rel="stylesheet">
		${await style`
			body {
				background: black;
				color: white;
				font-family: 'Montserrat Alternates', sans-serif;
			}
			.${classNames.packageInfo} {
				margin: 2rem;
				padding: 1rem;
				${large(`
					margin: 5rem;
				`)}
			}
		`}
	</head>
	<body>
		${await header({ className: classNames.header })}
		<main>
			${await packageInfo({
				package: pkg,
				account,
				className: classNames.packageInfo
			})}
		</main>
	</body>
</html>
`
