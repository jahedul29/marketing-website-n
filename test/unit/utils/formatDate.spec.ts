import { test, expect } from 'vitest';
import { formatDate, createFormatDate } from '$lib/utils/format/formatDate';

describe('formatDate()', () => {
	test('It formats in America/Toronto in fr-ca', () => {
		expect(
			formatDate(new Date('2021-01-01T00:00:00Z'), { timeZone: 'America/Toronto' }, 'fr-ca')
		).toBe('2020-12-31');
		expect(
			formatDate(new Date('2021-12-31T05:00:00Z'), { timeZone: 'America/Toronto' }, 'fr-ca')
		).toBe('2021-12-31');
	});

	test('It formats in America/Toronto in en-us', () => {
		expect(
			formatDate(new Date('2021-01-01T00:00:00Z'), { timeZone: 'America/Toronto' }, 'en-us')
		).toBe('12/31/2020');
		expect(
			formatDate(new Date('2021-12-31T05:00:00Z'), { timeZone: 'America/Toronto' }, 'en-us')
		).toBe('12/31/2021');
	});

	test('It formats in Japan in fr-ca', () => {
		expect(formatDate(new Date('2021-01-01T00:00:00Z'), { timeZone: 'Japan' }, 'fr-ca')).toBe(
			'2021-01-01'
		);
		expect(formatDate(new Date('2021-12-31T18:00:00Z'), { timeZone: 'Japan' }, 'fr-ca')).toBe(
			'2022-01-01'
		);
	});

	test('It formats in Japan in en-us', () => {
		expect(formatDate(new Date('2021-01-01T00:00:00Z'), { timeZone: 'Japan' }, 'en-us')).toBe(
			'1/1/2021'
		);
		expect(formatDate(new Date('2021-12-31T18:00:00Z'), { timeZone: 'Japan' }, 'en-us')).toBe(
			'1/1/2022'
		);
	});

	test('It formats in Japan in en-ca', () => {
		expect(formatDate(new Date('2021-01-01T00:00:00Z'), { timeZone: 'Japan' }, 'en-ca')).toBe(
			// TODO: RemovedEdge case for node 18 vs. node 20
			process.version.startsWith('v18') ? '1/1/2021' : '2021-01-01'
		);
		expect(formatDate(new Date('2021-12-31T18:00:00Z'), { timeZone: 'Japan' }, 'en-ca')).toBe(
			// TODO: RemovedEdge case for node 18 vs. node 20
			process.version.startsWith('v18') ? '1/1/2022' : '2022-01-01'
		);
	});
});

