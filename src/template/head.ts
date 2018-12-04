import { html } from '../lib/html'

interface URL {
	readonly protocol?: string
	readonly host: string
	readonly path?: string
}

interface Opts {
	readonly title: string
	readonly url: URL
	readonly injection?: string
}

export const head = async ({ title, url, injection }: Opts) => html`
	<head>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">
		<link rel="canonical"
			  href="${url.protocol || 'https'}://${url.host}${url.path}">
		<link href="https://fonts.googleapis.com/css?family=Montserrat+Alternates:400,700" rel="stylesheet">
		<title>${title} - Dev | Token for OSS sustainability</title>
		<link rel="icon" href="//asset.devtoken.rocks/favicon.ico">
		<link rel="icon" type="image/png" sizes="32x32" href="//asset.devtoken.rocks/favicon-32x32.png">
		<link rel="icon" type="image/png" sizes="16x16" href="//asset.devtoken.rocks/favicon-16x16.png">
		<link rel="apple-touch-icon" sizes="180x180" href="//asset.devtoken.rocks/apple-touch-icon.png">
		<link rel="manifest" href="//asset.devtoken.rocks/site.webmanifest">
		<link rel="mask-icon" href="//asset.devtoken.rocks/safari-pinned-tab.svg" color="#5bbad5">
		<meta name="msapplication-TileColor" content="#000000">
		<meta name="theme-color" content="#000000">
		${injection}
	</head>
`
