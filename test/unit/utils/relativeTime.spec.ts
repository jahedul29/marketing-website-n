import { test, expect } from 'vitest';
import {
	relativeTime,
	formatRelativeTime,
	resolveAutoUnit,
	AUTO_UNIT,
	NOW
} from '$lib/utils/format/relativeTime';

const EPOCH = new Date(0);

describe('resolveAutoUnit', () => {
	test('proper units', () => {
		expect(resolveAutoUnit(-Infinity)).toBe('years');
		expect(resolveAutoUnit(-59 * 60 * 1000)).toBe('hours');
		expect(resolveAutoUnit(-1)).toBe(NOW);
		expect(resolveAutoUnit(0)).toBe(NOW);
		expect(resolveAutoUnit(1)).toBe(NOW);
		expect(resolveAutoUnit(1999)).toBe(NOW);
		expect(resolveAutoUnit(2000)).toBe(NOW);
		expect(resolveAutoUnit(2001)).toBe('seconds');
		expect(resolveAutoUnit(58 * 1000)).toBe('seconds');
		expect(resolveAutoUnit(59 * 1000)).toBe('minutes');
		expect(resolveAutoUnit(60 * 1000)).toBe('minutes');
		expect(resolveAutoUnit(59 * 60 * 1000)).toBe('hours');
		expect(resolveAutoUnit(60 * 60 * 1000)).toBe('hours');
		expect(resolveAutoUnit(61 * 60 * 1000)).toBe('hours');
		expect(resolveAutoUnit(12 * 60 * 60 * 1000)).toBe('hours');
		expect(resolveAutoUnit(23 * 60 * 60 * 1000)).toBe('hours');
		expect(resolveAutoUnit(24 * 60 * 60 * 1000)).toBe('days');
		expect(resolveAutoUnit(48 * 60 * 60 * 1000)).toBe('days');
		expect(resolveAutoUnit(96 * 60 * 60 * 1000)).toBe('days');
		expect(resolveAutoUnit(6 * 24 * 60 * 60 * 1000)).toBe('days');
		expect(resolveAutoUnit(7 * 24 * 60 * 60 * 1000)).toBe('weeks');
		expect(resolveAutoUnit(20 * 24 * 60 * 60 * 1000)).toBe('weeks');
		expect(resolveAutoUnit(29 * 24 * 60 * 60 * 1000)).toBe('weeks');
		expect(resolveAutoUnit(30 * 24 * 60 * 60 * 1000)).toBe('months');
		expect(resolveAutoUnit(31 * 24 * 60 * 60 * 1000)).toBe('months');
		expect(resolveAutoUnit(62 * 24 * 60 * 60 * 1000)).toBe('months');
		expect(resolveAutoUnit(365 * 24 * 60 * 60 * 1000)).toBe('years');
		expect(resolveAutoUnit(366 * 24 * 60 * 60 * 1000)).toBe('years');
		expect(resolveAutoUnit(36600 * 24 * 60 * 60 * 1000)).toBe('years');
		expect(resolveAutoUnit(Infinity)).toBe('years');
	});
});

