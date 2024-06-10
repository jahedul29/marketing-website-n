import { test, expect } from 'vitest';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const inference = require('../../../system/inference.cjs');

test('Infer unknown by default', () => {
	expect(inference.inferType('blah')).toBe('unknown');
	expect(inference.inferType('test()')).toBe('unknown');
	// Todo: we could parse this: the type Blah is known
	expect(inference.inferType('new Blah()')).toBe('unknown');
});

test('Infer any on nulls', () => {
	expect(inference.inferType(null)).toBe('any');
	expect(inference.inferType('')).toBe('any');
	expect(inference.inferType(undefined)).toBe('any');
});

test('Infer null or Maybe', () => {
	expect(inference.inferType('null')).toBe('null');
	expect(inference.inferType('blah() || null')).toBe('Maybe<any>');
});

test('Infer undefined', () => {
	expect(inference.inferType('undefined')).toBe('undefined');
	expect(inference.inferType('blah() || undefined')).toBe('undefined');
});

test('Infer string', () => {
	expect(inference.inferType(`'hello'`)).toBe('string');
	expect(inference.inferType('`hello`')).toBe('string');
	expect(inference.inferType(`blah bla blah || ''`)).toBe('string');
	expect(inference.inferType(`import.meta.env.test`)).toBe('string');
	expect(inference.inferType(`t('test.blah')`)).toBe('string');
	expect(inference.inferType('t(`test.${blah}`)')).toBe('string');
	expect(inference.inferType(`blabla).join(',')`)).toBe('string');
});

test('Infer boolean', () => {
	expect(inference.inferType('false')).toBe('boolean');
	expect(inference.inferType('true')).toBe('boolean');
});

test('Infer number', () => {
	expect(inference.inferType('1')).toBe('number');
	expect(inference.inferType('1.1')).toBe('number');
	expect(inference.inferType('1e1')).toBe('number');
	expect(inference.inferType('1e+1')).toBe('number');
	expect(inference.inferType('1e-1')).toBe('number');
	expect(inference.inferType('blah() || 0')).toBe('number');
});

test('Infer object', () => {
	expect(inference.inferType(`{}`)).toBe('object');
	expect(
		inference.inferType(`{
		a: 1
	}`)
	).toBe('object');
	expect(inference.inferType(`blah() || {}`)).toBe('object');
});

test('Infer array', () => {
	expect(inference.inferType(`[]`)).toBe('array');
	expect(
		inference.inferType(`[
		1, 2, 3
	]`)
	).toBe('array');
});

test('Infer Date', () => {
	expect(inference.inferType(`new Date()`)).toBe('Date');
	expect(inference.inferType(`new Date(2002, 12, 31)`)).toBe('Date');
	expect(
		inference.inferType(`new Date(
		2002, 12, 31
	)`)
	).toBe('Date');
});

test('Infer function', () => {
	expect(inference.inferType(`() => {}`)).toBe('function');
	expect(inference.inferType(`function (`)).toBe('function');
	expect(inference.inferType(`() => { return 1; }`)).toBe('function');
	expect(inference.inferType(`async (test: Test) => {}`)).toBe('function');
	expect(inference.inferType(`async ({ test: Test }) => {}`)).toBe('function');
	expect(inference.inferType(`async function () `)).toBe('function');
});

test('Infer readable', () => {
	expect(inference.inferType(`readable<test>()`)).toBe('Readable');
	expect(inference.inferType(`Readable<test>()`)).toBe('Readable');
	expect(inference.inferType(`derived(test)`)).toBe('Readable');
	expect(inference.inferType(`derived<Test>(test)`)).toBe('Readable');
});

test('Infer writable', () => {
	expect(inference.inferType(`writable<test>()`)).toBe('Writable');
	expect(inference.inferType(`Writable<test>()`)).toBe('Writable');
});
