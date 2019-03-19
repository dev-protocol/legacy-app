import { html } from '../lib/html'
import { style } from '../lib/style'
import { asyncMap } from '../lib/async-map'
import { bronze, gold, silver } from '../style/color'
import { SponsorTier } from '../store/sponsors'
import { tierToSymbol } from '../lib/tier-to-symbol'
import { large } from '../style/large'
import { button } from './button'

interface Opts {
	readonly className?: string
}

type Tiers = ReadonlyArray<SponsorTier>

const tiers: Tiers = [10, 20, 30]

export const whatsSponsors = async ({
	className = 'whats-sponsors'
}: Opts = {}) => html`
	${
		style`
			.${className} {
				text-align: center;
				&__tiers {
					display: grid;
					grid-auto-flow: column;
					grid-gap: 1rem;
					align-items: center;
					justify-items: center;
					${large(`
						grid-gap: 4rem;
						max-width: 500px;
						margin: auto;
					`)}
				}
				&__tier {
					position: relative;
					display: flex;
					justify-content: center;
					align-items: center;
					border-radius: 50%;
					text-transform: capitalize;
					font-weight: 700;
					&::after {
						content: '';
						display: block;
						padding-top: 100%;
					}
					& span {
						position: absolute;
					}
					&--gold {
						background: ${gold};
						color: black;
						width: 100%;
					}
					&--silver {
						background: ${silver};
						color: black;
						width: 90%;
					}
					&--bronze {
						background: ${bronze};
						width: 80%;
					}
				}
				&__desc {
					margin-bottom: 2rem;
					font-weight: 700;
				}
				& &__get-in-touch {
					margin-top: 2rem;
					background: linear-gradient(135deg, #FFC107 0%, #FF5722 100%);
				}
			}
			`
	}
	<div class="${className}">
		<div class="${className}__desc">
			<p>Fruition sustainable open source and enhance the world!</p>
			<p>You can choose 3 plans and put the logo here.</p>
		</div>
		<div class="${className}__tiers">
			${
				asyncMap(
					tiers.map(async tier =>
						(async label => html`
							<div class="${className}__tier ${className}__tier--${label}">
								<span>${label}</span>
							</div>
						`)(tierToSymbol(tier))
					)
				)
			}
		</div>
		<div>
			${
				button({
					className: `${className}__get-in-touch`,
					link:
						'mailto:hi@devtoken.rocks?subject=Sponsorship&body=<English or 日本語>',
					content: 'Get in touch with us'
				})
			}
		</div>
	</div>
`
