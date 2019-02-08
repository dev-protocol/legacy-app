import { sponsors as _sponsors } from '../../../../store/sponsors'
import { svg } from './svg'
import { verifier } from '../../../../lib/verifier'

interface Opts {
	readonly id: string
}

export const sponsor = async ({ id }: Opts, sponsors = _sponsors) =>
	id
		? (identity => {
				const getSponsor = verifier(new Date(), sponsors)
				const data = getSponsor(identity)
				return data ? svg(data) : false
		  })(id)
		: false
