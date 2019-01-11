// tslint:disable:no-expression-statement
import test from 'ava'
import { collapseWhitespace } from './collapse-whitespace'
import { cutOutStyle } from './cut-out-style'
import { html } from './html'

test('Detach style tags from text', async t => {
	const result = cutOutStyle(
		await html`
			<!DOCTYPE html>
			<html ⚡ lang="en">
				<head></head>
				<style>
					body {
						color: black;
					}
				</style>
				<body>
					<style>
						main {
							color: blue;
						}
					</style>
					<main>
						<style>
							main p {
								color: red;
							}
						</style>
						<h1>The title</h1>
						<p>The content</p>
					</main>
				</body>
			</html>
		`
	)

	t.is(
		collapseWhitespace(result.styles),
		collapseWhitespace(`
			body {
				color: black;
			}
			main {
				color: blue;
			}
			main p {
				color: red;
			}
		`)
	)
	t.is(
		collapseWhitespace(result.content),
		collapseWhitespace(
			await html`
				<!DOCTYPE html>
				<html ⚡ lang="en">
					<head></head>
					<body>
						<main>
							<h1>The title</h1>
							<p>The content</p>
						</main>
					</body>
				</html>
			`
		)
	)
})
