import * as escapeHTML from 'escape-html'
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
	readonly injection?: string | Promise<string>
	readonly image?: string
}

const defaultTitle = 'Dev - Tokens for OSS sustainability'

export const head = async ({
	title,
	description,
	url,
	injection = '',
	image,
}: Opts) => html`
	<head>
		<meta charset="utf-8" />
		<meta
			name="viewport"
			content="width=device-width,minimum-scale=1,initial-scale=1"
		/>
		<link rel="canonical" href="${url}" />
		<link
			href="https://fonts.googleapis.com/css?family=Montserrat+Alternates:400,700"
			rel="stylesheet"
		/>
		<title>${escapeHTML(`${title ? `${title} - ` : ''}${defaultTitle}`)}</title>
		<link rel="icon" href="/public/favicon.ico" />
		<link
			rel="icon"
			type="image/png"
			sizes="32x32"
			href="/public/favicon-32x32.png"
		/>
		<link
			rel="icon"
			type="image/png"
			sizes="16x16"
			href="/public/favicon-16x16.png"
		/>
		<link
			rel="apple-touch-icon"
			sizes="180x180"
			href="/public/apple-touch-icon.png"
		/>
		<link rel="manifest" href="/public/site.webmanifest" />
		<link
			rel="mask-icon"
			href="/public/safari-pinned-tab.svg"
			color="#000000"
		/>
		<meta name="msapplication-TileColor" content="#000000" />
		<meta name="theme-color" content="#000000" />
		<meta property="og:site_name" content="Dev" />
		<meta property="og:type" content="website" />
		<meta property="og:url" content="${url}" />
		<meta property="og:title" content="${escapeHTML(title || defaultTitle)}" />
		<meta name="description" content="${escapeHTML(description)}" />
		<meta property="og:description" content="${escapeHTML(description)}" />
		<meta name="twitter:title" content="${escapeHTML(title || defaultTitle)}" />
		<meta name="twitter:description" content="${escapeHTML(description)}" />
		<meta property="og:image" content="${image ? image : '/public/og.png'}" />
		<meta name="twitter:image" content="${image ? image : '/public/og.png'}" />
		<meta name="twitter:card" content="summary_large_image" />
		<meta name="twitter:site" content="@devtoken_rocks" />
		${await ampComponent('amp-sidebar')} ${await ampComponent('amp-analytics')}
		${injection}
	</head>
`
