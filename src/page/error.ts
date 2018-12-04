import { amp as html } from '../lib/amp'
import { IncomingMessage } from 'http'
import { style } from '../lib/style'
import { imageLogo } from '../template/image-logo'
import { config } from '../config'

interface Opts {
	readonly request: IncomingMessage
	readonly status: number
	readonly message?: string
}

const defaultMessage = 'page not found'

export const error = async (
	{ request, status, message = defaultMessage }: Opts,
	proto = 'https'
) => html`
<!doctype html>
<html ⚡>
	<head>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">
		<link rel="canonical" href="${proto}://${config.domain}${request.url}">
		<link href="https://fonts.googleapis.com/css?family=Montserrat+Alternates:400,700" rel="stylesheet">
		<title>${message} - Dev | Token for OSS sustainability</title>
		<link rel="icon" href="//asset.devtoken.rocks/favicon.ico">
		<link rel="icon" type="image/png" sizes="32x32" href="//asset.devtoken.rocks/favicon-32x32.png">
		<link rel="icon" type="image/png" sizes="16x16" href="//asset.devtoken.rocks/favicon-16x16.png">
		<link rel="apple-touch-icon" sizes="180x180" href="//asset.devtoken.rocks/apple-touch-icon.png">
		<link rel="manifest" href="//asset.devtoken.rocks/site.webmanifest">
		<link rel="mask-icon" href="//asset.devtoken.rocks/safari-pinned-tab.svg" color="#5bbad5">
		<meta name="msapplication-TileColor" content="#000000">
		<meta name="theme-color" content="#000000">
		${await style`
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
		`}
	</head>
	<body>
		<main>
			<h1>${status}</h1>
			<p>${message}</p>
			<p><a href='//devtoken.rocks/alpha/en'>${imageLogo()}</a></p>
		</main>
	</body>
</html>
`
