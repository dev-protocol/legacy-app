// tslint:disable:no-expression-statement
// tslint:disable:no-for-in
// tslint:disable-next-line:no-require-imports
import listen = require('test-listen')
import test from 'ava'
import micro, { send } from 'micro'
import { setHeader } from './set-header'
import { get } from 'request'

interface Headers {
	readonly [key: string]: string
}

const headersToBeAdded: Headers = {
	'cache-control':
		'public, s-maxage=86400, stale-while-revalidate=3600, must-revalidate'
}

// tslint:disable-next-line:no-let
let url = ''
const server = micro((_, res) => {
	const response = setHeader(res)
	send(response, 200, '')
})

test.before(async () => {
	url = await listen(server)
})

test('Set the specified value in the response header', async t => {
	const { headers: result } = await new Promise(resolve =>
		get(
			{
				url
			},
			(_, { headers }) => resolve({ headers })
		)
	)
	for (const key in headersToBeAdded) {
		t.is(result[key], headersToBeAdded[key])
	}
})

test.after(() => {
	server.close()
})
