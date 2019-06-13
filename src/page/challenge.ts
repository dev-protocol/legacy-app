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
	header: 'header',
	video: 'video',
	main: 'main',
	hero: 'hero',
	term: 'term',
	links: 'links',
	coming: 'coming',
	sponsors: 'sponsors',
	information: 'information'
}

const title = {
	dev: 'Dev',
	challenge: 'Challenge'
}

const random = (max: number, min = 0) =>
	Math.floor(Math.random() * (max + 1 - min)) + min

const frames = (steps: number, f: (i: number) => string, count = 0): string =>
	`${count * (100 / steps)}% {
		${f(count)}
	}
	${steps > count ? frames(steps, f, count + 1) : ''}`

const content = (str: string) => `
	content: '${str}';
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
`
export const challenge = async ({ request }: Opts) => html`
	<!DOCTYPE html>
	<html ⚡ lang="en">
		${head({
			title: 'Dev Challenge',
			description:
				'The Developer Reward Program For Protocol "Dev" For Open Source Sustainability.',
			image: '/challenge/og.png',
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
			.${classNames.header} {
				position: relative;
				z-index: 1;
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
					background-color: #0000004d;
					position: absolute;
					top: 0;
					left: 0;
					right: 0;
					bottom: 0;
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
				display: grid;
				grid-gap: 1rem;
				padding: 0 1rem;
				width: 100%;
				top: 0;
				left: 0;
				display: grid;
				justify-content: center;
				align-content: center;
				height: 50vh;
				box-sizing: border-box;
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
					${large(`
						font-size: 9rem;
					`)}
				}
				&__amount {
					display: inline-block;
					font-size: 2rem;
				}
				&__title {
					&--${title.dev} {
						animation: glitch-skew 1s infinite linear alternate-reverse;
						font-size: 0.6em;
						font-family: 'Montserrat Alternates', sans-serif;
						&::before{
							${content(title.dev)}
							left: 2px;
							text-shadow: -2px 0 #ff00c1;
							animation: glitchA 5s infinite linear alternate-reverse;
							${large(`
								animation-duration: 10s;
							`)}
						}
						&::after {
							${content(title.dev)}
							left: -2px;
							text-shadow: -2px 0 #00fff9, 2px 2px #ff00c1;
							animation: glitchB 1s infinite linear alternate-reverse;
							${large(`
								animation-duration: 2s;
							`)}
						}
					}
					&--${title.challenge} {
						animation: glitch-skew 1s infinite linear alternate-reverse;
						&::before{
							${content(title.challenge)}
							left: 2px;
							animation: glitchA 5s infinite linear alternate-reverse;
							${large(`
								animation-duration: 10s;
							`)}
						}
						&::after {
							${content(title.challenge)}
							left: -2px;
							animation: glitchB 1s infinite linear alternate-reverse;
							${large(`
								animation-duration: 2s;
							`)}
						}
						@keyframes glitchA {
							${frames(
								20,
								() =>
									`
								clip: rect(${random(200)}px, 9999px, ${random(200)}px, 0);
								transform: skew(${random(100) / 100}deg);
							`
							)}
						}
						@keyframes glitchB {
							${frames(
								20,
								() =>
									`
								clip: rect(${random(200)}px, 9999px, ${random(200)}px, 0);
								transform: skew(${random(100) / 100}deg);
							`
							)}
						}
						@keyframes glitch-skew {
							${frames(10, () => `transform: skew(${(random(10) - 5) / 3}deg);`)}
						}
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
			.${classNames.information} {
				padding: 0;
				a {
					font-weight: 600;
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
			${ampAnalytics()} ${header({ className: classNames.header })} ${nav()}
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
							<p>You can get tokens equivalent to the total prize money <span class="${
								classNames.hero
							}__amount">1 million JPY</span>.</p>
						</header>
						<section class="${classNames.coming}">
							<p>The developer reward program for protocol "Dev" for open source sustainability.</p>
							<p class="${classNames.coming}__large">Coming Soon</p>
						</section>
						<section>
							<h2>Information</h2>
							<ul class="${classNames.information}">
								<li>
									Whitepaper meetups in Tokyo: <a href="https://neutrino.connpass.com/event/132789/">24 June@Neutrino</a>, <a href="https://hashhub.connpass.com/event/134196/">27 June@HashHub</a>
								</li>
							</ul>
						</section>
						<section>
							<h2>Term</h2>
							<dl class="${classNames.term}">
								<dt>Begin</dt>
								<dd>
									<time>2019-07-01T00:00:00Z</time>
								</dd>
								<dt>End</dt>
								<dd>
									<time>2019-12-19T00:00:00Z</time>
								</dd>
							</dl>
							<p><small>This term may end early. For more information, see <a href="https://github.com/dev-protocol/repository-token/blob/master/DEV_CHALLENGE.md">GitHub</a>.</small></p>
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
