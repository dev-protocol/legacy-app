import { html } from '../lib/html'
import { style } from '../lib/style'
import { button } from './button'
import { toolbarTarget } from './header'
import { gradientDev } from '../style/color'
import { query, large } from '../style/large'
import { button as reset } from '../style/reset'

interface Opts {
	readonly className?: string
}

export const navId = 'nav'

export const nav = async ({ className = 'nav' }: Opts = {}) =>
	html`
		${
			await style`
			#${navId} {
				display: grid;
				width: 100%;
				grid-auto-flow: row;
				background: black;
				align-content: baseline;
				padding: 1rem;
				box-sizing: border-box;
				&[open] {
					box-shadow: black 0px 0px 50px 50px;
				}
				button {
					${reset}
					height: 30px;
					justify-self: end;
					span {
						display: block;
						width: 30px;
						height: 1px;
						background: white;
						&:first-child {
							transform: rotate(45deg);
						}
						&:last-child {
							transform: rotate(-45deg);
						}
					}
				}
			}
			.${className} {
				display: grid;
				justify-content: center;
				padding-right: 20vw;
				${large(`
					padding-right: 0;
				`)}
				ul {
					margin: 0;
					padding: 0;
					list-style: none;
				}
				& &__start {
					padding: 0.5rem 1rem;
					background-image: ${gradientDev};
					font-weight: bolder;
				}
			}
	`
		}

		<amp-sidebar id="${navId}" layout="nodisplay" side="right">
			<button on="tap:${navId}.close"><span></span> <span></span></button>
			<nav
				class="${className}"
				toolbar="(${query})"
				toolbar-target="${toolbarTarget}"
			>
				<ul>
					<li>
						${
							await button({
								link: '/doc/start',
								content: 'Start Now',
								className: `${className}__start`
							})
						}
					</li>
				</ul>
			</nav>
		</amp-sidebar>
	`
