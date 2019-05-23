import { amp as html } from '../lib/amp'
import { IncomingMessage } from 'http'
import { style } from '../lib/style'
import { imageLogo } from '../template/image-logo'
import { config } from '../config'
import { head } from '../template/head'
import { ampAnalytics } from '../template/amp/amp-analytics'

interface Opts {
	readonly request: IncomingMessage
}

export const confirm = async ({ request }: Opts) => html`
	<!DOCTYPE html>
	<html ⚡ lang="en">
		${await head({
			title: 'Confirm owner',
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
				max-width: 120px;
			}
			h1,
			p {
				margin: 0;
			}
			amp-img {
				max-width: 120px;
			}
		`
		})}
		<body>
			${await ampAnalytics()}
			<main>
				<h1>Thank you!</h1>
				<p>Please wait for notice of registration completion.</p>
				<p><a href="/">${imageLogo()}</a></p>
			</main>
		</body>
	</html>
`
