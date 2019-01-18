// tslint:disable:no-expression-statement
import test from 'ava'
import { collapseWhitespace } from './collapse-whitespace'
import { html } from './html'

test('Create HTML strings with a template literals ', async t => {
	const htm = await html`
		<h1>The title</h1>
		<p>The content</p>
	`
	t.is(
		htm,
		collapseWhitespace(`
			<h1>The title</h1>
			<p>The content</p>
		`)
	)
})

test('Template including asynchronous part', async t => {
	const htm = await html`
		<h1>The title</h1>
		<p>${Promise.resolve('The content')}</p>
	`
	t.is(
		htm,
		collapseWhitespace(`
			<h1>The title</h1>
			<p>The content</p>
		`)
	)
})

test('Template including function part', async t => {
	const fn = () => 'The content'
	const htm = await html`
		<h1>The title</h1>
		<p>${fn}</p>
	`
	t.is(
		htm,
		collapseWhitespace(`
			<h1>The title</h1>
			<p>The content</p>
		`)
	)
})

test('Template including asynchronous function part', async t => {
	const fn = async () => 'The content'
	const htm = await html`
		<h1>The title</h1>
		<p>${fn}</p>
	`
	t.is(
		htm,
		collapseWhitespace(`
			<h1>The title</h1>
			<p>The content</p>
		`)
	)
})
