const reg = /(<style((?!>).)*>((?!<\/style>)[\s\S])*<\/style>)/g

export const cutOutStyle = (html: string) => ({
	styles: ((matches) =>
		matches
			? matches.map((i) => i.replace(/<\/?style((?!>).)*>/g, '')).join('')
			: '')(html.match(reg)),
	content: html.replace(reg, ''),
})
