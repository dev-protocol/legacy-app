export interface CacheControl {
	readonly public?: boolean
	readonly private?: boolean
	readonly noStore?: boolean
	readonly noCache?: boolean
	readonly maxAge?: number
	readonly sMaxage?: number
	readonly staleWhileRevalidate?: number
	readonly mustRevalidate?: boolean
}

const directive = <T>(
	key: string,
	value: T,
	schema: (k: string, v: T) => string | undefined = (k, v) => `${k}=${v}`
) => (value === undefined ? value : schema(key, value))

const booleanSchema = (k: string, v: boolean) => (v ? k : undefined)

export const cacheControl = ({
	public: pub,
	private: pri,
	noStore,
	noCache,
	maxAge,
	sMaxage,
	staleWhileRevalidate,
	mustRevalidate
}: CacheControl) => {
	const values: ReadonlyArray<string | undefined> = [
		directive('public', pub, booleanSchema),
		directive('private', pri, booleanSchema),
		directive('no-store', noStore, booleanSchema),
		directive('no-cache', noCache, booleanSchema),
		directive('max-age', maxAge),
		directive('s-maxage', sMaxage),
		directive('stale-while-revalidate', staleWhileRevalidate),
		directive('must-revalidate', mustRevalidate, booleanSchema)
	]
	return {
		'cache-control': values.filter(v => typeof v === 'string').join(', ')
	}
}
