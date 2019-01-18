import { IncomingMessage } from 'http'
import { howToUseMarkdownBadge } from '../page/doc/how-to-use-markdown-badge'
import { start } from '../page/doc/start'
import { whatIsDev } from '../page/doc/what-is-dev'

export const doc = async (pathname: string, request: IncomingMessage) => {
	const [, , name] = pathname.split('/')
	const body =
		name === 'how-to-use-markdown-badge'
			? await howToUseMarkdownBadge({ request })
			: name === 'start'
			? await start({ request })
			: name === 'what-is-dev'
			? await whatIsDev({ request })
			: false
	return body
		? {
				body,
				status: 200
		  }
		: {
				status: 404
		  }
}
