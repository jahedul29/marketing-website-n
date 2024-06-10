<script context="module" lang="ts">
	export type VimeoEmbedOptions = {
		h?: string;
		title?: boolean | string; // show title
		byline?: boolean | string; // show 'by' line
		portrait?: boolean | string; // show portrait
		autopause?: boolean | string; // mandatory if you have multiple vimeo embeds on the same page on autoplay
		background?: boolean; // background mode (no controls, no nothing)
	};

	export const DEFAULTS: VimeoEmbedOptions = {
		byline: false,
		title: false,
		portrait: false,
		autopause: true,
		background: false
	} as const;
</script>

<script lang="ts">
	import { getEmbedParamString } from '$lib/utils/ui/getEmbedParamString';
	import { getVideoEmbedContext } from '$com/ui/video-embed/EmbedGroup.svelte';

	export let url: Maybe<string>;
	export let title: Maybe<string> = null;

	// When undefined, the value will be decided by the autoplay parameter
	export let muted: Maybe<boolean> | undefined = undefined;
	export let autoplay: Maybe<boolean> = true;
	export let loop: Maybe<boolean> = false;
	export let start: Maybe<number> = null;
	export let options: VimeoEmbedOptions = DEFAULTS;

	const api = getVideoEmbedContext();
	const { playing, preconnect } = api || {};

	const resolvedMuted = muted === undefined ? autoplay : muted;
	const paramString = getEmbedParamString({ autoplay, muted: resolvedMuted, loop, ...options });
	const videoId = url ? new URL(url).pathname.replace('/', '') : null;
	const src = videoId
		? `https://player.vimeo.com/video/${encodeURIComponent(videoId)}?${paramString}${
				start ? `#t=${start}s` : ''
		  }`
		: null;

	$: _preconnect = typeof $preconnect === 'undefined' ? false : $preconnect;
	$: _playing = typeof $playing === 'undefined' ? true : $playing;
</script>

<svelte:head>
	{#if _preconnect}
		<link rel="preconnect" href="https://player.vimeo.com" />
	{/if}
</svelte:head>

{#if src && _playing}
	<iframe
		{title}
		{src}
		class="h-full w-full"
		frameborder="0"
		allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
		allowfullscreen
	/>
{/if}