describe('createFormatDate()', () => {
	test('It formats in America/Toronto', () => {
		expect(
			createFormatDate({ timeZone: 'America/Toronto' }, 'en-us').format(
				new Date('2021-01-01T00:00:00Z')
			)
		).toBe('12/31/2020');
		// TODO: RemovedEdge case for node 18 vs. node 20
		expect(
			createFormatDate({ timeZone: 'America/Toronto' }, 'en-ca').format(
				new Date('2021-01-01T00:00:00Z')
			)
		).toBe(process.version.startsWith('v18') ? '12/31/2020' : '2020-12-31');
		expect(
			createFormatDate({ timeZone: 'America/Toronto' }, 'fr-ca').format(
				new Date('2021-01-01T00:00:00Z')
			)
		).toBe('2020-12-31');
		expect(
			createFormatDate(
				{
					timeZone: 'America/Toronto',
					dateStyle: 'short'
				},
				'fr-ca'
			).format(new Date('2021-01-01T00:00:00Z'))
		).toBe('2020-12-31');
	});

	test('It sets the proper options for America/Toronto', () => {
		const options = { timeZone: 'America/Toronto' } as const;
		expect(
			createFormatDate(options, 'en-us').long().format(new Date('2021-01-01T00:00:00Z'))
		).toBe('December 31, 2020');
		expect(
			createFormatDate(options, 'fr-ca').long().format(new Date('2021-01-01T00:00:00Z'))
		).toBe('31 décembre 2020');
		expect(
			createFormatDate(options, 'en-us').medium().format(new Date('2021-01-01T00:00:00Z'))
		).toBe('Dec 31, 2020');
		expect(
			createFormatDate(options, 'fr-ca').medium().format(new Date('2021-01-01T00:00:00Z'))
		).toBe('31 déc. 2020');
		expect(
			createFormatDate(options, 'en-us').short().format(new Date('2021-01-01T00:00:00Z'))
		).toBe('12/31/20');
		expect(
			createFormatDate(options, 'en-us').full().format(new Date('2021-01-01T00:00:00Z'))
		).toBe('Thursday, December 31, 2020');
		expect(
			createFormatDate(options, 'fr-ca').full().format(new Date('2021-01-01T00:00:00Z'))
		).toBe('jeudi 31 décembre 2020');
		expect(
			createFormatDate(options, 'en-us').day().format(new Date('2021-01-01T00:00:00Z'))
		).toBe('31');
		expect(
			createFormatDate(options, 'en-us')
				.day('numeric')
				.format(new Date('2021-01-01T08:00:00Z'))
		).toBe('1');
		expect(
			createFormatDate(options, 'fr-ca')
				.day('numeric')
				.format(new Date('2021-01-01T08:00:00Z'))
		).toBe('1');
		expect(
			createFormatDate(options, 'fr-ca').day().format(new Date('2021-01-01T08:00:00Z'))
		).toBe('01');
		expect(
			createFormatDate(options, 'en-ca').day().format(new Date('2021-01-01T08:00:00Z'))
		).toBe('01');
		expect(
			createFormatDate(options, 'en-us').month().format(new Date('2021-01-01T08:00:00Z'))
		).toBe('01');
		expect(
			createFormatDate(options, 'fr-ca').month().format(new Date('2021-01-01T08:00:00Z'))
		).toBe('01');
		expect(
			createFormatDate(options, 'en-us')
				.month('long')
				.format(new Date('2021-01-01T08:00:00Z'))
		).toBe('January');
		expect(
			createFormatDate(options, 'fr-ca')
				.month('long')
				.format(new Date('2021-01-01T08:00:00Z'))
		).toBe('janvier');
		expect(
			createFormatDate(options, 'fr-ca')
				.month('short')
				.format(new Date('2021-01-01T08:00:00Z'))
		).toBe('janv.');
		expect(
			createFormatDate(options, 'en-ca')
				.month('2-digit')
				.format(new Date('2021-01-01T08:00:00Z'))
		).toBe('01');
		expect(
			createFormatDate(options, 'fr-ca')
				.month('numeric')
				.format(new Date('2021-01-01T08:00:00Z'))
		).toBe('1');
		expect(
			createFormatDate(options, 'fr-ca').year().format(new Date('2021-01-01T08:00:00Z'))
		).toBe('2021');
		expect(
			createFormatDate(options, 'fr-ca')
				.year('2-digit')
				.format(new Date('2021-01-01T08:00:00Z'))
		).toBe('21');
	});

	test('It overrides previous options', () => {
		const options = { timeZone: 'America/Toronto' } as const;
		expect(
			createFormatDate(options, 'en-us')
				.long()
				.timeZone('Japan')
				.short()
				.locale('fr-ca')
				.format(new Date('2021-01-01T00:00:00Z'))
		).toBe('2021-01-01');
	});

	test('It combines previous options', () => {
		const options = { timeZone: 'America/Toronto' } as const;
		expect(
			createFormatDate(options, 'en-us')
				.year('2-digit')
				.month('2-digit')
				.day('2-digit')
				.utc()
				.format(new Date('2021-01-01T00:00:00Z'))
		).toBe('01/01/21');
		expect(
			createFormatDate(options, 'en-us')
				.year('numeric')
				.month('numeric')
				.day('2-digit')
				.utc()
				.format(new Date('2021-01-01T00:00:00Z'))
		).toBe('1/01/2021');
		expect(
			createFormatDate(options, 'en-us')
				.year('2-digit')
				.day('numeric')
				.utc()
				.format(new Date('2021-01-01T00:00:00Z'))
		).toBe('1 21'); // no month
		expect(
			createFormatDate(options, 'fr-ca')
				.year('2-digit')
				.day('numeric')
				.utc()
				.format(new Date('2021-01-01T00:00:00Z'))
		).toBe('21 1'); // no month
	});

	test('It forces a "ISO" locale', () => {
		expect(
			createFormatDate(
				{
					timeZone: 'America/Toronto',
					dateStyle: 'short'
				},
				'en-ca'
			)
				.iso()
				.format(new Date('2021-01-01T00:00:00Z'))
		).toBe('2020-12-31');

		expect(
			createFormatDate(
				{
					timeZone: 'UTC',
					timeStyle: 'medium'
				},
				'en-ca'
			)
				.iso()
				.format(new Date('2021-01-01T01:02:03Z'))
		).toBe('01:02:03');
	});
});
