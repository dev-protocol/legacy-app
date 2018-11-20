import { DistributionTarget, AddressBalance } from 'dev-distribution/src/types'
import { html } from '../lib/html'
import { style } from '../lib/style'

export const packageInfo = async (
	pkg: DistributionTarget,
	account: AddressBalance
) =>
	html`
		${await style`
			h1 {
				font-weight: 600;
			}
			.package-info {
				display: grid;
				grid-gap: 1rem;
			}
		`}

		<div class=package-info>
			<h1>${pkg.package}</h1>
			<p>${account.address}</p>
			<p>${account.balance}</p>
		</div>
	`
