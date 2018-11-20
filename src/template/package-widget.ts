import { DistributionTarget, AddressBalance } from 'dev-distribution/src/types'
import { html } from '../lib/html'
import { style } from '../lib/style'
import { toDataURL } from 'qrcode'

const cls = 'package-info'

export const packageInfo = async (
	pkg: DistributionTarget,
	account: AddressBalance
) =>
	html`
		${await style`
			.${cls} {
				display: grid;
				grid-gap: 1rem;
				justify-content: center;
				text-align: center;
				& .balance {
					font-weight: bold;
					display: grid;
					& .tokens {
						font-size: 1.4rem;
					}
				}
			}
		`}

		<div class='${cls}'>
			<h1>${pkg.package}</h1>
			<p class='balance'>
				<span>has</span>
				<span class=tokens>${account.balance}</span>
				<span>Dev</span>
			</p>
			<amp-img alt='QR Code of ${pkg.package} address'
				src='${await toDataURL(pkg.address, {
					width: 500,
					rendererOpts: {
						quality: 1
					}
				})}'
				width=100
				height=100
				layout=responsive>
			</amp-img>
			<code>${account.address}</code>
		</div>
	`
