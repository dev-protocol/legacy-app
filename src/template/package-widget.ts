import { DistributionTarget, AddressBalance } from 'dev-distribution/src/types'
import { html } from '../lib/html'
import { style } from '../lib/style'
import { toDataURL } from 'qrcode'
import { large } from '../style/large'
import { container } from './container'

interface Opts {
	readonly package: DistributionTarget
	readonly account: AddressBalance
	readonly className?: string
}

export const packageInfo = async ({
	package: pkg,
	account,
	className = 'package-info'
}: Opts) =>
	html`
		${await style`
			.${className} {
				display: grid;
				grid-gap: 1rem;
				justify-content: center;
				word-break: break-all;
				grid-template-areas:
					'tokens tokens'
					'address address';
				${large(`
					grid-template-areas: 'tokens address';
					grid-template-columns: 1fr auto;
				`)}
				&__tokens {
					grid-area: tokens;
				}
				&__address {
					grid-area: address;
					justify-self: center;
					width: 250px;
					text-align: center;
				}
				&__heading {
					margin: 0;
					font-size: 2rem;
					text-align: center;
					${large(`
						font-size: 3rem;
						text-align: left;
					`)}
				}
				&__qr {
					max-width: 290px;
					border-radius: 20px;
				}
				&__definition-list {
					display: grid;
					grid-gap: 1rem;
					grid-template: auto / auto 1fr;
					font-size: 0.8rem;
					${large(`
						font-size: 1rem;
					`)}
					& dd {
						margin: 0;
					}
				}
			}
		`}

		${container(
			await html`
			<div class='${className}'>
				<div class='${className}__tokens'>
					<h1 class='${className}__heading'>
						${pkg.package} uses Dev.
					</h1>
					<p>${pkg.package} welcomes your donation by Dev.</p>
					<dl class='${className}__definition-list'>
						<dt>Balance</dt>
						<dd><code>${account.balance} DEV</code></dd>
						<dt>Address</dt>
						<dd><code>${account.address}</code></dd>
					</dl>
				</div>
				<div class='${className}__address'>
					<amp-img
						class='${className}__qr'
						alt='QR Code of ${pkg.package} address'
						src='${await toDataURL(pkg.address, {
							width: 500,
							rendererOpts: {
								quality: 1
							}
						})}'
						width=1
						height=1
						layout=responsive>
					</amp-img>
					<p><small>Copy addresses with QR</small></p>
				</div>
			</div>
		`
		)}
	`
