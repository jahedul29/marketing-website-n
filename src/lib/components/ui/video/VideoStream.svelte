<script context="module" lang="ts">
	export type VideoStreamUrls = {
		dashUrl?: Maybe<string>;
		hlsUrl?: Maybe<string>;
		mp4Url?: Maybe<string>;
	};
</script>

<script lang="ts">
	import type { Assets_Asset } from 'src/craft';

	export let video: Maybe<Partial<VideoStreamUrls>>;
	export let poster: Maybe<Assets_Asset> = null;
	export let posterUrl = poster?.url;
	export let autoplay = false;
	export let playsinline = autoplay;
	export let loop = false;
	export let muted = false;
	export let controls = true;
	export let disableremoteplayback = true;

	let classes = '';
	export { classes as class };

	const { dashUrl, hlsUrl, mp4Url } = video || {};
</script>

{#if video}
	<video
		class={classes}
		poster={posterUrl || null}
		{playsinline}
		{autoplay}
		{loop}
		{muted}
		{controls}
		{disableremoteplayback}
		x-webkit-airplay={disableremoteplayback ? 'deny' : 'allow'}
	>
		{#if hlsUrl}
			<source src={hlsUrl} type="application/x-mpegURL" />
		{/if}
		{#if dashUrl}
			<source src={dashUrl} type="application/dash+xml" />
		{/if}
		{#if mp4Url}
			<source src={mp4Url} type="video/mp4" />
		{/if}
	</video>
{/if}
