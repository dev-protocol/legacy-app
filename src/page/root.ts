import { amp as html } from '../lib/amp'
import { IncomingMessage } from 'http'
import { style } from '../lib/style'
import { config } from '../config'
import { head } from '../template/head'
import { ampAnalytics } from '../template/amp-analytics'
import { header } from '../template/header'

interface Opts {
	readonly request: IncomingMessage
}

export const root = async ({ request }: Opts) => html`
	<!DOCTYPE html>
	<html ⚡>
		${
			await head({
				title: '',
				description: '',
				url: {
					host: config.domain,
					path: request.url
				},
				injection: await style`
			body {
				background: black;
				color: white;
				font-family: 'Montserrat Alternates', sans-serif;
			}
			main {
				display: grid;
				justify-content: center;
				align-content: center;
				grid-gap: 2rem;
				text-transform: capitalize;
				min-height: 100vh;
			}
			a {
				color: white;
			}
			h1,
			p {
				margin: 0;
			}
		`
			})
		}
		<body>
			${await ampAnalytics()} ${await header()}
			<main></main>
		</body>
	</html>
`
