// tslint:disable:no-expression-statement
import test from 'ava'
import { collapseWhitespace } from './collapse-whitespace'

test('Remove unnecessary whitespace from HTML', t => {
	const result = collapseWhitespace(`

		 <html> <head><title>The title</title></head>
          <body>
             <h1>The title\xA0</h1>
		  </body>
				</html>

		`)
	t.is(
		result,
		'<html> <head><title>The title</title></head> <body> <h1>The title\xA0</h1> </body> </html>'
	)
})
