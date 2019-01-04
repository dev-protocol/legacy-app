import { amp as html } from '../lib/amp'
import { IncomingMessage } from 'http'
import { style } from '../lib/style'
import { config } from '../config'
import { head } from '../template/head'
import { ampAnalytics } from '../template/amp-analytics'
import { header } from '../template/header'
import { button } from '../template/button'
import { footer } from '../template/footer'
import { large } from '../style/large'

interface Opts {
	readonly request: IncomingMessage
}

const classNames = {
	content: 'content',
	heading: 'heading',
	downloads: 'downloads',
	features: 'features',
	exchange: 'exchange',
	button: 'button'
}

export const root = async ({ request }: Opts) => html`
	<!DOCTYPE html>
	<html ⚡>
		${await head({
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
			a {
				color: white;
			}
			h1,
			h2,
			p {
				margin: 0;
			}
			section {
				display: grid;
				width: 100%;
				max-width: 1600px;
				margin: auto;
				padding: 3rem 0;
				align-items: start;
				${large(`
					grid-auto-flow: column;
				`)}
			}
			figure {
				margin: 0;
			}
			.${classNames.content} {
				display: grid;
				grid-gap: 1rem;
				padding: 2rem;
				box-sizing: border-box;
				max-width: 450px;
				justify-items: center;
				${large(`
					justify-items: start;
				`)}
			}
			.${classNames.button} {
				margin-top: 2rem;
				${large(`
					margin-top: 3rem;
				`)}
			}
			.${classNames.heading} {
				grid-template-areas:
					'figure'
					'content';
				${large(`
					grid-template-areas: 'content figure';
					grid-template-columns: auto 1fr;
					`)}
				& .${classNames.content} {
					grid-area: content;
				}
				& figure {
					grid-area: figure;
				}
				& .${classNames.button} {
					justify-self: normal;
					text-align: center;
					font-weight: bold;
					background-image: linear-gradient(120deg, #00ebff, #f200df 35%, #ff4700);
				}
				h1 {
					font-size: 2rem;
					${large(`
						font-size: 3rem;
					`)}
				}
			}
			.${classNames.downloads} {
				justify-content: center;
				${large(`
					grid-template-columns: 1fr 50%;
				`)}
			}
			.${classNames.exchange} {
				align-items: center;
				grid-gap: 5rem;
				justify-content: center;
				justify-items: center;
				${large(`
					grid-gap: 10rem;
				`)}
				a {
					display: grid;
					grid-gap: 1rem;
					grid-auto-flow: column;
					align-items: center;
					text-decoration: none;
					amp-img {
						width: 100px;
					}
					span {
						font-size: 2rem;
					}
				}
			}
			.${classNames.features} {
				align-items: center;
				${large(`
					grid-template-columns: 1fr 50%;
				`)}
			}
		`
		})}
		<body>
			${await ampAnalytics()} ${await header()}
			<main>
				<section class="${classNames.heading}">
					<div class="${classNames.content}">
						<h1>Code as Life</h1>
						<p>Dev is a token for OSS sustainability.</p>
						<p>Dev monetizes open source right now.</p>
						<p>
							Anyone can start without changing licenses, codes, and support.
						</p>
						<p>Just publish your open source to npm.</p>
						${await button({
							link: 'https://goo.gl/forms/1i0LrGHRId613bVp1',
							content: 'Start Now',
							className: classNames.button
						})}
					</div>
					<figure>
						<amp-img alt='image'
							src=//dummyimage.com/1000x600/000/0011ff
							width=1000
							height=600
							layout=responsive>
						</amp-img>
					</figure>
				</section>
				<section class="${classNames.downloads}">
					<figure>
						<amp-img alt='image'
							src=//dummyimage.com/1000x600/000/0011ff
							width=1000
							height=600
							layout=responsive>
						</amp-img>
					</figure>
					<div class="${classNames.content}">
						<h2>OSS Downloads</h2>
						<p>Monthly<br />500M+</p>
						${await button({
							link: 'https://goo.gl/forms/1i0LrGHRId613bVp1',
							content: 'Lean More',
							className: classNames.button
						})}
					</div>
				</section>
				<section class="${classNames.exchange}">
					<h2>Exchange</h2>
					<a href="//etherdelta.com/#0x98626e2c9231f03504273d55f397409defd4a093-ETH" target="_blank" rel="noopener">
						<amp-img alt='EtherDelta'
							src=//asset.devtoken.rocks/etherdelta.svg
							width=2500
							height=2232
							layout=responsive>
						</amp-img>
						<span>EtherDelta</span>
					</a>
				</section>
				<section class="${classNames.features}">
					<figure>
						<amp-img alt='image'
							src=//dummyimage.com/1000x600/000/0011ff
							width=1000
							height=600
							layout=responsive>
						</amp-img>
					</figure>
					<div class="${classNames.content}">
						<h2>Features</h2>
						<p>Support open source project</p>
						<p>Find an influential open source project</p>
						<p>Receive rewards for contributions and activities</p>
					</div>
				</section>
			</main>
			${await footer()}
		</body>
	</html>
`
