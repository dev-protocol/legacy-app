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
import { orange } from '../../style/color'
import { nav } from '../../template/nav'
import { ampImage } from '../../template/amp/amp-image'

interface Opts {
	readonly request: IncomingMessage
}

const classNames = {
	badge: 'badge',
	sectionTitle: 'section-title'
}

const badge = async () => html`
	<li class="${classNames.badge}">
		<p>Please add a markdown badge to your README.md.</p>
		<div class="${classNames.badge}__how">
			<p>You can use the badge, such as the following.</p>
			${
				ampImage({
					alt: 'Dev',
					src: '//asset.devtoken.rocks/doc/markdown-badge.svg',
					width: 88.63,
					height: 20,
					layout: 'fixed'
				})
			}
			<p>
				💡
				<a href="/doc/how-to-use-markdown-badge">How to use markdown badge</a>.
			</p>
		</div>
	</li>
`

const placeholder = ampImage({
	alt: 'placeholder',
	width: 1,
	height: 1,
	layout: 'fill',
	src:
		'data:image/gif;base64,R0lGODlhAQABAIABAP///wAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==',
	attributes: ['placeholder']
})

export const start = async ({ request }: Opts) => html`
	<!DOCTYPE html>
	<html ⚡ lang="en">
		${
			await head({
				title: 'Start Dev',
				description: 'Start Dev',
				url: {
					host: config.domain,
					path: request.url
				},
				injection: await html`
					${ampComponent('amp-iframe')} ${ampComponent('amp-accordion')}
				`
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
				p {
					margin: 0;
				}
				amp-accordion {
					section {
						.${classNames.sectionTitle} {
							background: transparent;
							border: 0;
							padding: 1rem 0;
						}
						&:last-child {
							margin-top: 3rem;
						}
					}
				}
				ol {
					margin: 0;
					display: grid;
					padding: 0;
					grid-gap: 3rem;
					list-style: none;
					counter-reset: count;
					li {
						position: relative;
						padding-left: 2rem;
						display: grid;
						grid-gap: 1rem;
						&::before {
							content: counter(count);
							position: absolute;
							left: 0;
							counter-increment: count;
							font-weight: bolder;
							color: ${orange};
						}
					}
				}
				.${classNames.badge} {
					&__how {
						display: grid;
						grid-gap: 1rem;
						padding: 1rem;
						background: #607D8B;
						border-radius: 5px;
					}
				}
			`
		}
		<body>
			${await ampAnalytics()} ${await header()} ${await nav()}
			<main>
				${await docHeading({ title: 'Register Your OSS and Start Dev' })}
				${
					await docContent({
						content: await raw`
							<amp-accordion>
								<section expanded>
									<h2 class="${
										classNames.sectionTitle
									}">a. Bulk register all OSSs using npm read-only token.</h2>
									<div>
										<ol>
											<li>
												Please entry and submit the following form.
												<amp-iframe
													src="https://docs.google.com/forms/d/e/1FAIpQLSdwDVAgKdrmNosAsdPit2CTiX3z7kPP6komWqFB5TJN__9WeQ/viewform?embedded=true"
													width="640"
													height="640"
													layout="responsive"
													sandbox="allow-scripts allow-same-origin"
												>
												${placeholder}
												</amp-iframe>
												<p>When OSSs registration is completed, we will contact you by email. Then please delete the read-only token.</p>
											</li>
											${await badge()}
											<li>
												Congratulations!🎉 You can get Dev on the 20th of every month.
											</li>
										</ol>
									</div>
								</section>
								<section>
									<h2 class="${
										classNames.sectionTitle
									}">b. Register your specified OSSs using email authentication.</h2>
									<div>
										<ol>
											<li>
												Please entry and submit the following form.
												<amp-iframe
													src="https://docs.google.com/forms/d/e/1FAIpQLSct3glMzEebDeqgCKNCLxyAY0xxcJNoPWoK2awFNQS5a-s9rA/viewform?embedded=true"
													width="640"
													height="640"
													layout="responsive"
													sandbox="allow-scripts allow-same-origin"
												>
												${placeholder}
												</amp-iframe>
											</li>
											<li>
												Confirmation email is sent to email address. Once you click the
												link, confirmation is complete.
											</li>
											${await badge()}
											<li>
												Congratulations!🎉 You can get Dev on the 20th of every month.
											</li>
										</ol>
									</div>
								</section>
							</amp-accordion>
						`
					})
				}
			</main>
		</body>
	</html>
`
