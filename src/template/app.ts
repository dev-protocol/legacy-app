import { html } from '../lib/html'
import { DistributionTarget, AddressBalance } from 'dev-distribution/src/types'

export const app = (pkg: DistributionTarget, account: AddressBalance) => html`
<p>${pkg.package}</p>
<p>${account.address}</p>
<p>${account.balance}</p>
`
