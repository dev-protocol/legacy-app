import { html } from '../lib/html'

const opts = {
	vars: {
		account: 'UA-67415117-12'
	},
	triggers: {
		trackPageview: {
			on: 'visible',
			request: 'pageview'
		}
	}
}

export const ampAnalytics = async () => html`
	<amp-analytics type="googleanalytics">
		<script type="application/json">
			${JSON.stringify(opts)}
		</script>
	</amp-analytics>
`
