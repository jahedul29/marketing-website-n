<!--@docs
Renders an image coming from Craft cms. Warns in dev when not srcset or url is provided.

@include docs/ui-components/medias.md
-->
<script lang="ts">
	import type { Assets_Asset } from 'src/craft';
	import { imageSizes, SIZES_FULL, type ImageSizes } from '$lib/utils/ui/imageSizes';
	import { focalPointToObjectPosition } from '$lib/utils/ui/focalPointToObjectPosition';
	import Img from '$lib/components/ui/Img.svelte';
	//#if dev
	import MissingAttributes from '$lib/components/dev/MissingAttributes.svelte';
	///if

	export let image: Partial<Assets_Asset>;
	export let sizes: ImageSizes = SIZES_FULL;
	export let lazy = false;
	let classes = '';
	export { classes as class };

	const { alt, srcset, hasFocalPoint, url, focalPoint } = image || {};

	const src = url || '';
	const computedSizes = imageSizes(sizes);
	const objectPosition = hasFocalPoint
		? `${focalPointToObjectPosition(focalPoint?.[0] || 0.5)} ${focalPointToObjectPosition(
				focalPoint?.[1] || 0.5
		  )}`
		: null;
	const style = objectPosition ? `object-position: ${objectPosition};` : null;
	const retina = url?.includes('@2x');
	const width = retina && image?.width ? image.width / 2 : image?.width;
	const height = retina && image?.height ? image.height / 2 : image?.height;
</script>

{#if image}
	<Img
		{src}
		{srcset}
		{alt}
		class={classes}
		{width}
		{height}
		sizes={srcset ? computedSizes : null}
		loading={lazy ? 'lazy' : null}
		{style}
	/>
{/if}

<!--#if dev-->
{#if !srcset && !url}
	<MissingAttributes component="Image" attributes="srcset,url" />
{/if}
<!--/if-->
