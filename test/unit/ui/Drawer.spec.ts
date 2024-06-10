import { test, expect } from 'vitest';
import { getByText, render } from '@testing-library/svelte';
import html from 'svelte-htm';
import Drawer from '$lib/components/ui/drawer/Drawer.svelte';
import DrawerButton from '$lib/components/ui/drawer/DrawerButton.svelte';
import DrawerPanel from '$lib/components/ui/drawer/DrawerPanel.svelte';
import { fireEvent } from '@testing-library/dom';
import { tick } from 'svelte/internal';

const createMouseClick = () => {
	return new MouseEvent('click', {
		cancelable: true,
		bubbles: true
	});
};

const renderFixture = (initialOpen: boolean) => {
	return render(html`<${Drawer} id="1" open=${initialOpen}>
		<${DrawerButton} class=${initialOpen ? 'bg-[grey]' : ''}>Test button<//>
		<${DrawerPanel} class=${initialOpen ? 'bg-[grey]' : ''}>
			<p class="pb-70">Text text</p>
		<//>
	<//>`);
};

describe('Empty render', () => {
	test('it does not render when empty', async () => {
		const { container, component } = render<Drawer>(Drawer, {
			id: 'test-empty'
		});

		const details = container.querySelector('details');
		const button = container.querySelector('button');
		const div = container.querySelector('div');

		expect(details).toBeNull();
		expect(button).toBeNull();
		expect(div).toBeInTheDocument();
		expect(component.open).toBeFalsy();
	});
});

describe('Open prop', () => {
	test('it renders properly when closed', async () => {
		const { container } = renderFixture(false);

		const details = container.querySelector('details');
		const button = container.querySelector('button');
		const panel = container.querySelector('div[aria-labelledby]');

		expect(details).toBeNull();
		expect(button).toBeInTheDocument();
		expect(button?.getAttribute('aria-expanded')).toBe('false');
		expect(button).not.toHaveClass('bg-[grey]');
		expect(panel).toBeInTheDocument();
		expect(panel).not.toHaveClass('bg-[grey]');
		// Does not change since slide is not working in jsdom
		expect(panel).toHaveStyle({
			height: 0,
			overflow: 'hidden'
		});

		expect(getByText(container, 'Test button')).toBeInTheDocument();
	});

	test('it renders properly when opened', async () => {
		const { container } = renderFixture(true);

		const details = container.querySelector('details');
		const button = container.querySelector('button');
		const panel = container.querySelector('div[aria-labelledby]');

		expect(details).toBeNull();
		expect(button).toBeInTheDocument();
		expect(button?.getAttribute('aria-expanded')).toBe('true');
		expect(button).toHaveClass('bg-[grey]');
		expect(panel).toBeInTheDocument();
		expect(panel).toHaveClass('bg-[grey]');
	});
});

describe('Mouse events', () => {
	test('it renders properly when clicked', async () => {
		const { container } = renderFixture(false);

		const button = container.querySelector('button');
		const panel = container.querySelector('div[aria-labelledby]');

		// Set a proper offsetHeight
		if (panel) {
			Object.defineProperty(panel, 'offsetHeight', {
				writable: true,
				value: 288
			});
		}

		expect(button).toBeInTheDocument();
		expect(button?.getAttribute('aria-expanded')).toBe('false');
		expect(panel).toBeInTheDocument();

		if (button) {
			fireEvent(button, createMouseClick());
		}
		await tick();

		expect(button?.getAttribute('aria-expanded')).toBe('true');
		expect(panel).not.toHaveStyle({
			height: '288px',
			overflow: 'hidden'
		});
	});

	test('it renders properly when clicked two times', async () => {
		const { container } = renderFixture(false);

		const button = container.querySelector('button');
		const panel = container.querySelector('div[aria-labelledby]');

		expect(button).toBeInTheDocument();
		expect(button?.getAttribute('aria-expanded')).toBe('false');
		expect(panel).toBeInTheDocument();

		// Mock a proper offsetHeight
		if (panel) {
			Object.defineProperty(panel, 'offsetHeight', {
				writable: true,
				value: 288
			});
		}

		if (button) {
			fireEvent(button, createMouseClick());
			await tick();
			fireEvent(button, createMouseClick());
		}

		await tick();

		expect(button?.getAttribute('aria-expanded')).toBe('false');
		expect(panel).toHaveStyle({
			height: 0,
			overflow: 'hidden'
		});
	});
});
