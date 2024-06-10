<!--@docs
Renders a video coming from Craft cms.  

@include docs/ui-components/medias.md
-->
<script lang="ts">
	import type { Assets_Asset } from 'src/craft';

	export let video: Maybe<Assets_Asset> = null;
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
	export let element: Maybe<HTMLVideoElement> = null;

	const src = video?.url;
</script>

{#if video}
	<video
		bind:this={element}
		class={classes}
		poster={posterUrl || null}
		{playsinline}
		{src}
		{autoplay}
		{loop}
		{muted}
		{controls}
		{disableremoteplayback}
		x-webkit-airplay={disableremoteplayback ? 'deny' : 'allow'}
	/>
{/if}
