<script context="module" lang="ts">
	import { writable } from 'svelte/store';
	import { isProduction } from '$lib/env-public';

	const origin = isProduction()
		? 'https://watermark.deuxhuithuit.com'
		: ('https://watermark.288dev.com' as const);

	let watermark = writable<string>();

	const fetchWatermark = async (
		language: Language,
		orgName: string,
		fill: string
	): Promise<void> => {
		const url = `${origin}/v4/?lang=${language}&ref=${encodeURIComponent(
			orgName || window.location.host
		)}&fill=${encodeURIComponent(fill)}`;
		try {
			const res = await fetch(url);
			const html = await res.text();
			const fragment = document.createRange().createContextualFragment(html);
			watermark.set(fragment.querySelector('watermark')?.innerHTML || '');
		} catch (error) {
			console.warn(error);
		}
	};
</script>

<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { DEFAULT_LANGUAGE } from '$lib/constants';

	const orgName = $page.data.config?.organization?.[0]?.organizationName || '';
	const language = $page.data.language || DEFAULT_LANGUAGE;

	onMount(() => {
		if (!$watermark) {
			setTimeout(() => fetchWatermark(language, orgName, 'black'), 2000);
		}
	});
</script>

{#if $watermark}
	<div class="_watermark-ctn group relative flex pl-24">
		<span
			class="_watermark-label text-16 text-white opacity-70 transition-opacity group-focus-within:opacity-0 group-hover:opacity-0"
		>
			Credits
		</span>
		<div
			class="_watermark absolute inset-0 flex h-full w-full items-center opacity-0 transition-opacity group-focus-within:opacity-100 group-hover:opacity-100"
		>
			{@html $watermark}
		</div>
	</div>
{/if}

<style lang="postcss">
	:global(._watermark > a) {
		@apply block w-full;
	}
</style>
