import { test, expect } from 'vitest';
import { render } from '@testing-library/svelte';

import Frame from '$lib/components/ui/Frame.svelte';

test('Frame has the proper classes without props', () => {
	const { container } = render(Frame);
	const frame = container.querySelector('div > div');

	expect(frame).toBeInTheDocument();
	expect(frame).toHaveClass('relative', 'block', 'box-border');
});

test('Frame has the proper classes for width', () => {
	const { container } = render(Frame, {
		width: '40'
	});
	const frame = container.querySelector('div > div');

	expect(frame).toBeInTheDocument();
	expect(frame).toHaveClass('relative', 'block', 'box-border', 'min-w-40', 'w-40');
});

test('Frame has the proper classes for width with responsive syntax', () => {
	const { container } = render(Frame, {
		width: '40|[50px]'
	});
	const frame = container.querySelector('div > div');

	expect(frame).toBeInTheDocument();
	expect(frame).toHaveClass(
		'relative',
		'block',
		'box-border',
		'min-w-40',
		'w-40',
		'bp:min-w-[50px]',
		'bp:w-[50px]'
	);
});
