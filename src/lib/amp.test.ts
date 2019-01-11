// tslint:disable:no-expression-statement
import test from 'ava'
import { amp as html } from './amp'

const boilerplate =
	'<style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>'

test('Inject amp-boilerplate', async t => {
	const result = await html`
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
	t.true(result.replace(/.*<head>(.*)<\/head>.*/, '$1').includes(boilerplate))
})

test('Inject AMP script', async t => {
	const result = await html`
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
	t.true(
		result
			.replace(/.*<head>(.*)<\/head>.*/, '$1')
			.includes(
				'<script async src="https://cdn.ampproject.org/v0.js"></script>'
			)
	)
})

test('Integrate style tags as amp-custom and apply cssnano', async t => {
	const result = await html`
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
	t.true(
		result
			.replace(/.*<head>(.*)<\/head>.*/, '$1')
			.includes(
				'<style amp-custom>body{color:#000}main{color:#00f}main p{color:red}</style>'
			)
	)
	t.false(result.replace(/.*<body>(.*)<\/body>.*/, '$1').includes('<style>'))
})
