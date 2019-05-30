import { amp as html } from '../lib/amp'
import { html as raw } from '../lib/html'
import { IncomingMessage } from 'http'
import { style } from '../lib/style'
import { config } from '../config'
import { head } from '../template/head'
import { ampAnalytics } from '../template/amp/amp-analytics'
import { header } from '../template/header'
import { nav } from '../template/nav'
import { ampComponent } from '../lib/amp-component'
import { button } from '../template/button'
import { large } from '../style/large'
import { footer } from '../template/footer'
import { whatsSponsors } from '../template/whats-sponsors'
import { container } from '../template/container'
import { sponsorsLogos } from '../template/sponsors-logos'

interface Opts {
	readonly request: IncomingMessage
}

const classNames = {
	video: 'video',
	main: 'main',
	hero: 'hero',
	term: 'term',
	links: 'links',
	coming: 'coming',
	sponsors: 'sponsors'
}

const title = {
	dev: 'Dev',
	challenge: 'Challenge'
}

export const challenge = async ({ request }: Opts) => html`
	<!DOCTYPE html>
	<html ⚡ lang="en">
		${head({
			title: 'Dev Challenge',
			description: '',
			url: {
				host: config.domain,
				path: request.url
			},
			injection: await html`
				${ampComponent('amp-video')}
				<link
					href="https://fonts.googleapis.com/css?family=Montserrat:400,700"
					rel="stylesheet"
				/>
			`
		})}
		${style`
			body {
				background: black;
				color: white;
				font-family: 'Montserrat Alternates', sans-serif;
			}
			.${classNames.video} {
				position: absolute;
				width: 100%;
				top: 0;
				z-index: -1;
				height: 50vh;
				${large(`
					height: 100vh;
				`)}
				video {
					object-fit: cover;
				}
				&::after {
					content: '';
					background-color: #00000038;
					position: absolute;
					top: 0;
					left: 0;
					right: 0;
					bottom: 0;
					background-size: 2px;
				}
			}
			.${classNames.main} {
				display: grid;
				margin: 4rem 0;
				justify-content: center;
				font-family: Montserrat, sans-serif;
				margin: auto;
				article {
					display: grid;
					justify-content: center;
					align-content: center;
					grid-gap: 4rem;
					${large(`
						grid-gap: 8rem;
						width: 640px;
					`)}
					text-transform: capitalize;
				}
			}
			.${classNames.hero} {
				position: absolute;
				width: 100%;
				top: 0;
				left: 0;
				display: grid;
				justify-content: center;
				align-content: center;
				height: 50vh;
				${large(`
					height: 100vh;
				`)}
				& + *::before {
					content: '';
					display: block;
					height: 50vh;
					${large(`
						height: 100vh;
					`)}
				}
				&__heading {
					display: grid;
					font-size: 3rem;
					font-family: 'Montserrat Alternates', sans-serif;
					${large(`
						font-size: 9rem;
					`)}
					background: linear-gradient(120deg, #000, #000 35%, #040035e8 70%, #a6004512 90%, #000);
					background-size: 200% auto;
					background-clip: text;
					-webkit-text-fill-color: transparent;
					animation: gradient 3s linear infinite;
					@keyframes gradient {
						to {
							background-position: 200% center;
						}
					}
				}
				&__title {
					&--${title.dev} {
						font-size: 0.6em;
					}
				}
			}
			.${classNames.term} {
				display: grid;
				padding: 2rem;
				grid-gap: 1rem;
				border: 2px solid;
				${large(`
					grid-template: 1fr/1fr auto;
				`)}
				dt {
					font-weight: 700;
				}
			}
			.${classNames.links} {
				&__buttons {
					display: grid;
					grid-auto-flow: row;
					grid-gap: 1rem;
					${large(`
						grid-auto-flow: column;
					`)}
				}
				& &__button {
					background: transparent;
					border: 2px solid;
					&:hover {
						background: #ffffff30;
					}
				}
			}
			.${classNames.coming} {
				text-align: center;
				display: grid;
				grid-gap: 1rem;
				&__large {
					font-size: 2rem;
				}
			}
			.${classNames.sponsors} {
				& &__list {
					${large(`
						margin: auto -9rem;
						margin-top: 6rem;
						grid-gap: 4rem 1rem;
					`)}
				}
			}
			a {
				color: white;
			}
			h1,
			p,
			dl,
			dd {
				margin: 0;
			}
		`}
		<body>
			<div class="${classNames.video}">
				<amp-video
					autoplay
					loop
					noaudio
					width="1920"
					height="1080"
					layout="fill"
					poster="//asset.devtoken.rocks/challenge/background.jpg"
				>
					<source
						src="//asset.devtoken.rocks/challenge/background.mp4"
						type="video/mp4"
					/>
					<div fallback>
						<p>This browser does not support the video element.</p>
					</div>
				</amp-video>
			</div>
			${ampAnalytics()} ${header()} ${nav()}
			<main class="${classNames.main}">
				${container(raw`
					<article>
						<header class="${classNames.hero}">
							<h1 class="${classNames.hero}__heading">
								<span
									class="${classNames.hero}__title ${classNames.hero}__title--${title.dev}">
									${title.dev}
								</span>
								<span
									class="${classNames.hero}__title ${classNames.hero}__title--${title.challenge}">
									${title.challenge}
								</span>
							</h1>
						</header>
						<section class="${classNames.coming}">
							<p>The developer reward program for protocol "Dev" for open source sustainability.</p>
							<p class="${classNames.coming}__large">Coming Soon</p>
						</section>
						<section>
							<h2>Term</h2>
							<dl class="${classNames.term}">
								<dt>Begin</dt>
								<dd>
									<time>2019-06-30 01:00:00 GMT+0900 (JST)</time>
								</dd>
								<dt>End</dt>
								<dd>
									<time>2019-06-30 01:00:00 GMT+0900 (JST)</time>
								</dd>
							</dl>
						</section>
						<section class="${classNames.links}">
							<h2>Links</h2>
							<div class="${classNames.links}__buttons">
								${button({
									link: 'https://hackmd.io/s/ByHi5zOiN',
									content: 'Whitepaper',
									target: '_blank',
									className: `${classNames.links}__button`
								})}
								${button({
									link: 'https://github.com/dev-protocol/repository-token',
									content: 'GitHub',
									target: '_blank',
									className: `${classNames.links}__button`
								})}
							</div>
						</section>
						<section class="${classNames.sponsors}">
							<h2>Sponsors for Dev</h2>
							${sponsorsLogos({ className: `${classNames.sponsors}__list` })}
						</section>
						<section>
							${whatsSponsors()}
						</section>
					</article>
				`)}
			</main>
			${footer()}
		</body>
	</html>
`
