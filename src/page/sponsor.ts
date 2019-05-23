import { IncomingMessage } from 'http'
import { amp as html } from '../lib/amp'
import { html as raw } from '../lib/html'
import { head } from '../template/head'
import { config } from '../config'
import { style } from '../lib/style'
import { ampAnalytics } from '../template/amp/amp-analytics'
import { header } from '../template/header'
import { docHeading } from '../template/doc-heading'
import { docContent } from '../template/doc-content'
import { nav } from '../template/nav'
import { footer } from '../template/footer'
import { sponsors } from '../template/sponsors'
import { acceptLanguages } from '../lib/accept-languages'
import { whatsSponsors } from '../template/whats-sponsors'

interface Opts {
	readonly request: IncomingMessage
}

const classNames = {
	sponsors: 'sponsors'
}

export const sponsor = async ({ request }: Opts) => html`
	<!DOCTYPE html>
	<html ⚡ lang="en">
		${head({
			title: 'Sponsor',
			description: '',
			url: {
				host: config.domain,
				path: request.url
			}
		})}
		${style`
				body {
					background: black;
					color: white;
					font-family: 'Montserrat Alternates', sans-serif;
				}
				main {
				}
				a {
					color: white;
				}
				h1,
				h2,
				p {
					margin: 0;
				}
				h2 {
					text-align: center;
					margin-bottom: 4rem;
				}
				.${classNames.sponsors} {
				}
			`}
		<body>
			${ampAnalytics()} ${header()} ${nav()}
			<main>
				${docHeading({ title: 'Sponsors' })}
				${docContent({
					content: raw`
							<section class="${classNames.sponsors}">
								${sponsors({
									locales: acceptLanguages(request.headers[
										'accept-language'
									] as string)
								})}
							</section>
						`
				})}
				${docContent({
					content: raw`
							<section>
								${whatsSponsors()}
							</section>
						`
				})}
			</main>
			${footer()}
		</body>
	</html>
`
