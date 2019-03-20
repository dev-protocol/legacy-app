import { SponsorTier } from '../store/sponsors'

const tiers = new Map([
	[10, 'gold'],
	[20, 'silver'],
	[30, 'bronze'],
	[50, 'supporters']
])

export const tierToSymbol = (tier: SponsorTier) =>
	tiers.has(tier) ? tiers.get(tier) : undefined
