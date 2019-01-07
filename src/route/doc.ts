import { IncomingMessage } from 'http'
import { howToUseMarkdownBadge } from '../page/doc/how-to-use-markdown-badge'
import { start } from '../page/doc/start'
import { whatIsDev } from '../page/doc/what-is-dev'

export const doc = async (pathname: string, request: IncomingMessage) => {
	const [, , name] = pathname.split('/')
	return name === 'how-to-use-markdown-badge'
		? howToUseMarkdownBadge({ request })
		: name === 'start'
		? start({ request })
		: name === 'what-is-dev'
		? whatIsDev({ request })
		: false
}