describe('formatRelativeTime', () => {
	test('now', () => {
		expect(formatRelativeTime(EPOCH, {}, AUTO_UNIT, 'en-us', EPOCH)).toBe('now');
		expect(formatRelativeTime(EPOCH, {}, AUTO_UNIT, 'en-us', new Date(2000))).toBe('now');
		expect(formatRelativeTime(new Date(2000), {}, AUTO_UNIT, 'en-us', EPOCH)).toBe('now');
	});
	test('seconds', () => {
		expect(formatRelativeTime(EPOCH, {}, AUTO_UNIT, 'en-us', new Date(3000))).toBe(
			'in 3 seconds'
		);
		expect(formatRelativeTime(new Date(6000), {}, AUTO_UNIT, 'en-us', EPOCH)).toBe(
			'6 seconds ago'
		);
		expect(formatRelativeTime(new Date(57000), {}, AUTO_UNIT, 'en-us', EPOCH)).toBe(
			'57 seconds ago'
		);
		expect(formatRelativeTime(EPOCH, {}, AUTO_UNIT, 'en-us', new Date(58000))).toBe(
			'in 58 seconds'
		);
	});
	test('minutes', () => {
		expect(formatRelativeTime(new Date(59000), {}, AUTO_UNIT, 'en-us', EPOCH)).toBe(
			'1 minute ago'
		);
		expect(formatRelativeTime(EPOCH, {}, AUTO_UNIT, 'en-us', new Date(59000))).toBe(
			'in 1 minute'
		);
		expect(formatRelativeTime(EPOCH, {}, AUTO_UNIT, 'en-us', new Date(3 * 60 * 1000))).toBe(
			'in 3 minutes'
		);
		expect(formatRelativeTime(new Date(6 * 60 * 1000), {}, AUTO_UNIT, 'en-us', EPOCH)).toBe(
			'6 minutes ago'
		);
		expect(formatRelativeTime(new Date(57 * 60 * 1000), {}, AUTO_UNIT, 'en-us', EPOCH)).toBe(
			'57 minutes ago'
		);
		expect(formatRelativeTime(EPOCH, {}, AUTO_UNIT, 'en-us', new Date(57 * 60 * 1000))).toBe(
			'in 57 minutes'
		);
	});
	test('hours', () => {
		expect(formatRelativeTime(new Date(59 * 60 * 1000), {}, AUTO_UNIT, 'en-us', EPOCH)).toBe(
			'1 hour ago'
		);
		expect(formatRelativeTime(EPOCH, {}, AUTO_UNIT, 'en-us', new Date(59 * 60 * 1000))).toBe(
			'in 1 hour'
		);
		expect(
			formatRelativeTime(EPOCH, {}, AUTO_UNIT, 'en-us', new Date(3 * 60 * 60 * 1000))
		).toBe('in 3 hours');
		expect(
			formatRelativeTime(new Date(6 * 60 * 60 * 1000), {}, AUTO_UNIT, 'en-us', EPOCH)
		).toBe('6 hours ago');
		expect(
			formatRelativeTime(new Date(23 * 60 * 60 * 1000), {}, AUTO_UNIT, 'en-us', EPOCH)
		).toBe('23 hours ago');
		expect(
			formatRelativeTime(EPOCH, {}, AUTO_UNIT, 'en-us', new Date(23 * 60 * 60 * 1000))
		).toBe('in 23 hours');
		expect(
			formatRelativeTime(
				new Date(23 * 60 * 60 * 1000 + 29 * 60 * 1000),
				{},
				AUTO_UNIT,
				'en-us',
				EPOCH
			)
		).toBe('23 hours ago');
		expect(
			formatRelativeTime(
				new Date(23 * 60 * 60 * 1000 + 29 * 60 * 1000),
				{},
				AUTO_UNIT,
				'en-us',
				EPOCH
			)
		).toBe('23 hours ago');
		expect(
			formatRelativeTime(
				new Date(23 * 60 * 60 * 1000 + 31 * 60 * 1000),
				{},
				AUTO_UNIT,
				'en-us',
				EPOCH
			)
		).toBe('yesterday');
	});
	test('days', () => {
		expect(formatRelativeTime(new Date(1970, 0, 2), {}, AUTO_UNIT, 'en-us', EPOCH)).toBe(
			'yesterday'
		);
		expect(formatRelativeTime(new Date(1970, 0, 3), {}, AUTO_UNIT, 'en-us', EPOCH)).toBe(
			'2 days ago'
		);
		expect(formatRelativeTime(new Date(1970, 0, 7), {}, AUTO_UNIT, 'en-us', EPOCH)).toBe(
			'6 days ago'
		);
	});
	test('weeks', () => {
		expect(formatRelativeTime(new Date(1970, 0, 8), {}, AUTO_UNIT, 'en-us', EPOCH)).toBe(
			'last week'
		);
		expect(formatRelativeTime(new Date(1970, 0, 15), {}, AUTO_UNIT, 'en-us', EPOCH)).toBe(
			'2 weeks ago'
		);
		expect(formatRelativeTime(new Date(1970, 0, 21), {}, AUTO_UNIT, 'en-us', EPOCH)).toBe(
			'3 weeks ago'
		);
		expect(formatRelativeTime(new Date(1970, 0, 28), {}, AUTO_UNIT, 'en-us', EPOCH)).toBe(
			'4 weeks ago'
		);
		expect(formatRelativeTime(new Date(1970, 0, 29), {}, AUTO_UNIT, 'en-us', EPOCH)).toBe(
			'4 weeks ago'
		);
	});
	test('months', () => {
		expect(
			formatRelativeTime(new Date('1970-01-30T12:00:00Z'), {}, AUTO_UNIT, 'en-us', EPOCH)
		).toBe('last month');
		expect(formatRelativeTime(new Date('1970-01-31'), {}, AUTO_UNIT, 'en-us', EPOCH)).toBe(
			'last month'
		);
		expect(formatRelativeTime(new Date(1970, 1, 1), {}, AUTO_UNIT, 'en-us', EPOCH)).toBe(
			'last month'
		);
		expect(formatRelativeTime(new Date(1970, 3, 5), {}, AUTO_UNIT, 'en-us', EPOCH)).toBe(
			'3 months ago'
		);
		expect(formatRelativeTime(new Date(1970, 3, 28), {}, AUTO_UNIT, 'en-us', EPOCH)).toBe(
			'4 months ago'
		);
		expect(formatRelativeTime(new Date(1970, 9, 28), {}, AUTO_UNIT, 'en-us', EPOCH)).toBe(
			'10 months ago'
		);
		expect(formatRelativeTime(new Date(1970, 11, 11), {}, AUTO_UNIT, 'en-us', EPOCH)).toBe(
			'11 months ago'
		);
		expect(formatRelativeTime(new Date('1970-12-13'), {}, AUTO_UNIT, 'en-us', EPOCH)).toBe(
			'12 months ago'
		);
		expect(formatRelativeTime(new Date(1970, 11, 16), {}, AUTO_UNIT, 'en-us', EPOCH)).toBe(
			'12 months ago'
		);
		expect(formatRelativeTime(new Date(1970, 11, 16, 19), {}, AUTO_UNIT, 'en-us', EPOCH)).toBe(
			'12 months ago'
		);
	});
	test('years', () => {
		expect(
			formatRelativeTime(new Date('1970-12-20T20:00:00Z'), {}, AUTO_UNIT, 'en-us', EPOCH)
		).toBe('last year');
		expect(formatRelativeTime(new Date(1970, 11, 31, 23), {}, AUTO_UNIT, 'en-us', EPOCH)).toBe(
			'last year'
		);
		expect(formatRelativeTime(new Date(1971, 1, 1), {}, AUTO_UNIT, 'en-us', EPOCH)).toBe(
			'last year'
		);
		expect(formatRelativeTime(new Date('1972-02-01'), {}, AUTO_UNIT, 'en-us', EPOCH)).toBe(
			'2 years ago'
		);
	});
});

