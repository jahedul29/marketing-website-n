import { test, expect } from 'vitest';
import { render } from '@testing-library/svelte';

import Flow from '$lib/components/ui/Flow.svelte';
import FlowY from '$lib/components/ui/FlowY.svelte';
import FlowX from '$lib/components/ui/FlowX.svelte';

test('Flow Has the proper classes', () => {
	const { container } = render(Flow);
	const flow = container.querySelector('div > div');

	expect(flow).toBeInTheDocument();
	expect(flow).toHaveClass(
		'relative',
		'min-w-0',
		'max-w-full',
		'flex flex-initial',
		'flex-row',
		'flex-wrap'
	);
});

test('FlowY Has the proper classes', () => {
	const { container } = render(FlowY);
	const flow = container.querySelector('div > div');

	expect(flow).toBeInTheDocument();
	expect(flow).toHaveClass(
		'relative',
		'min-w-0',
		'max-w-full',
		'flex flex-initial',
		'flex-col',
		'flex-nowrap'
	);
});

test('FlowX Has the proper classes', () => {
	const { container } = render(FlowX);
	const flow = container.querySelector('div > div');

	expect(flow).toBeInTheDocument();
	expect(flow).toHaveClass(
		'relative',
		'min-w-0',
		'max-w-full',
		'flex flex-initial',
		'flex-row',
		'flex-nowrap'
	);
});
