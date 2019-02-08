import { amp as html } from '../lib/amp'
import { html as raw } from '../lib/html'
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
import { head } from '../template/head'
import { ampAnalytics } from '../template/amp/amp-analytics'
import { nav } from '../template/nav'
import { sponsors } from '../template/sponsors'
import { acceptLanguages } from '../lib/accept-languages'
import { container } from '../template/container'
import { whatsSponsors } from '../template/whats-sponsors'

interface Opts {
	readonly request: IncomingMessage
	readonly package: DistributionTarget
	readonly account: AddressBalance
}

const section = 'section'
export const packagePage = async ({
	package: pkg,
	account,
	request
}: Opts) => html`
	<!DOCTYPE html>
	<html ⚡ lang="en">
		${
			head({
				title: `${pkg.package} is using Dev`,
				description: `${pkg.package} has ${account.balance} DEV.`,
				url: {
					host: config.domain,
					path: request.url
				},
				injection: style`
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
					${large(`
						display: block;
					`)}
				}
			}
		`
			})
		}
		<body>
			${ampAnalytics()} ${header()} ${nav()}
			<main>
				<section class="${section}__package">
					${
						packageInfo({
							package: pkg,
							account
						})
					}
				</section>
				<section>
					${
						container(
							raw`
								<h2>Sponsors</h2>
								${sponsors({
									locales: acceptLanguages(request.headers[
										'accept-language'
									] as string)
								})}
							`
						)
					}
					${
						container(
							raw`
								${whatsSponsors()}
							`
						)
					}
				</section>
				<section>${whats()}</section>
				<section>${join()}</section>
				<section>${trade()}</section>
			</main>
			${footer()}
		</body>
	</html>
`
