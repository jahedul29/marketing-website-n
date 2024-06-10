import { test, expect, vi, afterEach, beforeEach } from 'vitest';
import { getByText, render } from '@testing-library/svelte';
import type { RenderResult } from '@testing-library/svelte';
import html from 'svelte-htm';
import Tooltip from '$lib/components/ui/Tooltip.svelte';
import { fireEvent } from '@testing-library/dom';
import { tick } from 'svelte';
import { get, writable } from 'svelte/store';

const createMouseEvent = (event: string) => {
	return new MouseEvent(event, {
		cancelable: true,
		bubbles: true
	});
};

const createTouchEvent = () => {
	return new TouchEvent('touchstart', {
		cancelable: true,
		bubbles: true
	});
};

const mockElementBoundingRect = (
	element: HTMLElement | null,
	values: Record<string, number> = {}
) => {
	if (!element) {
		return;
	}

	Object.defineProperty(element, 'getBoundingClientRect', {
		writable: true,
		value: vi.fn(() => ({
			x: 0,
			y: 0,
			width: 100,
			height: 17,
			top: 0,
			right: 100,
			bottom: 17,
			left: 0,
			toJSON: vi.fn(),
			...values
		}))
	});
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const noopRegisterTrigger = (node: HTMLElement) => ({});
const registerTrigger = writable(noopRegisterTrigger);
beforeEach(() => {
	registerTrigger.set(noopRegisterTrigger);
});

const renderFixture = (position: string) => {
	return render(html`<${Tooltip}
		offset="12"
		boundsOffset="24"
		position="${position}"
		let:registerTrigger=${registerTrigger}
	>
		<a
			href="/my-complicated-word-definition"
			use:action=${(node) => get(registerTrigger)?.(node)}
			>My complicated word</a
		>
		<svelte:fragment slot="tooltip">
			<span>My complicated definition excerpt.</span>
		</svelte:fragment>
	<//>`);
};

describe('Empty renders', () => {
	test('it does render wrapper when empty', () => {
		const { container }: RenderResult<Tooltip> = render(Tooltip);

		const wrapper = container.querySelector('span');
		const trigger = container.querySelector('span > a');
		const tooltip = container.querySelector('span > span');

		expect(wrapper).toBeInTheDocument();
		expect(trigger).toBeNull();
		expect(tooltip).toBeNull();
	});

	test('it does render trigger when not empty', () => {
		const { container } = render(html`<${Tooltip}>My complicated word<//>`);

		const trigger = container.querySelector('span');
		const tooltip = container.querySelector('span > span');

		expect(trigger).toBeInTheDocument();
		expect(getByText(container, 'My complicated word')).toBeInTheDocument();

		expect(tooltip).toBeNull();
	});
});

describe('Mouse events', () => {
	test('it does render tooltip when shown on mouse over', async () => {
		const { container } = renderFixture('top');

		const trigger = container.querySelector('span > a');

		expect(trigger).toBeInTheDocument();
		expect(getByText(container, 'My complicated word')).toBeInTheDocument();

		if (trigger) {
			fireEvent(trigger, createMouseEvent('mouseover'));
		}

		await tick();
		const tooltip = container.querySelector('span > span');
		expect(tooltip).toBeInTheDocument();
		expect(getByText(container, 'My complicated definition excerpt.')).toBeInTheDocument();
	});

	test('it does render tooltip when shown on focus', async () => {
		const { container } = renderFixture('top');

		const trigger = container.querySelector('span > a');

		expect(trigger).toBeInTheDocument();
		expect(getByText(container, 'My complicated word')).toBeInTheDocument();

		(trigger as HTMLElement).focus();

		await tick();
		const tooltip = container.querySelector('span > span');
		expect(tooltip).toBeInTheDocument();
		expect(getByText(container, 'My complicated definition excerpt.')).toBeInTheDocument();
	});

	test('it does close the tooltip on blur', async () => {
		const { container } = renderFixture('top');

		const trigger = container.querySelector('span > a') as HTMLElement;

		expect(trigger).toBeInTheDocument();
		expect(getByText(container, 'My complicated word')).toBeInTheDocument();

		trigger.focus();

		await tick();
		let tooltip = container.querySelector('span > span');
		expect(tooltip).toBeInTheDocument();

		trigger.blur();

		await tick();
		tooltip = container.querySelector('span > span');
		expect(tooltip).toBeNull();
	});
});

describe('Touch events', () => {
	beforeEach(() => {
		// Restore touchstart
		window.ontouchstart = () => ({});
	});

	afterEach(() => {
		// Delete touchstart
		delete window.ontouchstart;
	});

	test('it does not render tooltip on touchstart', async () => {
		const { container } = renderFixture('top');

		const trigger = container.querySelector('span > a');

		expect(trigger).toBeInTheDocument();
		expect(getByText(container, 'My complicated word')).toBeInTheDocument();

		if (trigger) {
			fireEvent(trigger, createTouchEvent());
		}

		await tick();
		const tooltip = container.querySelector('span > span');
		expect(tooltip).toBeNull();
	});

	test('it does not render tooltip on mouse over', async () => {
		const { container } = renderFixture('top');

		const trigger = container.querySelector('span > a');

		expect(trigger).toBeInTheDocument();
		expect(getByText(container, 'My complicated word')).toBeInTheDocument();

		if (trigger) {
			fireEvent(trigger, createMouseEvent('mouseover'));
		}

		await tick();
		const tooltip = container.querySelector('span > span');
		expect(tooltip).toBeNull();
	});

	test('it does not render tooltip on click', async () => {
		const { container } = renderFixture('top');

		const trigger = container.querySelector('span > a');

		expect(trigger).toBeInTheDocument();
		expect(getByText(container, 'My complicated word')).toBeInTheDocument();

		if (trigger) {
			fireEvent(trigger, createMouseEvent('click'));
		}

		await tick();
		const tooltip = container.querySelector('span > span');
		expect(tooltip).toBeNull();
	});
});

describe('Positioning', () => {
	test('it properly position left', async () => {
		const { container } = renderFixture('left');

		const trigger = container.querySelector('span > a');

		if (trigger) {
			fireEvent(trigger, createMouseEvent('mouseover'));
		}

		await tick();
		const tooltip = container.querySelector('span > span');
		expect(tooltip).toHaveStyle({
			top: '0px',
			right: '100%',
			paddingRight: '12px'
		});
	});

	test('it properly position left when out of view', async () => {
		const { container } = renderFixture('left');

		expect(container).toBeInTheDocument();

		const trigger = container.querySelector('span > a') as HTMLAnchorElement;
		expect(trigger).toBeInTheDocument();

		mockElementBoundingRect(trigger);
		mockElementBoundingRect(trigger.parentElement);

		fireEvent(trigger, createMouseEvent('mouseover'));

		await tick();
		const tooltip = container.querySelector('span > span') as HTMLElement;
		expect(tooltip).toBeInTheDocument();

		mockElementBoundingRect(tooltip, {
			height: 8,
			left: -100
		});

		await tick();
		expect(tooltip).toHaveStyle({
			top: '4px', // 17 / 2 (parent) - 8 / 2 (child)
			right: '100%',
			left: 'calc(0px + 100px + 2.4rem)',
			paddingRight: '12px'
		});
	});

	test('it properly position right', async () => {
		const { container } = renderFixture('right');

		const trigger = container.querySelector('span > a');
		if (trigger) {
			fireEvent(trigger, createMouseEvent('mouseover'));
		}

		await tick();

		const tooltip = container.querySelector('span > span');
		expect(tooltip).toHaveStyle({
			top: '0px',
			left: '100%',
			paddingLeft: '12px'
		});
	});

	test('it properly position right when out of view', async () => {
		const { container } = renderFixture('right');

		const trigger = container.querySelector('span > a') as HTMLAnchorElement;
		mockElementBoundingRect(trigger);
		mockElementBoundingRect(trigger.parentElement);
		fireEvent(trigger, createMouseEvent('mouseover'));

		await tick();
		const tooltip = container.querySelector('span > span') as HTMLElement;
		mockElementBoundingRect(tooltip, {
			height: 6,
			right: 2100 // window.innerWidth is 1024
		});

		await tick();

		expect(tooltip).toHaveStyle({
			top: '5px', // 17 / 2 (parent) - 6 / 2 (child)
			left: '100%',
			right: 'calc(0px + 1076px + 2.4rem)',
			paddingLeft: '12px'
		});
	});

	test('it properly position top', async () => {
		const { container } = renderFixture('top');

		const trigger = container.querySelector('span > a');

		if (trigger) {
			fireEvent(trigger, createMouseEvent('mouseover'));
		}

		await tick();

		const tooltip = container.querySelector('span > span');
		expect(tooltip).toHaveStyle({
			bottom: '100%',
			left: '0px',
			paddingBottom: '12px'
		});
	});

	test('it properly position bottom', async () => {
		const { container } = renderFixture('bottom');

		const trigger = container.querySelector('span > a');

		if (trigger) {
			fireEvent(trigger, createMouseEvent('mouseover'));
		}

		await tick();

		const tooltip = container.querySelector('span > span');
		expect(tooltip).toHaveStyle({
			top: '100%',
			left: '0px',
			paddingTop: '12px'
		});
	});
});
