<script lang="ts">
	import { getVimeoThumbnailUrl, isVimeo } from '$lib/utils/ui/vimeo';
	import { getYtThumbnailUrl, isYoutube } from '$lib/utils/ui/youtube';
	import type { Assets_Asset } from 'src/craft';
	import Img from '$com/ui/Img.svelte';
	import Media from '$com/ui/Media.svelte';

	let classes = 'h-full w-full object-cover';
	export { classes as class };

	export let url: string;
	export let poster: Maybe<Assets_Asset> = null;
	export let posterAlt: Maybe<string> = poster?.alt || null;

	const getVendorThumbnailUrl = () => {
		return isYoutube(url)
			? getYtThumbnailUrl(url)
			: isVimeo(url)
			? getVimeoThumbnailUrl(url)
			: '';
	};

	const posterSrc = getVendorThumbnailUrl();
</script>

{#if poster}
	<Media class={classes} media={poster} autoplay muted loop controls={false} />
{:else if posterSrc}
	<Img src={posterSrc} alt={posterAlt} class={classes} />
{/if}
