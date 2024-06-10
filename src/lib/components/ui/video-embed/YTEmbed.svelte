<!--@docs
@include docs/ui-components/yt-embed.md
-->

<script context="module" lang="ts">
	export type YtEmbedOptions = {
		/** https://developers.google.com/youtube/player_parameters#Parameters */
		cc_lang_pref?: string;
		cc_load_policy?: boolean;
		color?: 'red' | 'white';
		controls?: boolean;
		disablekb?: boolean;
		enablejsapi?: boolean;
		end?: string;
		fs?: boolean;
		hl?: string;
		iv_load_policy?: boolean;
		list?: string;
		listType?: 'playlist' | 'user_uploads';
		modestbranding?: boolean;
		origin?: string;
		playlist?: string;
		playsinline?: boolean;
		rel?: boolean;
		widget_referrer?: string;
	};

	export const DEFAULTS: YtEmbedOptions = {} as const;
</script>

<script lang="ts">
	/** Based on https://github.com/paulirish/lite-youtube-embed */
	import { getEmbedParamString } from '$lib/utils/ui/getEmbedParamString';
	import { getYtId } from '$lib/utils/ui/youtube';
	import { getVideoEmbedContext } from '$com/ui/video-embed/EmbedGroup.svelte';

	export let url: Maybe<string>;
	export let title: Maybe<string> = null;

	// When undefined, the value will be decided by the autoplay parameter
	let mute: Maybe<boolean> | undefined = undefined;
	export { mute as muted };
	export let autoplay: Maybe<boolean> = true;
	export let loop: Maybe<boolean> = false;
	export let start: Maybe<number> = null;
	export let options: Maybe<YtEmbedOptions> = DEFAULTS;

	const resolvedMute = mute === undefined ? autoplay : mute;
	const videoId = url ? getYtId(url) : null;
	const playlist = loop ? videoId : options?.playlist || null;

	const api = getVideoEmbedContext();
	const { playing, preconnect } = api || {};

	const paramString = getEmbedParamString({
		autoplay: autoplay ? '1' : autoplay,
		mute: resolvedMute,
		loop,
		start,
		playlist,
		controls: options?.controls ? 1 : null,
		rel: options?.rel ? 1 : null,
		...options
	});
	const src = !videoId
		? null
		: `https://www.youtube-nocookie.com/embed/${encodeURIComponent(videoId)}?${paramString}`;

	$: _preconnect = typeof $preconnect === 'undefined' ? false : $preconnect;
	$: _playing = typeof $playing === 'undefined' ? true : $playing;
</script>

<svelte:head>
	{#if _preconnect}
		<link rel="preconnect" href="https://www.youtube-nocookie.com" />
		<link rel="preconnect" href="https://www.google.com" />
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
