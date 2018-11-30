import { DistributionTarget, AddressBalance } from 'dev-distribution/src/types'
import { html } from '../lib/html'
import { style } from '../lib/style'
import { toDataURL } from 'qrcode'
import { large } from '../style/large'

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
				text-align: center;
				word-break: break-all;
				&__heading {
					font-size: 4rem;
				}
				&__qr {
					max-width: 290px;
				}
				&__heading,
				&__barance {
					margin: 0;
				}
				&__barance {
					font-weight: bold;
					display: grid;
					& .tokens {
						font-size: 1rem;
						${large(`
							font-size: 1.4rem;
						`)}
					}
				}
			}
		`}

		<div class='${className}'>
			<h1 class='${className}__heading'>${pkg.package}</h1>
			<p class='${className}__barance'>
				<span>has</span>
				<span class=tokens>${account.balance}</span>
				<span>Dev</span>
			</p>
			<amp-img
				class='${className}__qr'
				alt='QR Code of ${pkg.package} address'
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
			<code class='${className}__address'>${account.address}</code>
		</div>
	`
