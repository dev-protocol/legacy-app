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
import { osss } from '../template/osss'
import { button } from '../template/button'
import { gradientDev } from '../style/color'
import { ampImage } from '../template/amp/amp-image'

interface Opts {
	readonly request: IncomingMessage
}

const classNames = {
	downloads: 'downloads',
	osss: 'osss',
	button: 'button'
}

export const oss = async ({ request }: Opts) => html`
	<!DOCTYPE html>
	<html ⚡ lang="en">
		${
			head({
				title: 'OSSs',
				description: 'Many OSSs are participating',
				url: {
					host: config.domain,
					path: request.url
				}
			})
		}
		${
			style`
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
				.${classNames.downloads} {
					amp-img {
						max-width: 640px;
						margin: auto;
					}
				}
				.${classNames.osss} {
					display: grid;
					grid-gap: 2rem;
					& .${classNames.button} {
						font-weight: bolder;
						justify-self: center;
						background-image: ${gradientDev};
					}
				}
			`
		}
		<body>
			${ampAnalytics()} ${header()} ${nav()}
			<main>
				${docHeading({ title: 'Many OSSs are participating' })}
				${
					docContent({
						content: raw`
							<section class="${classNames.downloads}">
								<h2>Downloads chart</h2>
								${ampImage({
									alt: 'image',
									src: '//asset.devtoken.rocks/lp/chart/2018-12.png',
									width: 2212,
									height: 1296,
									layout: 'responsive'
								})}
							</section>
						`
					})
				}
				${
					docContent({
						content: raw`
							<section class="${classNames.osss}">
								<h2>OSSs</h2>
								${osss()}
								${button({
									link: '/doc/start',
									content: 'Add Your OSS(s)',
									className: classNames.button
								})}

							</section>
						`
					})
				}
			</main>
			${footer()}
		</body>
	</html>
`
