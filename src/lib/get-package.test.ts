// tslint:disable:no-expression-statement no-unsafe-any
import test from 'ava'
import { get } from 'request'
import { getPackage, fetchPackages } from './get-package'
import { DistributionTarget } from 'dev-distribution/src/types'

test('Get package list of Dev', async t => {
	const [expected, result] = await Promise.all([
		new Promise<ReadonlyArray<DistributionTarget>>(resolve =>
			get(
				{ uri: 'https://dev-distribution.now.sh/config/packages', json: true },
				(_, __, body) => {
					resolve(body)
				}
			)
		),
		fetchPackages()
	])
	t.deepEqual(expected, result.body)
})

test('Get a package information of Dev', async t => {
	const [all, result] = await Promise.all([
		new Promise<ReadonlyArray<DistributionTarget>>(resolve =>
			get(
				{ uri: 'https://dev-distribution.now.sh/config/packages', json: true },
				(_, __, body) => {
					resolve(body)
				}
			)
		),
		getPackage('chalk')
	])
	const expected = all.find(p => p.package === 'chalk')
	t.deepEqual(expected, result)
})
