import { DistributionTarget, AddressBalance } from 'dev-distribution/src/types'
import { html } from '../lib/html'
import { style } from '../lib/style'

export const packageInfo = (pkg: DistributionTarget, account: AddressBalance) =>
	html`
		${style`
			h1 {
				font-weight: 600;
			}
		`}

		<h1>${pkg.package}</h1>
		<p>${account.address}</p>
		<p>${account.balance}</p>
	`
