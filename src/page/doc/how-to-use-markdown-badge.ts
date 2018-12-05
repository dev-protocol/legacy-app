import { IncomingMessage } from 'http'
import { amp as html } from '../../lib/amp'
import { html as raw } from '../../lib/html'
import { head } from '../../template/head'
import { config } from '../../config'
import { style } from '../../lib/style'
import { ampAnalytics } from '../../template/amp-analytics'
import { header } from '../../template/header'
import { ampComponent } from '../../lib/amp-component'
import { sampleCode } from '../../template/sample-code'
import { docHeading } from '../../template/doc-heading'
import { docContent } from '../../template/doc-content'

interface Opts {
	readonly request: IncomingMessage
}

export const howToUseMarkdownBadge = async ({ request }: Opts) => html`
	<!DOCTYPE html>
	<html ⚡>
		${
			await head({
				title: 'How To Use Markdown Badge',
				description: 'How To Use Markdown Badge',
				url: {
					host: config.domain,
					path: request.url
				},
				injection: await ampComponent('amp-bind')
			})
		}
		${
			await style`
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
				p {
					margin: 0;
				}
			`
		}
		<body>
			${await ampAnalytics()} ${await header()}
			<main>
				${await docHeading({ title: 'How To Use Markdown Badge' })}
				${
					await docContent({
						content: await raw`
							<p>Enter the OSS(package) name in the form, copy one of the formats and paste them into your project's <code>README.md</code>.</p>
						`
					})
				}
				${await sampleCode()}
			</main>
		</body>
	</html>
`
