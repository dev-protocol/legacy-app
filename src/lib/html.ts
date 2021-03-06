import { collapseWhitespace } from './collapse-whitespace'

export const html = async (strings: TemplateStringsArray, ...values) => {
	const resolved = await Promise.all<string>(
		values.map(async (value) =>
			// tslint:disable-next-line: no-unsafe-any
			typeof value === 'function' || value instanceof Function ? value() : value
		)
	)
	const resolvedLength = resolved.length
	const uni = await Promise.all(
		strings.map(async (n, i) => {
			const dn = resolved[i]
			return i >= resolvedLength ? n : `${n}${dn}`
		})
	)
	return collapseWhitespace(uni.join(''))
}
