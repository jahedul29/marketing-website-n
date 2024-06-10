<!--@docs
Renders an image or a video coming from Craft cms.  
TODO: Warn in dev when media is not provided.

@include docs/ui-components/medias.md
-->
<script lang="ts">
	import type { Assets_Asset } from 'src/craft';
	import { SIZES_FULL, type ImageSizes } from '$lib/utils/ui/imageSizes';
	import Image from '$lib/components/ui/Image.svelte';
	import Video from '$com/ui/video/Video.svelte';

	// Common props
	export let media: Assets_Asset;
	let classes = '';
	export { classes as class };
	// Image props
	export let sizes: ImageSizes = SIZES_FULL;
	export let lazy = true;
	export let classImg = '';
	// Video props
	export let poster: Maybe<Assets_Asset> = null;
	export let posterUrl = poster?.url;
	export let autoplay = true;
	export let playsinline = autoplay;
	export let loop = true;
	export let muted = true;
	export let controls = false;
	export let disableremoteplayback = true;
	export let classVideo = '';

	const { kind } = media || {};
	const imgClass = `${classes} ${classImg}`;
	const videoClass = `${classes} ${classVideo}`;
</script>

{#if kind === 'image'}
	<Image image={media} {sizes} class={imgClass} {lazy} />
{:else if kind === 'video'}
	<Video
		video={media}
		class={videoClass}
		{poster}
		{posterUrl}
		{autoplay}
		{loop}
		{muted}
		{controls}
		{playsinline}
		{disableremoteplayback}
	/>
{/if}
