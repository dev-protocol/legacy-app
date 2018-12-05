import { html } from './html'

export const ampComponent = async (name: string) =>
	html`
		<script
			async
			custom-element="${name}"
			src="https://cdn.ampproject.org/v0/${name}-0.1.js"
		></script>
	`
