import { test, expect } from 'vitest';
import { tailwindify } from '$lib/tailwind/tailwind';

test('Works properly: width', () => {
	const tailwindified = tailwindify('w', '400');
	expect(tailwindified).toBe('w-400');
});

test('Works properly: height', () => {
	const tailwindified = tailwindify('h', '400');
	expect(tailwindified).toBe('h-400');
});

test('Works properly with custom value: gap', () => {
	const tailwindified = tailwindify('gap', '[9px]');
	expect(tailwindified).toBe('gap-[9px]');
});

test('Properly breaks appart responsive syntax: width', () => {
	const tailwindified = tailwindify('w', '400|200');
	expect(tailwindified).toBe('w-400 bp:w-200');
});

test('Properly breaks appart responsive syntax: height', () => {
	const tailwindified = tailwindify('h', '300|100');
	expect(tailwindified).toBe('h-300 bp:h-100');
});

test('Properly breaks appart custom values', () => {
	const tailwindified = tailwindify('w', '[mobile]|[desktop]');
	expect(tailwindified).toBe('w-[mobile] bp:w-[desktop]');
});
