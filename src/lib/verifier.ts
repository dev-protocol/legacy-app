import { Sponsors } from '../store/sponsors'

export const verifier = (now: Date, sponsors: Sponsors) => (id: string) =>
	sponsors.find(
		(s) => id === s.id && now >= s.start_date && now <= s.expiry_date
	)
