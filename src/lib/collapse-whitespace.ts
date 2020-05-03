export const collapseWhitespace = (str: string) =>
	str &&
	str
		.replace(/[ \n\r\t\f\xA0]+/g, (spaces) =>
			spaces === '\t' ? '\t' : spaces.replace(/(^|\xA0+)[^\xA0]+/g, '$1 ')
		)
		.replace(/^[ \n\r\t\f]+/, '')
		.replace(/[ \n\r\t\f]+$/, '')
