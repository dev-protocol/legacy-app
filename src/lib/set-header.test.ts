// tslint:disable:no-expression-statement
// tslint:disable:no-for-in
// tslint:disable-next-line:no-require-imports
import listen = require('test-listen')
import test from 'ava'
import micro, { send } from 'micro'
import { setHeader } from './set-header'
import { get } from 'request'

// tslint:disable-next-line:no-let
let url = ''
const server = micro((_, res) => {
	const response = setHeader(res, {
		'add-property': 'test'
	})
	send(response, 200, '').catch()
})

test.before(async () => {
	url = await listen(server)
})

test('Set the specified value in the response header', async t => {
	const { headers: result } = await new Promise(async resolve =>
		get(
			{
				url
			},
			(_, { headers }) => resolve({ headers })
		)
	)
	t.is(result['add-property'], 'test')
})

test.after(() => {
	server.close()
})
