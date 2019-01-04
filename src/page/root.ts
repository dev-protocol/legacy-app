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
	button: {
		start: 'button__start'
	}
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
			main {
				display: grid;
				justify-content: center;
				align-content: center;
				grid-gap: 2rem;
				text-transform: capitalize;
				justify-content: stretch;
			}
			a {
				color: white;
			}
			h1,
			h2,
			p {
				margin: 0;
			}
			.${classNames.content} {
				display: grid;
				grid-gap: 1rem;
				text-align: center;
				margin: auto;
				padding: 5rem 2rem;
				box-sizing: border-box;
				${large(`
					padding: 5rem;
				`)}
			}
			.${classNames.button.start} {
				place-self: center;
			}
			.${classNames.exchange} {
				a {
					text-decoration: none;
					amp-img {
						width: 100px;
						display: inline-block;
						vertical-align: middle;
					}
					span {
						margin-left: 1rem;
						font-size: 2rem;
					}
				}
			}
			.${classNames.features} {
				div {
					display: grid;
					grid-gap: 1rem;
					grid-template-columns: repeat(2, 1fr);
					align-items: center;
				}
			}
		`
		})}
		<body>
			${await ampAnalytics()} ${await header()}
			<main>
				<section>
					<div class="${classNames.content} ${classNames.heading}">
						<h1>Token for OSS Sustainability</h1>
						<p>Dev monetizes open source right now.</p>
						<p>
							Anyone can start without changing licenses, codes, and support.
						</p>
						<p>Just publish your open source to npm.</p>
						${await button({
							link: 'https://goo.gl/forms/1i0LrGHRId613bVp1',
							content: 'start now',
							className: classNames.button.start
						})}
					</div>
				</section>
				<section>
					<div class="${classNames.content} ${classNames.downloads}">
						<h2>OSS Downloads</h2>
						<p>Monthly<br />500M+</p>
						${await button({
							link: 'https://goo.gl/forms/1i0LrGHRId613bVp1',
							content: 'lean more'
						})}
					</div>
				</section>
				<section>
					<div class="${classNames.content} ${classNames.exchange}">
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
					</div>
				</section>
				<section>
					<div class="${classNames.content} ${classNames.features}">
						<h2>Features</h2>
						<div>
							<p>Support open source project</p>
							<amp-img alt='image: Support open source project'
								src=//dummyimage.com/600x400/ccc/0011ff
								width=600
								height=400
								layout=responsive>
							</amp-img>
							<amp-img alt='image: Find an influential open source project'
								src=//dummyimage.com/600x400/ccc/0011ff
								width=600
								height=400
								layout=responsive>
							</amp-img>
							<p>Find an influential open source project</p>
							<p>Receive rewards for contributions and activities</p>
							<amp-img alt='image: Receive rewards for contributions and activities'
								src=//dummyimage.com/600x400/ccc/0011ff
								width=600
								height=400
								layout=responsive>
							</amp-img>
						</div>
					</div>
				</section>
			</main>
			${await footer()}
		</body>
	</html>
`
