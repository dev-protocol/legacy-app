import { getBalanceDev } from 'dev-distribution/src/libs'
import { AddressBalance } from 'dev-distribution/src/types'

const fetchDev = async (
	address?: string
): Promise<AddressBalance | undefined> =>
	address ? getBalanceDev(address) : undefined

export const getTokens = async (address?: string) => fetchDev(address)
