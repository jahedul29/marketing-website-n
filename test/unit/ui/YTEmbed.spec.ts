import { test, expect } from 'vitest';
import { render } from '@testing-library/svelte';
import html from 'svelte-htm';
import Fragment from 'svelte-fragment-component';
import { readable } from 'svelte/store';

import YTEmbed from '$lib/components/ui/video-embed/YTEmbed.svelte';

test('Properly renders and preconnect', () => {
	const testContext = { playing: readable(true), preconnect: readable(true) };
	const { container } = render(html`
		<${Fragment} context=${{ __videoEmbed__: testContext }}>
			<${YTEmbed} url="https://youtube.com/?v=TTTTT" title="Test" />
		</$>
	`);

	const iframe = container.querySelector('iframe');
	expect(iframe?.getAttribute('src')).toBe(
		'https://www.youtube-nocookie.com/embed/TTTTT?autoplay=1&mute=true&loop=false'
	);
	expect(iframe?.getAttribute('title')).toBe('Test');

	const links = document.head.querySelectorAll('link');
	expect(links.length).toBe(2);
	Array.from(links).forEach((link) => {
		expect(link).toBeInTheDocument();
	});
});

test('Properly renders with autoplay', () => {
	const testContext = { playing: readable(true), preconnect: readable(true) };
	const { container } = render(html`
		<${Fragment} context=${{ __videoEmbed__: testContext }}>
			<${YTEmbed} url="https://youtube.com/?v=TTTTT" autoplay=${true} />
		</$>
	`);

	const iframe = container.querySelector('iframe');
	expect(iframe?.getAttribute('src')).toBe(
		'https://www.youtube-nocookie.com/embed/TTTTT?autoplay=1&mute=true&loop=false'
	);
});

test('Properly renders with autoplay and mute', () => {
	const testContext = { playing: readable(true), preconnect: readable(true) };
	const { container } = render(html`
		<${Fragment} context=${{ __videoEmbed__: testContext }}>
			<${YTEmbed} url="https://youtube.com/?v=TTTTT" title="Test" autoplay=${true} mute=${true} />
		</$>
	`);

	const iframe = container.querySelector('iframe');
	expect(iframe?.getAttribute('src')).toBe(
		'https://www.youtube-nocookie.com/embed/TTTTT?autoplay=1&mute=true&loop=false'
	);
});

test('Properly renders nothing when url is invalid', () => {
	const testContext = { playing: readable(true), preconnect: readable(true) };
	const { container } = render(html`
		<${Fragment} context=${{ __videoEmbed__: testContext }}>
			<${YTEmbed} url="https://youtube.com/?t=TTTTT" title="Test" autoplay=${true} mute=${true} />
		</$>
	`);

	const iframe = container.querySelector('iframe');
	expect(iframe).toBeNull();
});

test('Properly renders when url is .be', () => {
	const testContext = { playing: readable(true), preconnect: readable(true) };
	const { container } = render(html`
		<${Fragment} context=${{ __videoEmbed__: testContext }}>
			<${YTEmbed} url="https://youtu.be/TTTTT" title="Test" autoplay=${true} mute=${true} />
		</$>
	`);

	const iframe = container.querySelector('iframe');
	expect(iframe?.getAttribute('src')).toBe(
		'https://www.youtube-nocookie.com/embed/TTTTT?autoplay=1&mute=true&loop=false'
	);
});

test('Properly renders with custom options', () => {
	const testContext = { playing: readable(true), preconnect: readable(true) };
	const { container } = render(html`
		<${Fragment} context=${{ __videoEmbed__: testContext }}>
			<${YTEmbed} url="https://youtube.com/?v=TTTTT" title="Test" autoplay=${true} mute=${true} options=${{
		playsinline: true
	}} />
		</$>
	`);

	const iframe = container.querySelector('iframe');
	expect(iframe?.getAttribute('src')).toBe(
		'https://www.youtube-nocookie.com/embed/TTTTT?autoplay=1&mute=true&loop=false&playsinline=true'
	);
});
