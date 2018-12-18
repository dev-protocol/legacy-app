import { IncomingMessage } from 'http'
import { own } from './own'

interface Opts {
	readonly pathname: string
	readonly request: IncomingMessage
}

export const pkg = async ({ pathname, request }: Opts) => {
	const [, , , feature] = pathname.split('/')
	return feature === 'own' ? own({ pathname, request }) : false
}
