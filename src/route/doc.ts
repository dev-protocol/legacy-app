import { IncomingMessage } from 'http'
import { howToUseMarkdownBadge } from '../page/doc/how-to-use-markdown-badge'

export const doc = async (pathname: string, request: IncomingMessage) => {
	const [, , name] = pathname.split('/')
	return name === 'how-to-use-markdown-badge'
		? howToUseMarkdownBadge({ request })
		: false
}
