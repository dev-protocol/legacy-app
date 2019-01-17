import { sponsor } from './sponsor'

interface Opts {
	readonly pathname: string
}

export const certification = async ({ pathname }: Opts) => {
	const [, , , feature] = pathname.split('/')
	return feature === 'sponsor' ? sponsor({ pathname }) : false
}
