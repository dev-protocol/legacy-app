import { parse } from 'accept-language-parser'

export const acceptLanguages = (al: string | undefined) =>
	al ? Array.from(new Set(parse(al).map(({ code }) => code))) : []
