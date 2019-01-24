import { IncomingMessage } from 'http'
import { amp as html } from '../../lib/amp'
import { html as raw } from '../../lib/html'
import { head } from '../../template/head'
import { config } from '../../config'
import { style } from '../../lib/style'
import { ampAnalytics } from '../../template/amp/amp-analytics'
import { header } from '../../template/header'
import { ampComponent } from '../../lib/amp-component'
import { docHeading } from '../../template/doc-heading'
import { docContent } from '../../template/doc-content'
import { nav } from '../../template/nav'
import { orange } from '../../style/color'
import { button } from '../../template/button'
import { footer } from '../../template/footer'
import { ampImage } from '../../template/amp/amp-image'

interface Opts {
	readonly request: IncomingMessage
}

const classNames = {
	linkBlog: 'link-blog',
	table: {
		header: 'table-columnheader',
		features: 'table-features',
		token: 'table-token'
	},
	restricted: 'restricted'
}

export const whatIsDev = async ({ request }: Opts) => html`
	<!DOCTYPE html>
	<html ⚡ lang="en">
		${
			await head({
				title: 'What is Dev?',
				description:
					'"Dev" is an ERC20 token for open source software (OSS) sustainability.',
				url: {
					host: config.domain,
					path: request.url
				},
				injection: await ampComponent('amp-iframe')
			})
		}
		${
			await style`
				body {
					background: black;
					color: white;
					font-family: 'Montserrat Alternates', sans-serif;
				}
				main {
				}
				a {
					color: white;
				}
				h1,
				h2,
				p {
					margin: 0;
				}
				h2 {
					text-align: center;
				}
				section {
					display: grid;
					grid-gap: 1rem;
				}
				[role=grid] {
					display: grid;
					grid-gap: 1rem;
					overflow: auto;
				}
				[role=rowgroup] {
					min-width: 600px;
					display: grid;
					grid-gap: 1rem;
				}
				[role=row] {
					display: grid;
					grid-auto-flow: column;
					grid-gap: 1rem;
				}
				[role=columnheader] {
				}
				[role=gridcell] {
					display: grid;
					grid-gap: 1rem;
				}
				.${classNames.table.header} {
					border-bottom: 0.5px solid white;
					color: #ffffffa3;
					padding: 1.5rem 0;
				}
				.${classNames.table.features} {
					[role=row] {
						grid-template-columns: 0.5fr 1fr 1fr;
					}
				}
				.${classNames.table.token} {
					[role=row] {
						grid-template-columns: 0.5fr 1fr;
					}
				}
				.${classNames.restricted} {
					padding: 1rem;
					color: black;
					background: ${orange};
					border-radius: 5px;
				}
				.${classNames.linkBlog} {
					justify-self: center;
				}
			`
		}
		<body>
			${await ampAnalytics()} ${await header()} ${await nav()}
			<main>
				${await docHeading({ title: 'What is Dev?' })}
				${
					await docContent({
						content: await raw`
							<section>
								<p>"Dev" is an ERC20 token for open source software (OSS) sustainability.</p>
								<p>After fairly evaluating OSS's influence, we will distribute a token proportionate to that value.</p>
								<p>We will transform the development of OSS — viewed as having a sustainability problem due to the difficulty of monetization — into something sustainable.</p>
								<p>Anyone can buy and sell tokens on EtherDelta.</p>
								${button({
									link: '//medium.com/devtoken/dev-tokens-for-oss-a63e55c60e6b',
									target: '_blank',
									className: classNames.linkBlog,
									content: 'Read about our approach'
								})}
								<div class="${
									classNames.restricted
								}">Currently "Dev" is an alpha version, some features are restricted.</div>
								<div role="grid" class="${classNames.table.features}">
									<div role="rowgroup">
										<div role="row" class="${classNames.table.header}">
											<div role="columnheader"></div>
											<div role="columnheader">Alpha</div>
											<div role="columnheader">Plan</div>
										</div>
									</div>
									<div role="rowgroup">
										<div role="row">
											<div role="gridcell">OSS</div>
											<div role="gridcell">npm</div>
											<div role="gridcell">More package managers</div>
										</div>
										<div role="row">
											<div role="gridcell">How to entry OSS</div>
											<div role="gridcell"><p>Send form of <a href=/doc/start>Start Now</a> page</p></div>
											<div role="gridcell">Web GUI</div>
										</div>
										<div role="row">
											<div role="gridcell">Token distribution destination</div>
											<div role="gridcell">One of the project owners ( First come, first served )</div>
											<div role="gridcell">One of the project owners, or distribution according to contribution degree to Contributor of GitHub.</div></div><div role="row" class="row"><div role="gridcell" class="gridcell column-index">Token distribution method</div><div role="gridcell" class="gridcell"><div class="rich-text-block-one-line w-richtext"><p>Calculated by <a href="https://github.com/frame00/dev-distribution" target="_blank">Node.js</a>, distributed by Metamask<br></p></div></div><div role="gridcell" class="gridcell">Full automation</div>
										</div>
									</div>
								</div>
							</section>
						`
					})
				}
				${
					await docContent({
						content: await raw`
							<section>
								<h2>How it works</h2>
								${ampImage({
									alt: 'Dev',
									src: '//asset.devtoken.rocks/doc/dev-schema--white.png',
									width: 3971,
									height: 3013,
									layout: 'responsive'
								})}
							</section>
						`
					})
				}
				${
					await docContent({
						content: await raw`
							<section>
								<h2>What does Dev resolve?</h2>
								<p>Ethereum and Bitcoin were also developed as OSS.</p>
								<p>Google and Facebook also use a lot of OSS. The influence of OSS now continues to grow in every area.</p>
								<p>However, many OSS developers are encountering OSS's sustainable development problem. Approximately 83% of OSS projects are unable to continue for more than one year, and approximately 50% are maintained by fewer than two contributors.</p>
								<p>Development is intensified by most OSS being released free of charge. However, because it is free of charge, sustainability problems arise.</p>
								<p>While there are also cases of monetization through the use of donation services, evaluation methods are highly arbitrary, and OSS is not evaluated as fairly as it might be.</p>
								<p>"Dev" supports OSS by fairly evaluating OSS's influence.</p>
								<p>We believe that, if we can boost the standards of OSS's sustainable development, we can also boost the speed of societal progress.</p>
							</section>
						`
					})
				}
				${
					await docContent({
						content: await raw`
							<section>
								<h2>Token details</h2>
								<div role="grid" class="${classNames.table.token}">
									<div role="rowgroup">
										<div role="row" class="${classNames.table.header}">
											<div role="columnheader"></div>
											<div role="columnheader">Specification</div>
										</div>
									</div>
									<div role="rowgroup">
										<div role="row">
											<div role="gridcell">Initial total sapply</div>
											<div role="gridcell">10,000,000</div>
										</div>
										<div role="row">
											<div role="gridcell">Mint</div>
											<div role="gridcell">10% every year</div>
										</div>
										<div role="row">
											<div role="gridcell">Distribution cycle to OSS</div>
											<div role="gridcell">20th of every month</div>
										</div>
										<div role="row">
											<div role="gridcell">Threshold for distribution to OSS</div>
											<div role="gridcell">Over 1,000,000 total downloads of all registered OSS for one month are required. If this threshold is not met, "Dev" will not be distributed.</div>
										</div>
										<div role="row">
											<div role="gridcell">Calculate distribution rate to OSS</div>
											<div role="gridcell">
												<p><em>pdl</em> = Download numbers the package, from the 20th day of the last month to the 19th day of the current month</p>
												<p><em>adl</em> = Download numbers across all packages registered on Dev, from the 20th day of the last month to the 19th day of the current month</p>
												<p><em>t</em> = Number of tokens retained by the distribution address</p>
												<p><em>d</em> = Number of days elapsed since the OSS registration</p>
												<p>p = <em>t / d</em></p>
												<p><em>ta</em> = Total of p for all addresses</p>
												<p><em>m</em> = Annual number of mints</p>
												<p><strong><em>x </em>= <em>(p + pdl) / (ta + adl) × m / 12</em></strong></p>
											</div>
										</div>
										<div role="row">
											<div role="gridcell">Contract code</div>
											<div role="gridcell">
												<a href="//etherscan.io/address/0x98626e2c9231f03504273d55f397409defd4a093#code" target="_blank" rel="noopener">Etherscan.io</a>
											</div>
										</div>
									</div>
								</div>
							</section>
						`
					})
				}
			</main>
			${await footer()}
		</body>
	</html>
`
