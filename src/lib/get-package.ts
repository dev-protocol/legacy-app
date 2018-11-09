import { DistributionTarget } from 'dev-distribution/src/types'
import { get } from 'request'

type DistributionTargets = ReadonlyArray<DistributionTarget>

const proto = 'https'

const fetchPackages = async (): Promise<DistributionTargets> =>
	new Promise<DistributionTargets>(resolve =>
		get(
			`${proto}://dev-distribution.now.sh/config/packages`,
			{ json: true },
			(_, __, body) => resolve(body)
		)
	)

export const getPackage = async (packageName?: string) => {
	const pkgs = await fetchPackages()
	return pkgs.find(p => p.package === packageName)
}
