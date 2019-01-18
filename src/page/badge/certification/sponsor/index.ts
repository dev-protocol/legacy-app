import { sponsors as _sponsors, Sponsors } from '../../../../store/sponsors'
import { svg } from './svg'

interface Opts {
	readonly id: string
}

const verifier = (now: Date) => (id: string, sponsors: Sponsors) =>
	sponsors.find(s => id === s.id && now >= s.start_date && now <= s.expiry_date)

export const sponsor = async ({ id }: Opts, sponsors = _sponsors) =>
	id
		? (identity => {
				const getSponsor = verifier(new Date())
				const data = getSponsor(identity, sponsors)
				return data ? svg(data) : false
		  })(id)
		: false
