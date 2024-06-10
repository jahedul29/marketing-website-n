import { test, expect, vi } from 'vitest';
import { getByText, render } from '@testing-library/svelte';
import SpriteAnimation from '$lib/components/ui/SpriteAnimation.svelte';

beforeEach(() => {
	vi.useFakeTimers();

	const start = 0;
	let count = 0;
	let timeout: ReturnType<typeof setTimeout> | null = null;
	vi.spyOn(window, 'requestAnimationFrame').mockImplementation((cb) => {
		timeout = setTimeout(() => cb(100 * count++ + start), 1);
		return 1;
	});
	vi.spyOn(window, 'cancelAnimationFrame').mockImplementation(() => {
		if (timeout) {
			clearTimeout(timeout);
		}
	});
	vi.spyOn(window.performance, 'now').mockImplementation(() => {
		return start;
	});
});

afterEach(() => {
	vi.clearAllTimers();
});

test('Properly renders nothing with invalid url, width and height', () => {
	const { container } = render(SpriteAnimation, {
		url: '',
		width: 0,
		height: 0
	});
	expect(getByText(container, 'is missing required attributes')).toBeInTheDocument();
});

test('Properly renders nothing with invalid height', () => {
	const { container } = render(SpriteAnimation, {
		url: 'test.png',
		width: 10,
		height: 0
	});
	expect(getByText(container, 'is missing required attributes')).toBeInTheDocument();
});

test('Properly renders div with valid props', () => {
	const { container } = render(SpriteAnimation, {
		url: 'test.png',
		width: 10,
		height: 20
	});

	const div = container.querySelector('div > div');
	expect(div).toBeInTheDocument();
	expect(div).toBeVisible();
	expect(div).toHaveAttribute('aria-hidden', 'true');
	expect(div).toHaveStyle({
		'--background-image': `url('test.png')`,
		'--padding-bottom': '200%',
		'--background-size': '100% 100%',
		'background-position': '0% 0%'
	});
});

test('Animates properly', async () => {
	const { container } = render(SpriteAnimation, {
		url: 'test.png',
		width: 10,
		height: 20,
		rows: 4
	});

	const div = container.querySelector('div > div');
	expect(div).toBeInTheDocument();

	vi.runOnlyPendingTimers();
	expect(div).toHaveStyle({
		'background-position': '0% 0%'
	});

	vi.runOnlyPendingTimers();
	expect(div).toHaveStyle({
		'background-position': '0% 33.333333333333336%'
	});

	vi.runOnlyPendingTimers();
	expect(div).toHaveStyle({
		'background-position': '0% 66.66666666666667%'
	});

	vi.runOnlyPendingTimers();
	expect(div).toHaveStyle({
		'background-position': '0% 100%'
	});

	vi.runOnlyPendingTimers();
	expect(div).toHaveStyle({
		'background-position': '0% 0%'
	});
});

test('Animates properly 2d', () => {
	const { container } = render(SpriteAnimation, {
		url: 'test.png',
		width: 10,
		height: 20,
		cols: 2,
		rows: 2
	});

	const div = container.querySelector('div > div');
	expect(div).toBeInTheDocument();

	vi.runOnlyPendingTimers();
	expect(div).toHaveStyle({
		'background-position': '0% 0%'
	});

	vi.runOnlyPendingTimers();
	expect(div).toHaveStyle({
		'background-position': '100% 0%'
	});

	vi.runOnlyPendingTimers();
	expect(div).toHaveStyle({
		'background-position': '0% 100%'
	});

	vi.runOnlyPendingTimers();
	expect(div).toHaveStyle({
		'background-position': '100% 100%'
	});

	vi.runOnlyPendingTimers();
	expect(div).toHaveStyle({
		'background-position': '0% 0%'
	});
});

test('Animates properly at 50fps', async () => {
	const { container } = render(SpriteAnimation, {
		url: 'test.png',
		width: 10,
		height: 20,
		rows: 4,
		speed: 50
	});

	const div = container.querySelector('div > div');
	expect(div).toBeInTheDocument();

	vi.runOnlyPendingTimers();
	expect(div).toHaveStyle({
		'background-position': '0% 0%'
	});
	vi.runOnlyPendingTimers();

	expect(div).toHaveStyle({
		'background-position': '0% 66.66666666666667%'
	});
});

test('Animates properly no loop', () => {
	const { container } = render(SpriteAnimation, {
		url: 'test.png',
		width: 10,
		height: 20,
		rows: 4,
		loop: false
	});

	const div = container.querySelector('div > div');
	expect(div).toBeInTheDocument();

	vi.runOnlyPendingTimers();
	expect(div).toHaveStyle({
		'background-position': '0% 0%'
	});

	vi.runOnlyPendingTimers();
	expect(div).toHaveStyle({
		'background-position': '0% 33.333333333333336%'
	});

	vi.runOnlyPendingTimers();
	expect(div).toHaveStyle({
		'background-position': '0% 66.66666666666667%'
	});

	vi.runOnlyPendingTimers();
	expect(div).toHaveStyle({
		'background-position': '0% 100%'
	});

	vi.runOnlyPendingTimers();
	expect(div).toHaveStyle({
		'background-position': '0% 100%'
	});
});
