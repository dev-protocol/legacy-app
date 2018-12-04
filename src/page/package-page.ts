import { amp as html } from '../lib/amp'
import { DistributionTarget, AddressBalance } from 'dev-distribution/src/types'
import { packageInfo } from '../template/package-widget'
import { IncomingMessage } from 'http'
import { style } from '../lib/style'
import { header } from '../template/header'
import { whats } from '../template/whats'
import { footer } from '../template/footer'
import { join } from '../template/join'
import { large } from '../style/large'
import { trade } from '../template/trade'
import { config } from '../config'

interface Opts {
	readonly request: IncomingMessage
	readonly package: DistributionTarget
	readonly account: AddressBalance
}

const section = 'section'

export const packagePage = async (
	{ package: pkg, account, request }: Opts,
	proto = 'https'
) => html`
<!doctype html>
<html ⚡>
	<head>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">
		<link rel="canonical" href="${proto}://${config.domain}${request.url}">
		<link href="https://fonts.googleapis.com/css?family=Montserrat+Alternates:400,700" rel="stylesheet">
		<title>${pkg.package} uses Dev - Dev | Token for OSS sustainability</title>
		${await style`
			body {
				background: black;
				color: white;
				font-family: 'Montserrat Alternates', sans-serif;
			}
			a {
				color: white;
			}
			section {
				border: 0.5px solid #ffffff80;
				border-left: 0;
				border-right: 0;
				&:not(:last-child) {
					border-bottom: 0;
				}
				&:first-child {
					border: 0;
				}
			}
			.${section} {
				&__package {
					display: grid;
					min-height: 80vh;
					${large(`
						display: block;
						min-height: auto;
					`)}
				}
			}
		`}
	</head>
	<body>
		${await header()}
		<main>
			<section class='${section}__package'>
				${await packageInfo({
					package: pkg,
					account
				})}
			</section>
			<section>
				${await whats()}
			</section>
			<section>
				${await join()}
			</section>
			<section>
				${await trade()}
			</section>
		</main>
		${await footer()}
	</body>
</html>
`
