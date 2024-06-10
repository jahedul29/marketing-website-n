import { test, expect, vi } from 'vitest';
import { getByText, render } from '@testing-library/svelte';
import { tick } from 'svelte';
import html from 'svelte-htm';
import Dismissable from '$com/ui/Dismissable.svelte';
import { get, writable } from 'svelte/store';

test('it does not render by default', async () => {
	const { container, component } = render<Dismissable>(Dismissable, {
		props: {
			key: 'test'
		}
	});

	expect(container).toBeInTheDocument();
	expect(container.innerHTML).toBe('<div><!--<Dismissable>--></div>');

	expect(component.key).toBe('test');
	expect(component.timeout).toBe(0);
	expect(component.maxAge).toBe(0);
});

test('it renders with content after timeout and mount', async () => {
	vi.useFakeTimers();

	const { container } = render(html`
		<${Dismissable} key="test">
			<div>Dismissable content</div>
		</${Dismissable}>
	`);

	expect(container).toBeInTheDocument();
	expect(document.querySelector('div > div')).toBeNull();

	// Run all timers
	vi.runAllTimers();
	// Wait for mount
	await tick();

	expect(document.querySelector('div > div')).toBeInTheDocument();
	expect(getByText(container, 'Dismissable content')).toBeInTheDocument();
});

test('it closes without persistance', async () => {
	vi.useFakeTimers();

	const close = writable(vi.fn());
	const { container } = render(html`
		<${Dismissable} key="test" let:close=${close}>
			<div>Dismissable content</div>
		</${Dismissable}>
	`);

	// Run all timers
	vi.runAllTimers();
	// Wait for mount
	await tick();

	expect(document.querySelector('div > div')).toBeInTheDocument();
	expect(getByText(container, 'Dismissable content')).toBeInTheDocument();

	// Close it
	get(close)();
	await tick();

	expect(document.querySelector('div > div')).toBeNull();
	expect(window.localStorage.getItem('test-dismissed')).toBeNull();
});

test('it dismisses properly', async () => {
	vi.useFakeTimers();

	const dismiss = writable(vi.fn());
	const { container } = render(html`
		<${Dismissable} key="test" let:dismiss=${dismiss}>
			<div>Dismissable content</div>
		</${Dismissable}>
	`);

	// Run all timers
	vi.runAllTimers();
	// Wait for mount
	await tick();

	expect(document.querySelector('div > div')).toBeInTheDocument();
	expect(getByText(container, 'Dismissable content')).toBeInTheDocument();

	// Close it
	get(dismiss)();
	await tick();

	expect(document.querySelector('div > div')).toBeNull();
	expect(window.localStorage.getItem('test-dismissed')).toBe('true');

	window.localStorage.removeItem('test-dismissed');
});

test('it respects max age: dismiss', async () => {
	vi.useFakeTimers();

	// Dismiss it now
	window.localStorage.setItem('test-dismissed', new Date().toISOString());

	render(html`
		<${Dismissable} key="test" maxAge=5>
			<div>Dismissable content</div>
		</${Dismissable}>
	`);

	expect(document.querySelector('div > div')).toBeNull();

	// Run all timers
	vi.runAllTimers();
	// Wait for mount
	await tick();

	// Still null since max age is 5 seconds
	expect(document.querySelector('div > div')).toBeNull();

	window.localStorage.removeItem('test-dismissed');
});

test('it respects max age: expired', async () => {
	vi.useFakeTimers();

	// Dismiss it 10 seconds ago
	const now = new Date().getTime();
	window.localStorage.setItem('test-dismissed', new Date(now - 10000).toISOString());

	const { container } = render(html`
		<${Dismissable} key="test" maxAge=5>
			<div>Dismissable content</div>
		</${Dismissable}>
	`);

	expect(document.querySelector('div > div')).toBeNull();

	// Run all timers
	vi.runAllTimers();
	// Wait for mount
	await tick();

	// Shown since max age is 5 seconds
	expect(document.querySelector('div > div')).toBeInTheDocument();
	expect(getByText(container, 'Dismissable content')).toBeInTheDocument();

	window.localStorage.removeItem('test-dismissed');
});

test('it respects max age with lastUpdatedAt: dismiss', async () => {
	vi.useFakeTimers();

	const lastUpdatedAt = new Date(Date.now() - 1000);

	// Dismiss it now
	window.localStorage.setItem('test-dismissed', new Date(Date.now() - 100).toISOString());

	render(html`
		<${Dismissable} key="test" maxAge=5 lastUpdatedAt=${lastUpdatedAt}>
			<div>Dismissable content</div>
		</${Dismissable}>
	`);

	expect(document.querySelector('div > div')).toBeNull();

	// Run all timers
	vi.runAllTimers();
	// Wait for mount
	await tick();

	// Still null since max age is 5 seconds
	expect(document.querySelector('div > div')).toBeNull();

	window.localStorage.removeItem('test-dismissed');
});

test('it respects max age with lastUpdatedAt: expired', async () => {
	vi.useFakeTimers();

	const lastUpdatedAt = new Date();

	// Dismiss it now
	window.localStorage.setItem('test-dismissed', new Date(Date.now() - 100).toISOString());

	const { container } = render(html`
		<${Dismissable} key="test" maxAge=5 lastUpdatedAt=${lastUpdatedAt}>
			<div>Dismissable content</div>
		</${Dismissable}>
	`);

	expect(document.querySelector('div > div')).toBeNull();

	// Run all timers
	vi.runAllTimers();
	// Wait for mount
	await tick();

	// Shown since lastUpdatedAt is now
	expect(document.querySelector('div > div')).toBeInTheDocument();
	expect(getByText(container, 'Dismissable content')).toBeInTheDocument();

	window.localStorage.removeItem('test-dismissed');
});
