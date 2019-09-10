import { html } from '../lib/html'
import { style } from '../lib/style'
import { fetchPackages } from '../lib/get-package'
import { asyncMap } from '../lib/async-map'
import { sortBy } from 'lodash'

interface Opts {
	readonly className?: string
}

export const osss = async ({ className = 'oss-list' }: Opts = {}) =>
	(async pkgs => html`
		${await style`
				.${className} {
					display: grid;
					grid-template-columns: repeat(2, 1fr);
					grid-gap: 3rem;
					word-break: break-all;
					& &__pkg {
						text-decoration: none;
					}
				}
			`}
		<div class="${className}">
			${await asyncMap(
				sortBy(pkgs.body, o => o.package.replace('@', '')).map(
					async pkg => html`
						<a class="${className}__pkg" href="/package/${pkg.package}"
							>${pkg.package}</a
						>
					`
				)
			)}
		</div>
	`)(await fetchPackages())
