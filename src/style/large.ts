export const query = 'min-width: 768px'

export const large = (content: string) => `
	@media screen and (${query}) {
		${content}
	}
`
