import { sponsor } from './sponsor'

interface Opts {
	readonly pathname: string
}

export const certification = async ({ pathname }: Opts) => {
	const [, , , feature, name] = pathname.split('/')
	return feature === 'sponsor' ? sponsor({ id: name }) : false
}
