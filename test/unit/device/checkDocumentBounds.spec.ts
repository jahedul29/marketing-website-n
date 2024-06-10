import { test, expect, vi } from 'vitest';
import { checkDocumentBounds } from '$lib/utils/device/checkDocumentBounds';

const mockElementBoundingRect = (element: HTMLElement, values: Record<string, number> = {}) => {
	element.getBoundingClientRect = vi.fn(() => ({
		x: 0,
		y: 0,
		width: 2048,
		height: 17,
		top: -100,
		right: 2048,
		bottom: 2048,
		left: -100,
		toJSON: vi.fn(),
		...values
	}));
};

test('documentElement is not out of bounds', () => {
	const outOfBounds = checkDocumentBounds(document.documentElement);
	expect(outOfBounds.top).toBe(0);
	expect(outOfBounds.right).toBe(0);
	expect(outOfBounds.bottom).toBe(0);
	expect(outOfBounds.left).toBe(0);
});

test('body is not out of bounds', () => {
	const outOfBounds = checkDocumentBounds(document.body);
	expect(outOfBounds.top).toBe(0);
	expect(outOfBounds.right).toBe(0);
	expect(outOfBounds.bottom).toBe(0);
	expect(outOfBounds.left).toBe(0);
});

test('all directions can be out of bounds', () => {
	const testElement = document.createElement('div');
	mockElementBoundingRect(testElement);
	Object.defineProperty(document.documentElement, 'scrollHeight', {
		writable: false,
		value: window.innerHeight
	});
	document.body.appendChild(testElement);
	const outOfBounds = checkDocumentBounds(testElement);
	expect(outOfBounds.top).toBe(100);
	expect(outOfBounds.right).toBe(1024);
	expect(outOfBounds.bottom).toBe(1280);
	expect(outOfBounds.left).toBe(100);
});
