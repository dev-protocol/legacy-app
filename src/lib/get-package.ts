import { DistributionTarget } from 'dev-distribution/src/types'
import { get } from './get'

type DistributionTargets = ReadonlyArray<DistributionTarget>

const fetchPackages = async () =>
	get<DistributionTargets>('//dev-distribution.now.sh/config/packages')

export const getPackage = async (packageName?: string) => {
	const pkgs = await fetchPackages()
	return pkgs.find(p => p.package === packageName)
}
