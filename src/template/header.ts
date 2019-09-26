import { html } from '../lib/html'
import { style } from '../lib/style'
import { imageLogo } from './image-logo'
import { large } from '../style/large'
import { navId } from './nav'
import { button } from '../style/reset'
import { lightWhite } from '../style/color'
import { notifyNewVersion } from './notify-new-version'

interface Opts {
	readonly className?: string
}

export const toolbarTarget = 'toolbarTargetNav'

export const header = async ({ className = 'header' }: Opts = {}) =>
	html`
		${style`
			.${className} {
				display: grid;
				grid-auto-flow: column;
				align-items: center;
				justify-content: space-between;
				padding: 1rem;
				border-bottom: .5px solid ${lightWhite};
				${large(`
					padding: 2rem;
				`)}
				#${toolbarTarget} {
					& > * {
						display: grid;
						grid-auto-flow: column;
						align-items: center;
						grid-gap: 2rem;
					}
				}
				button {
					display: flex;
					flex-direction: column;
					justify-content: space-around;
					align-self: stretch;
					${button}
					span {
						display: block;
						width: 30px;
						height: 1px;
						background: white;
					}
					${large(`
						display: none;
					`)}
				}
				&__brand {
					display: inline-block;
					width: 50px;
					${large(`
						width: 70px;
					`)}
				}
			}
		`}
		${notifyNewVersion()}
		<header class="${className}">
			<a class="${className}__brand" href="/">${imageLogo()}</a>
			<div id="${toolbarTarget}"></div>
			<button on="tap:${navId}.toggle"><span></span> <span></span></button>
		</header>
	`
