import { test, expect } from 'vitest';
import { render } from '@testing-library/svelte';
import html from 'svelte-htm';
import Fragment from 'svelte-fragment-component';
import { readable } from 'svelte/store';

import VimeoEmbed from '$lib/components/ui/video-embed/VimeoEmbed.svelte';

test('Properly renders and preconnect', () => {
	const testContext = { playing: readable(true), preconnect: readable(true) };
	const { container } = render(html`
		<${Fragment} context=${{ __videoEmbed__: testContext }}>
			<${VimeoEmbed} url="https://vimeo.com/TTTTT" title="Test" />
		</$>
	`);

	const iframe = container.querySelector('iframe');
	expect(iframe?.getAttribute('src')).toBe(
		'https://player.vimeo.com/video/TTTTT?autoplay=true&muted=true&loop=false&byline=false&title=false&portrait=false&autopause=true&background=false'
	);
	expect(iframe?.getAttribute('title')).toBe('Test');

	const links = document.head.querySelectorAll('link');
	expect(links.length).toBe(1);
	Array.from(links).forEach((link) => {
		expect(link).toBeInTheDocument();
	});
});

test('Properly renders with autoplay', () => {
	const testContext = { playing: readable(true), preconnect: readable(true) };
	const { container } = render(html`
		<${Fragment} context=${{ __videoEmbed__: testContext }}>
			<${VimeoEmbed} url="https://vimeo.com/TTTTT" title="Test" autoplay=${true} />
		</$>
	`);

	const iframe = container.querySelector('iframe');
	expect(iframe?.getAttribute('src')).toBe(
		'https://player.vimeo.com/video/TTTTT?autoplay=true&muted=true&loop=false&byline=false&title=false&portrait=false&autopause=true&background=false'
	);
});

test('Properly renders with autoplay and mute', () => {
	const testContext = { playing: readable(true), preconnect: readable(true) };
	const { container } = render(html`
		<${Fragment} context=${{ __videoEmbed__: testContext }}>
			<${VimeoEmbed} url="https://vimeo.com/TTTTT" title="Test" autoplay=${true} mute=${true} />
		</$>
	`);

	const iframe = container.querySelector('iframe');
	expect(iframe?.getAttribute('src')).toBe(
		'https://player.vimeo.com/video/TTTTT?autoplay=true&muted=true&loop=false&byline=false&title=false&portrait=false&autopause=true&background=false'
	);
});

test('Properly renders nothing when url is invalid', () => {
	const testContext = { playing: readable(true), preconnect: readable(true) };
	const { container } = render(html`
		<${Fragment} context=${{ __videoEmbed__: testContext }}>
			<${VimeoEmbed} url="https://vimeo.com" title="Test" />
		</$>
	`);

	const iframe = container.querySelector('iframe');
	expect(iframe).toBeNull();
});

test('Properly renders with custom options', () => {
	const testContext = { playing: readable(true), preconnect: readable(true) };
	const { container } = render(html`
		<${Fragment} context=${{ __videoEmbed__: testContext }}>
			<${VimeoEmbed} url="https://vimeo.com/TTTTT" title="Test" options=${{ byline: true }} />
		</$>
	`);
	const iframe = container.querySelector('div > iframe');
	expect(iframe?.getAttribute('src')).toBe(
		'https://player.vimeo.com/video/TTTTT?autoplay=true&muted=true&loop=false&byline=true'
	);
});
