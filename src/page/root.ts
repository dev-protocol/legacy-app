import { amp as html } from '../lib/amp'
import { IncomingMessage } from 'http'
import { style } from '../lib/style'
import { config } from '../config'
import { head } from '../template/head'
import { ampAnalytics } from '../template/amp/amp-analytics'
import { header } from '../template/header'
import { button } from '../template/button'
import { footer } from '../template/footer'
import { large } from '../style/large'
import { orange, gradientDev } from '../style/color'
import { nav } from '../template/nav'
import { ampImage } from '../template/amp/amp-image'

interface Opts {
	readonly request: IncomingMessage
}

const classNames = {
	content: 'content',
	heading: 'heading',
	howItWorks: 'how-it-works',
	exchange: 'exchange',
	community: 'community',
	button: 'button',
	team: 'team'
}

const avatar = (src: string, alt: string) => ampImage({src, alt, width: 1, height:1, layout: 'responsive'})
const iconTwitter = () => ampImage({src: '/public/lp/icon/twitter.svg', alt: 'Twitter', width: 1, height:1, layout: 'responsive'})

export const root = async ({ request }: Opts) => html`
	<!DOCTYPE html>
	<html ⚡ lang="en">
		${head({
			title: '',
			description:
				'Dev is an ERC20 token for open source sustainability. Dev will monetize open source.',
			image: '/lp/code-as-life.png',
			url: {
				host: config.domain,
				path: request.url
			},
			injection: style`
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
			h3,
			p {
				margin: 0;
			}
			h1,
			h2 {
				margin-bottom: 3rem;
			}
			h2 {
				font-weight: normal
			}
			main {
				display: grid;
				grid-gap: 2rem;
				justify-content: stretch;
				justify-items: center;
				margin-bottom: 4rem;
				${large(`
					grid-gap: 5rem;
				`)}
			}
			section {
				display: grid;
				width: 100%;
				max-width: 1600px;
				padding: 3rem 0;
				justify-content: center;
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
					justify-items: baseline;
				}
				& figure {
					grid-area: figure;
				}
				& .${classNames.button} {
					justify-self: normal;
					text-align: center;
					font-weight: bold;
					background-image: ${gradientDev};
				}
				h1 {
					font-size: 2rem;
					justify-self: center;
					${large(`
						font-size: 3rem;
						justify-self: baseline;
					`)}
				}
			}
			.${classNames.exchange} {
				align-items: center;
				grid-gap: 5rem;
				justify-content: center;
				justify-items: center;
				h2 {
					margin: 0;
				}
				a {
					display: grid;
					grid-gap: 1rem;
					grid-auto-flow: column;
					align-items: center;
					text-decoration: none;
					font-size: 2rem;
				}
			}
			.${classNames.howItWorks} {
				justify-content: center;
				h2 {
					text-align: center;
				}
				& .${classNames.content} {
					margin: auto;
					max-width: 580px;
					justify-items: baseline;
				}
				ul {
					display: grid;
					justify-items: center;
					margin: 0;
					padding: 0;
					list-style: none;
					font-size: 0.8rem;
					${large(`
						font-size: 1rem;
					`)}
					li {
						span {
							display: inline-block;
							padding: 0.2rem 0.4rem;
							background: ${orange};
							border-radius: 5px;
							color: black;
						}
					}
				}
				& &__start {
					&::after {
						content: '';
						display: block;
						margin: 1rem;
						height: 60px;
						background-image: url(/public/lp/arrow.svg);
						background-position: center;
						background-repeat: no-repeat;
					}
				}
				& &__cycle {
					align-items: center;
					text-align: center;
					padding: 6rem 0;
					grid-template-columns: repeat(2, 1fr);
					background-image: url(/public/lp/cycle.svg);
					background-position: center;
					background-repeat: no-repeat;
					background-size: contain;
					li {
						background: black;
						padding: 0.5rem;
					}
				}
			}
			.${classNames.community} {
				align-items: center;
				grid-gap: 2rem;
				justify-content: center;
				justify-items: center;
				${large(`
					grid-gap: 5rem;
				`)}
				& h2 {
					margin: 0;
					text-align: center;
				}
				& &__button {
					&--spectrum {
						background-image: linear-gradient(120deg, #3a18e6, #7c15ff);
					}
					&--discord {
						background-color: #7289DA;
					}
				}
			}
			.${classNames.team} {
				text-align: center;
				& .content {
					justify-items: center;
				}
				&__persons {
					display: grid;
					grid-gap: 3rem;
					padding: 0 2rem;
					${large(`
						grid-auto-flow: column;
						grid-template-columns: repeat(3, 1fr);
					`)}
				}
				&__person {
					display: grid;
					grid-gap: 0.8rem;
					justify-items: center;
					align-content: baseline;
				}
				a {
					width: 50px;
				}
				figure {
					width: 90px;
					position: relative;
					border-radius: 50%;
					overflow: hidden;
				}
			}
		`
		})}
		<body>
			${ampAnalytics()} ${header()} ${nav()}
			<main>
				<section class="${classNames.heading}">
					<div class="${classNames.content}">
						<h1>Code as Life</h1>
						<p>Dev is an ERC20 token for open source sustainability.</p>
						<p>Dev will monetize open source.</p>
						<p>
							Anyone can start without changing licenses, codes, and support.
						</p>
						<p>Just publish your open source to npm.</p>
						${button({
							link: '/doc/start',
							content: 'Start Now',
							className: classNames.button
						})}
					</div>
					<figure>
						${ampImage({
							alt: 'image',
							src: '/public/lp/cover.png',
							width: 2000,
							height: 1177,
							layout: 'responsive'
						})}
					</figure>
				</section>
				<section class="${classNames.howItWorks}">
					<div>
						<h2>How it works</h2>
						<ul>
							<li class="${classNames.howItWorks}__start">Register OSS</li>
							<ul class="${classNames.howItWorks}__cycle">
								<li>
									<p><span>20th of every month</span></p>
									<p>"Dev" is automatically added to your wallet.</p>
								</li>
								<li>Exchange to another token</li>
							</ul>
						</ul>
						<div class="${classNames.content}">
							<p>"Dev" works to achieve fair monetization of your OSS.</p>
							<p>Neither commission fees nor usage fees are required.</p>
							<p>
								For details, please see the
								<a
									href="https://medium.com/devtoken/dev-tokens-for-oss-a63e55c60e6b"
									target="_blank"
									>blog story</a
								>.
							</p>
						</div>
					</div>
				</section>
				<section class="${classNames.community}">
					<h2>Join our communities</h2>
					<div class="${classNames.content}">
						${button({
							link: 'https://spectrum.chat/devtoken',
							content: 'Spectrum',
							target: '_blank',
							className: `${classNames.community}__button--spectrum`
						})}
						${button({
							link: 'https://discord.gg/VwJp4KM',
							content: 'Discord',
							target: '_blank',
							className: `${classNames.community}__button--discord`
						})}
					</div>
				</section>
				<section class="${classNames.exchange}">
					<h2>Exchange</h2>
					<a href="//uniswap.exchange/swap" target="_blank" rel="noopener">
						🦄 Uniswap
					</a>
				</section>
				<section class="${classNames.team}">
					<div>
						<h2>Team</h2>
						<div class="${classNames.team}__persons">
							<div class="${classNames.team}__person">
								<h3>Mayumi Hara</h3>
								<figure>
									${avatar('/public/lp/avatar/mayumi.jpg', 'Mayumi Hara')}
								</figure>
								<p class="${classNames.team}__job">CEO</p>
								<a href="//twitter.com/yume_mayu" target="_blank">
									${iconTwitter()}
								</a>
							</div>
							<div class="${classNames.team}__person">
								<h3>aggre</h3>
								<figure>
									${avatar('/public/lp/avatar/aggre.jpg', 'aggre')}
								</figure>
								<p class="${classNames.team}__job">CTO</p>
								<a href="//twitter.com/aggre_" target="_blank">
									${iconTwitter()}
								</a>
							</div>
							<div class="${classNames.team}__person">
								<h3>Mariko Miyamoto</h3>
								<figure>
									${avatar('/public/lp/avatar/mariko.png', 'mariko')}
								</figure>
								<p class="${classNames.team}__job">COO</p>
							</div>
						</div>
					</div>
				</section>
			</main>
			${footer()}
		</body>
	</html>
`
