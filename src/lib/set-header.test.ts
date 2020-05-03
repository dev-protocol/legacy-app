// tslint:disable:no-expression-statement no-for-in no-require-imports no-unsafe-any
import listen = require('test-listen')
import test from 'ava'
import micro, { send } from 'micro'
import { setHeader } from './set-header'
import { get } from 'request'

// tslint:disable-next-line:no-let
let url = ''
const server = micro(async (_, res) => {
	const response = setHeader(res, {
		'add-property': 'test',
	})
	// tslint:disable-next-line: no-try
	try {
		await send(response, 200, '')
	} catch (error) {
		console.log(error)
	}
})

test.before(async () => {
	url = await listen(server)
})

test('Set the specified value in the response header', async (t) => {
	const { headers: result } = await new Promise(async (resolve) =>
		get(
			{
				url,
			},
			(_, { headers }) => {
				resolve({ headers })
			}
		)
	)
	t.is(result['add-property'], 'test')
})

test.after(() => {
	server.close()
})
