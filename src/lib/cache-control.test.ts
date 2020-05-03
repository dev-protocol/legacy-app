// tslint:disable:no-expression-statement
import test from 'ava'
import { cacheControl } from './cache-control'

test('Make the properties a string and returns the cache-control header map', (t) => {
	t.deepEqual(
		cacheControl({
			public: true,
			maxAge: 3600,
			sMaxage: 86400,
			mustRevalidate: true,
		}),
		{
			'cache-control': 'public, max-age=3600, s-maxage=86400, must-revalidate',
		}
	)
})

test('When "public" is true, public directive is enabled', (t) => {
	t.deepEqual(cacheControl({ public: true }), {
		'cache-control': 'public',
	})
	t.deepEqual(cacheControl({ public: false }), {
		'cache-control': '',
	})
})

test('When "private" is true, private directive is enabled', (t) => {
	t.deepEqual(cacheControl({ private: true }), {
		'cache-control': 'private',
	})
	t.deepEqual(cacheControl({ private: false }), {
		'cache-control': '',
	})
})

test('When "noStore" is true, no-store directive is enabled', (t) => {
	t.deepEqual(cacheControl({ noStore: true }), {
		'cache-control': 'no-store',
	})
	t.deepEqual(cacheControl({ noStore: false }), {
		'cache-control': '',
	})
})

test('When "noCache" is true, no-cache directive is enabled', (t) => {
	t.deepEqual(cacheControl({ noCache: true }), {
		'cache-control': 'no-cache',
	})
	t.deepEqual(cacheControl({ noCache: false }), {
		'cache-control': '',
	})
})

test('When "maxAge" is numeric, max-age directive is enabled', (t) => {
	t.deepEqual(cacheControl({ maxAge: 1 }), {
		'cache-control': 'max-age=1',
	})
	t.deepEqual(cacheControl({ maxAge: 0 }), {
		'cache-control': 'max-age=0',
	})
})

test('When "sMaxage" is numeric, s-maxage directive is enabled', (t) => {
	t.deepEqual(cacheControl({ sMaxage: 1 }), {
		'cache-control': 's-maxage=1',
	})
	t.deepEqual(cacheControl({ sMaxage: 0 }), {
		'cache-control': 's-maxage=0',
	})
})

test('When "staleWhileRevalidate" is numeric, stale-while-revalidate directive is enabled', (t) => {
	t.deepEqual(cacheControl({ staleWhileRevalidate: 1 }), {
		'cache-control': 'stale-while-revalidate=1',
	})
	t.deepEqual(cacheControl({ staleWhileRevalidate: 0 }), {
		'cache-control': 'stale-while-revalidate=0',
	})
})

test('When "mustRevalidate" is true, must-revalidate directive is enabled', (t) => {
	t.deepEqual(cacheControl({ mustRevalidate: true }), {
		'cache-control': 'must-revalidate',
	})
	t.deepEqual(cacheControl({ mustRevalidate: false }), {
		'cache-control': '',
	})
})
