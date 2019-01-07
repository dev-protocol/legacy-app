import { html } from '../lib/html'
import { ampComponent } from '../lib/amp-component'

interface URL {
	readonly protocol?: string
	readonly host: string
	readonly path?: string
}

interface Opts {
	readonly title: string
	readonly url: URL
	readonly description: string
	readonly injection?: string
}

const absolutePath = ({ protocol = 'https', host, path = '' }: URL) =>
	`${protocol}://${host}${path}`

export const head = async ({
	title,
	description,
	url,
	injection = ''
}: Opts) => html`
	<head>
		<meta charset="utf-8" />
		<meta
			name="viewport"
			content="width=device-width,minimum-scale=1,initial-scale=1"
		/>
		<link rel="canonical" href="${absolutePath(url)}" />
		<link
			href="https://fonts.googleapis.com/css?family=Montserrat+Alternates:400,700"
			rel="stylesheet"
		/>
		<title>
			${title ? `${title} - ` : ''}Dev | Tokens for OSS sustainability
		</title>
		<link
			rel="icon"
			href="${
				absolutePath({ host: 'asset.devtoken.rocks', path: '/favicon.ico' })
			}"
		/>
		<link
			rel="icon"
			type="image/png"
			sizes="32x32"
			href="${
				absolutePath({
					host: 'asset.devtoken.rocks',
					path: '/favicon-32x32.png'
				})
			}"
		/>
		<link
			rel="icon"
			type="image/png"
			sizes="16x16"
			href="${
				absolutePath({
					host: 'asset.devtoken.rocks',
					path: '/favicon-16x16.png'
				})
			}"
		/>
		<link
			rel="apple-touch-icon"
			sizes="180x180"
			href="${
				absolutePath({
					host: 'asset.devtoken.rocks',
					path: '/apple-touch-icon.png'
				})
			}"
		/>
		<link
			rel="manifest"
			href="${
				absolutePath({
					host: 'asset.devtoken.rocks',
					path: '/site.webmanifest'
				})
			}"
		/>
		<link
			rel="mask-icon"
			href="${
				absolutePath({
					host: 'asset.devtoken.rocks',
					path: '/safari-pinned-tab.svg'
				})
			}"
			color="#000000"
		/>
		<meta name="msapplication-TileColor" content="#000000" />
		<meta name="theme-color" content="#000000" />
		<meta property="og:site_name" content="Dev" />
		<meta property="og:type" content="website" />
		<meta property="og:url" content="${absolutePath(url)}" />
		<meta property="og:title" content="${title}" />
		<meta name="description" content="${description}" />
		<meta property="og:description" content="${description}" />
		<meta
			property="og:image"
			content="${
				absolutePath({ host: 'asset.devtoken.rocks', path: '/icon.png' })
			}"
		/>
		<meta
			name="twitter:image"
			content="${
				absolutePath({ host: 'asset.devtoken.rocks', path: '/icon.png' })
			}"
		/>
		<meta name="twitter:card" content="summary" />
		<meta name="twitter:site" content="//twitter.com/devtoken_rocks" />
		${await ampComponent('amp-sidebar')} ${await ampComponent('amp-analytics')}
		${injection}
	</head>
`
