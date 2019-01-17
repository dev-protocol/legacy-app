import { sponsors as _sponsors, Sponsors } from '../../../../store/sponsors'
import { svg } from './svg'
import { empty } from './empty'

interface Opts {
	readonly pathname: string
}

const verifier = (now: Date) => (id: string, sponsors: Sponsors) =>
	sponsors.find(s => id === s.id && now >= s.start_date && now <= s.expiry_date)

export const sponsor = async ({ pathname }: Opts, sponsors = _sponsors) => {
	const [, , , , id] = pathname.split('/')
	return id
		? (identity => {
				const getSponsor = verifier(new Date())
				const data = getSponsor(identity, sponsors)
				return data ? svg(data) : empty()
		  })(id)
		: false
}
