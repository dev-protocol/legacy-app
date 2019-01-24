import { amp as html } from '../lib/amp'
import { IncomingMessage } from 'http'
import { style } from '../lib/style'
import { imageLogo } from '../template/image-logo'
import { config } from '../config'
import { head } from '../template/head'
import { ampAnalytics } from '../template/amp/amp-analytics'

interface Opts {
	readonly request: IncomingMessage
	readonly status: number
	readonly message?: string
}

const defaultMessage = 'page not found'

export const error = async ({
	request,
	status,
	message = defaultMessage
}: Opts) => html`
	<!DOCTYPE html>
	<html ⚡ lang="en">
		${
			await head({
				title: message,
				description: message,
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
			${await ampAnalytics()}
			<main>
				<h1>${status}</h1>
				<p>${message}</p>
				<p><a href="/">${imageLogo()}</a></p>
			</main>
		</body>
	</html>
`