describe('relativeTime', () => {
	test('force unit', () => {
		expect(relativeTime({}, 'seconds', 'en-us', EPOCH).format(EPOCH)).toBe('now');
		expect(relativeTime({}, 'seconds', 'en-us', new Date(3000)).format(EPOCH)).toBe(
			'in 3 seconds'
		);
		expect(
			relativeTime({}, 'seconds', 'en-us', new Date('1972-01-01T00:00:00Z')).format(EPOCH)
		).toBe('in 63,072,000 seconds');
		expect(
			relativeTime({}, 'seconds', 'en-us', new Date('1972-02-01T05:00:00Z'))
				.unit('hours')
				.format(EPOCH)
		).toBe('in 18,269 hours');
		expect(
			relativeTime()
				.locale('en-us')
				.now(new Date('1972-02-01T05:00:00Z'))
				.unit('hours')
				.format(EPOCH)
		).toBe('in 18,269 hours');
	});
	test('force short', () => {
		expect(relativeTime({}, 'seconds', 'en-us', EPOCH).short().format(EPOCH)).toBe('now');
		expect(relativeTime({}, 'seconds', 'en-us', new Date(3000)).short().format(EPOCH)).toBe(
			'in 3 sec.'
		);
		expect(
			relativeTime(
				{
					style: 'short'
				},
				'seconds',
				'en-us',
				new Date('1972-02-01T05:00:00Z')
			).format(EPOCH)
		).toBe('in 65,768,400 sec.');
	});
	test('force narrow', () => {
		expect(relativeTime({}, 'seconds', 'en-us', EPOCH).narrow().format(EPOCH)).toBe('now');
		expect(relativeTime({}, 'seconds', 'en-us', new Date(3000)).narrow().format(EPOCH)).toBe(
			'in 3s'
		);
		expect(
			relativeTime(
				{
					style: 'narrow'
				},
				'seconds',
				'en-us',
				new Date('1972-02-01T05:00:00Z')
			).format(EPOCH)
		).toBe('in 65,768,400s');
	});
	test('force numeric', () => {
		expect(relativeTime({}, 'seconds', 'en-us', EPOCH).numeric().format(EPOCH)).toBe(
			'in 0 seconds'
		);
		expect(relativeTime({}, 'seconds', 'en-us', new Date(1000)).numeric().format(EPOCH)).toBe(
			'in 1 second'
		);
		expect(relativeTime({}, 'seconds', 'en-us', new Date(3000)).numeric().format(EPOCH)).toBe(
			'in 3 seconds'
		);
		expect(
			relativeTime(
				{
					style: 'short',
					numeric: 'always'
				},
				'years',
				'en-us',
				new Date(1971, 1, 1)
			).format(EPOCH)
		).toBe('in 1 yr.');
		expect(
			relativeTime(
				{
					style: 'short',
					numeric: 'always'
				},
				'years',
				'en-us',
				EPOCH
			).format(new Date(1971, 1, 1))
		).toBe('1 yr. ago');
		expect(
			relativeTime(
				{
					style: 'short',
					numeric: 'auto'
				},
				'years',
				'en-us',
				EPOCH
			).format(new Date(1971, 1, 1))
		).toBe('last yr.');
	});
	test('force locale', () => {
		expect(relativeTime({}, 'seconds', 'fr-ca', EPOCH).format(EPOCH)).toBe('maintenant');
		expect(relativeTime({}, 'seconds', 'en-ca', EPOCH).numeric().format(EPOCH)).toBe(
			'in 0 seconds'
		);
		expect(relativeTime({}, 'seconds', 'fr-ca', EPOCH).numeric().format(EPOCH)).toBe(
			'dans 0 seconde'
		);
		expect(
			relativeTime({}, 'seconds', null, EPOCH) // start with a null locale
				.numeric()
				.userLocale() // use the user's locale
				.locale('fr-ca') // override with a different locale
				.format(EPOCH)
		).toBe('dans 0 seconde');
		expect(relativeTime({}, 'seconds', 'fr-ca', new Date(1000)).format(EPOCH)).toBe(
			'dans 1 seconde'
		);
		expect(relativeTime({}, 'seconds', 'fr-ca', new Date(3000)).format(EPOCH)).toBe(
			'dans 3 secondes'
		);
		expect(
			relativeTime({}, AUTO_UNIT, 'en-us', EPOCH).locale('fr-ca').format(new Date(1971, 1, 1))
		).toBe('l’année dernière');
	});
});
