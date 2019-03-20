// tslint:disable:no-expression-statement
import test from 'ava'
import { tierToSymbol } from './tier-to-symbol'
import { SponsorTier } from '../store/sponsors'

test('Tier 10 is gold', t => {
	t.is(tierToSymbol(10), 'gold')
})

test('Tier 20 is silver', t => {
	t.is(tierToSymbol(20), 'silver')
})

test('Tier 30 is bronze', t => {
	t.is(tierToSymbol(30), 'bronze')
})

test('Tier 50 is supporters', t => {
	t.is(tierToSymbol(50), 'supporters')
})

test('undefined tier', t => {
	t.is(tierToSymbol(9999 as SponsorTier), undefined)
})
