import { html } from '../lib/html'
import { style } from '../lib/style'
import { imageLogo } from './image-logo'
import { container } from './container'
import { asyncMap } from '../lib/async-map'
import { button } from './button'
import { large } from '../style/large'
import { lightWhite } from '../style/color'

interface Opts {
	readonly className?: string
}

const forInvestor = 'for-investor'

interface Link {
	readonly label: string
	readonly link: string
	readonly someOrigin?: boolean
}

const navs: ReadonlyArray<Link> = [
	{
		label: 'Twitter',
		link: 'https://twitter.com/devtoken_rocks',
		someOrigin: false
	},
	{
		label: 'Spectrum',
		link: 'https://spectrum.chat/devtoken',
		someOrigin: false
	},
	{
		label: 'Discord',
		link: 'https://discord.gg/VwJp4KM',
		someOrigin: false
	},
	{
		label: 'Blog',
		link: 'https://medium.com/devtoken',
		someOrigin: false
	},
	{
		label: 'Media Kit',
		link:
			'https://www.dropbox.com/sh/t7d9u5li054tu4d/AABuD8_CTalbwzbCr2luqWo0a?dl=0',
		someOrigin: false
	},
	{
		label: 'FRAME00, INC.',
		link: 'https://corp.frame00.com',
		someOrigin: false
	}
]

export const footer = async ({ className = 'footer' }: Opts = {}) =>
	html`
		${await style`
			.${className} {
				border-top: .5px solid ${lightWhite};
				font-size: 0.9rem;
				p {
					margin: 0;
				}
				&__wrap {
					display: grid;
					grid-gap: 3rem;
					justify-content: center;
					${large(`
						justify-items: center;
					`)}
				}
				&__brand {
					display: grid;
					grid-gap: 1rem;
				}
				ul {
					margin: 0;
					padding: 0;
					list-style: none;
					display: grid;
					grid-gap: 1rem;
					${large(`
						grid-auto-flow: column;
						grid-gap: 3rem;
					`)}
					a {
						text-decoration: none;
					}
				}
				.${forInvestor} {
					background: #333;
					font-weight: bolder;
				}
			}
		`}
		<footer class="${className}">
			${container(
				await html`
					<div class="${className}__wrap">
						<div class="${className}__brand">
							<p><a href="//devtoken.rocks/alpha/en">${imageLogo()}</a></p>
							<p>Tokens for OSS sustainability</p>
						</div>
						<nav>
							<ul>
								${asyncMap(
									navs.map(
										async nav => html`
											<li>
												<a
													href="${nav.link}"
													target="${nav.someOrigin ? '_self' : '_blank'}"
												>
													${nav.label}
												</a>
											</li>
										`
									)
								)}
							</ul>
						</nav>
						${button({
							link: 'mailto:investor@frame00.com',
							content: 'For investor',
							className: forInvestor
						})}
					</div>
				`
			)}
		</footer>
	`
